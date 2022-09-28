var express = require('express');
var router = express.Router();
let multer = require ('multer')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(cookieParser());

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');


/**********************************************
 * 물품 편집 기능
**********************************************/
const stockEditRouter = require("./stockEdit");
router.use("/stockEdit", [stockEditRouter]);

/**********************************************
 * 물품 등록기능
 *********************************************/
 const stockRegistrationRouter = require("./stockRegistration");
 router.use("/stockRegistration", [stockRegistrationRouter]);

/***********************************
 * 물품 대여시 저장할 값 
 * 물품찾을때 물품 수량이 없으면 제외
 ***********************************/

router.post('/index',auth,(req,res)=>{
  const stock = new Stock ({
    category:
    {
      bigGroup  :  req.body.bigGroup,
      smallGroup:  req.body.smallGroup
    },
    rentalMan   :  req.user.rentalMan,
    stockNumber :  req.body.stockNumber,
    stockCount  :  req.body.stockCount,
    stockMount  :  req.body.stockMount,
    startDate   :  req.body.startDate,
    endDate     :  req.body.endDate,
    returnDate  :  req.body.returnDate,
    userId      :  req.user.userId
  })
  var mount=req.body.stockMount
  var count=req.body.stockCount
  var stockmount=mount-count
  console.log(stockmount)

  var manager = stock.rentalMan
  if(manager==1){
    stock.findOneAndUpdate({stockNumber:req.body.stockNumber},
      {stockCount : req.body.stockCount,  // 대여 중 수량
      stockMount  : req.body.stockMount,  // 총 수량
      // 대여 가능 수량 계산
      stockRentableNumber : parseInt(parseInt(req.body.stockMount)-parseInt(stockCount)), // 대여 가능 수량 계산 
      startDate : req.body.startDate, // 대여일
      endDate : req.body.endDate, // 반납일
      rental  : req.body.rental,  // 대여 가능 여부
      mustReturn  : req.body.mustReturn,  // 반납 여부
      updated_at : req.body.updated_at, // 최종 등록일
  
      // 실제 반납일자
      returnDate : req.body.returnDate},(err)=>{
        if(stockmount<=0){
          console.log(req.body.stockMount)
          req.body.stockMount=0;
          console.log(stockmount)
          return res.json({
            category:{
              bigGroup  :  req.body.bigGroup,
              smallGroup:  req.body.smallGroup
            },
            stockNumber :  req.body.stockNumber,
            stockCount  :  req.body.stockCount,
            stockMount  :  parseInt(parseInt(req.body.stockMount)-parseInt(req.body.stockCount)),
            startDate   :  req.body.startDate,
            endDate     :  req.body.endDate,
            returnDate  :  req.body.returnDate,
            layout      : "./partials/smModal",
            message     : "대여불가 물품입니다."})
        }
        else{
          console.log(stockmount)
          return res.json({
            message:"대여가능 물품입니다.",
            category:{
              bigGroup  :  req.body.bigGroup,
              smallGroup:  req.body.smallGroup
            },
            stockNumber :  req.body.stockNumber,
            stockCount  :  req.body.stockCount,
            stockMount  :  parseInt(parseInt(req.body.stockMount)-parseInt(req.body.stockCount)),
            startDate   :  req.body.startDate,
            endDate     :  req.body.endDate,
            layout      : "./partials/smModal",
            returnDate  :  req.body.returnDate
        })
        }
      })
    }
  else{return res.json({message:"권한이 없습니다."})}
})
/**************************************************
 * 물품번호로 페이지 생성하여 물품마다 상세페이지 지정
 * 상세페이지 등록
***************************************************/
router.get("/index/:stockNumber",auth,function(req, res, next) {
  const stockNumber = req.body.stockNumber;
  const user= User({userName:req.user.userName})
  Stock
    .findOne({ stockNumber: stockNumber })
    .then(stock => {
      if (!stock) return res.status(404).json({ message: "물건이 없습니다." });
      console.log("Read Detail 완료");
      return res.status(200).render({
        layout:"./partials/smModal",
        message: "Read Detail success",
        stockNumber: req.params.stockNumber,
        stockName : req.params.stockName,
        stockInfo:req.params.stockInfo,
        userName : user.userName,
        hellow:`${user.userName}님 환영합니다.`,
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: err
      });
    });
});

/***************************************************
 * 로그인 기능
 * *************************************************/
 const loginRouter = require("./login");
 router.use("/", [loginRouter]);

 /*********************************************
 * 회원가입 기능
 ********************************************/
const addUserRouter = require("./addUser")
router.use("/addUser",[addUserRouter])

/***********************************************
 * client가 로그인시 해당 유저의 정보를 auth에서
 * 저장하고 있다가 필요할때마다 불러서 쓰는 용도
 ***********************************************/
// role 1 어드민    role 2 특정 부서 어드민 
// role 0 -> 일반유저   role 0이 아니면  관리자 
router.get('/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  return res.status(200).json({
    userId: req.user.userId,
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    userName: req.user.userName,
    teamList1: req.user.teamList1,
    teamList2: req.user.teamList2,
    role: req.user.role,
    teamPosition :req.user.teamPosition,
    token: req.user.token,
    editMan : req.user.editMan,
    rentalMan : req.user.rentalMan,
    registMan : req.user.registMan,
    hellow:`${req.user.userName}님 환영합니다.`
  })
})
/****************************************
* 물품관리 페이지
* 
****************************************/
 router.get('/index',auth,(req, res) => {
  var user = User({userName:req.user.userName})
  console.log(user.userName)
  Stock.find({$equal:{category:{bigGroup:req.params.bigGroup}}}).limit(16).then(stock => {
    let use = new User({ userName: req.body.userName })
    console.log("read all finish")
    console.log(use.userName)
    console.log(stock)
    return res.status(200).render('index', {
      userName: use.userName,
      message: "Read all Success",
      hellow:`${user.userName}`+"님 환영합니다.",
      data : stock
      // layout
    })
  })
    .catch(err => {
      return res.status(500).json({ message: err })
    })
})
/*******************************
 * 로그아웃시 띄울화면 
 * 데이터베이스 토큰 지우기
 *******************************/
const logoutRouter = require("./logout");
router.use("/logout", [logoutRouter]);

/********************************
 * 회원가입되었을때 띄울 화면
 * 
 *******************************/
 const successAddUserRouter = require("./successAddUser");
 router.use("/successAddUser", [successAddUserRouter]);

/*************************************************
 * 마이페이지에 들어가면 나의 대여 현황이 보이는 기능
 * 
 *************************************************/
 const myRentalStatusRouter = require("./myRentalStatus");
 router.use("/myRentalStatus", [myRentalStatusRouter]);

/**********************************
 * 이미지 업로드 기능 
 * 등록 화면 post에 넣어야됨
 **********************************/
 var storage = multer.diskStorage({
    destination : function(req,file,cb){
    cb(null,'./public/image')},
    filename :function(req,file,cb){
    cb(null,file.originalname)}
  });
  var upload=multer({storage:storage});
  router.get('/upload',function(요청,응답){
    응답.render('upload.ejs')
  });
  router.post('/upload', upload.single('input의 name속성이름'),function(요청,응답){ 응답.send('업로드완료')});
/***************************************
 * 매니저 페이지 만들기
 * 권한 부여 및 관리
***************************************/
const userManagementRouter = require("./userManagement");
router.use("/userManagement", [userManagementRouter]);

module.exports = router;