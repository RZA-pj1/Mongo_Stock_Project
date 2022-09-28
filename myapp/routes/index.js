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
const app = require('../app');



/**********************************************
 * 물품등록 기능
**********************************************/
const successAddUserRouter = require("./successAddUser");
router.use("/successAddUser", [successAddUserRouter]);
/******************************************
 * 물품 편집 기능
 ******************************************/
 const stockEditRouter = require("./stockEdit");
 router.use("/stockEdit", [stockEditRouter]);

/***********************************
 * 물품 대여시 저장할 값 
 * 물품찾을때 물품 수량이 없으면 제외
 ***********************************/

router.post('/index',(req,res)=>{
  const stock = new Stock ({
    stockNumber : req.body.stockNumber,
    stockCount : req.body.stockCount,
    stockMount : req.body.stockMount,
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    returnDate : req.body.returnDate
  })
  var mount=req.body.stockMount
  var count=req.body.stockCount
  var stockmount=mount-count
  console.log(stockmount)
  stock.update({stockNumber:req.body.stockNumber},
    {stockCount : req.body.stockCount,
    stockMount : parseInt(parseInt(req.body.stockMount)-parseInt(req.body.stockCount)),
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    returnDate : req.body.returnDate},(err)=>{
      if(stockmount<=0){
        console.log(req.body.stockMount)
        req.body.stockMount=0;
        console.log(stockmount)
        return res.json({message:"대여불가 물품입니다."})
      }
      else{
        console.log(stockmount)
        return res.json(err,{message:"대여가능 물품입니다."})
      }
    })
})
/**************************************************
 * 물품번호로 페이지 생성하여 물품마다 상세페이지 지정
 * 상세페이지 등록
***************************************************/
router.get("/index/:stockNumber", function(req, res, next) {
  const stockNumber = req.body.stockNumber;
  Stock
    .findOne({ stockNumber: stockNumber })
    .then(stock => {
      if (!stock) return res.status(404).json({ message: "post not found" });
      console.log("Read Detail 완료");
      return res.status(200).render('index',{
        message: "Read Detail success",
        data: {
          stock: stock
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: err
      });
    });
});


/***************************************************
 * 로그인페이지
 * *************************************************/
 const loginRouter = require("./login");
 router.use("/login", [loginRouter]);

 /******************************************
  * 회원가입 페이지
  ******************************************/
 const addUserRouter = require("./addUser");
 router.use("/addUser",[addUserRouter]);
 /******************************************
  * logout페이지
  *****************************************/
const logoutRouter = require("./logout");
router.use("/logout",[logoutRouter]);
   
/*******************************************
 * 로그인시 유저 정보 저장할 값
 *******************************************/
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
    teamList: req.user.teamList,
    role: req.user.role,
    teamPosition :req.user.teamPosition,
    token: req.user.token,
    editMan : req.user.editMan,
    rentalMan : req.user.rentalMan,
    registMan : req.user.registMan
  })
})
/****************************************
* 물품관리 페이지
****************************************/
 router.get('/index',auth,(req, res) => {
  var user = User({userName:req.user.userName})
  console.log(user.userName)
  Stock.find().then(stock => {
    let use = new User({ userName: req.body.userName })
    console.log("read all finish")
    console.log(use.userName)
    return res.status(200).render('index', {
      userName: user.userName,
      message: "Read all Success",
      userName:`${user.userName}`+"님 환영합니다.",
      data: { stock: stock }
    })
  })
    .catch(err => {
      return res.status(500).json({ message: err })
    })
})

/*********************************
 * 회원가입 후 띄워줄 페이지
 **********************************/
router.get('/successAddUser',auth,(req,res)=>{
  return res.render('successAddUser', {layout:'./successAddUser'})
})

/**********************************
 * 이미지 업로드 기능 
 * index 화면 get에 넣어야됨
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

/******************************************
 * 마이페이지 만들기
 * 로그인하고 해당되는 토큰을 가졌을때만 가능
*******************************************/
const myRentalStatusRouter = require("./myRentalStatus");
router.use("/myRentalStatus", [myRentalStatusRouter]);


module.exports = router;