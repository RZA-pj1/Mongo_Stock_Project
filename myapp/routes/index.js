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
const app = require('../app');



/**********************************************
 * 물품 편집 기능
**********************************************/
router.post('/stockEdit',(req,res)=>{
  const stoke = new Stock({
    stockNumber   : req.body.stockNumber,
    stockImage    : req.body.stockImage,
    stockInfo     : req.body.stockInfo,
    category:{
      bigGroup    : req.body.bigGroup,
      smallGroup  : req.body.smallGroup
    },
    rental        : req.body.rental,
    return        : req.body.return,
    stockMount    : req.body.stockCount,
    stockName     : req.body.stockName
  })
  stoke.update(
    {stokeNumber  : req.body.stockNumber},
    {
      stockMount  : req.body.stockMount,
      stockName   : req.body.stockName,
      stockInfo   : req.body.stockInfo,
      stockImage  : req.body.stockImage,
      rental      : req.body.rental,
      return      : req.body.return,
      category:{
        bigGroup    : req.body.bigGroup,
        smallGroup  : req.body.smallGroup
      }
    })
    return res.status(200).json({
      stockMount  : req.body.stockMount,
      stockName   : req.body.stockName,
      stockInfo   : req.body.stockInfo,
      stockImage  : req.body.stockImage,
      rental      : req.body.rental,
      return      : req.body.return,
      bigGroup    : req.body.bigGroup,
      smallGroup  : req.body.smallGroup,
      stockNumber : req.body.stockNumber
    })
})
router.get('/stockEdit',auth,(req,res)=>{
  var user = User({userName:req.user.userName})
  var category = new Category({
    bigGroup:req.params.bigGroup,
    smallGroup:req.params.smallGroup
  })
  category.findOne().where(stockNumber)
  return res.status(200).render('stockEdit',{
    layout    : './stockEdit',
    bigGroup  : req.params.bigGroup,
    smallGroup: req.params.smallGroup,
    hellow    : `${user.userName}님 환영합니다.`
  })
})

/**********************************************
 * 물품 등록기능
 *********************************************/
router.get('/stockRegistration',auth,(req,res)=>{
  const user= User({userName:req.user.userName})
  Category.find({}).then(category=>{
    res.status(200).render('stockRegistration',{
      category : {category},
      hellow:`${user.userName}님 환영합니다.`,
      layout:"/stockRegistration",
      userName : user.userName
    })
  })
})
router.post('/stockRegistration' ,(req, res) =>{
  //물품등록할때 필요한 정보들을 Clinent 에서 가져오면
  //그것들을 데이터베이스에 넣어준다
  const category = new Category({
    bigGroup :  req.body.bigGroup,
    smallGroup : req.body.smallGroup
  })
  const stoke = new Stock({
    stockNumber   : req.body.stockNumber, // 품번
    stockImage    : req.body.stockImage,  // 물품 이미지
    stockInfo     : req.body.stockInfo, // 물품 정보
    category:{
      category
    },
    stockMount    : req.body.stockMount,  // 총 수량
    stockCount    : req.body.stockCount,  // 대여 중 수량
    stockName     : req.body.stockName, // 물품명
    startDate     : req.body.startDate, // 대여일
    returnDate    : req.body.returnDate,  // 실제 반납일
    endDate       : req.body.endDate, // 반납일
    rental        : req.body.rental,  // 대여여부
    mustReturn    : req.body.mustReturn, // 반납 여부
    updated_at    : req.body.updated_at // 등록일, 최종 수정일
  });
  category.save((err,categori)=>{
    console.log(categori)
    if (err) {
       res.json({ stockSaveSuccess: false, err })
    }
    else{
       res.json({
      //프론트에서 올때는 body에서 바로 오기때문에 다큐먼트에서 내올 필요 없음
      bigGroup:req.body.bigGroup,
      smallGroup:req.body.smallGroup,
      })
    }
  })
    stoke.save((err, stock) => {
      console.log("stock",stock)
      
      if (err) {
        return res.status(401).json({ stockSaveSuccess: false, err })
      }
      else{
         return res.status(200).json({
            //프론트에서 올때는 body에서 바로 오기때문에 다큐먼트에서 내올 필요 없음
            stockNumber:req.body.stockNumber,
            category:{
            bigGroup        :req.body.bigGroup,
            smallGroup      :req.body.smallGroup,
            },
            stockSaveSuccess: true,
            rental          :req.body.rental
            })
          }
      })
})

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

//var employee = require('../controllers/EmployeeController.js');

// router.get('/', employee.list);

// router.get('/show/:id', employee.show);

// router.get('/create', employee.create);

// router.post('/save', employee.save);

// router.get('/edit/:id', employee.edit);

// router.post('/update/:id', employee.update);

// router.post('/delete/:id', employee.delete);

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


/***************************************************
 * 회원가입 및 로그인 기능
 * *************************************************/
router.get('/', (req, res) => res.render('login', {content: '로그인'}))

//app.get('/api/hello', (req, res) => res.send('Hello World!~~ '))
router.get('/addUser',(req,res) =>
 res.render('addUser',{
  content:'회원가입',
  hellow:"회원가입을 진행해 주세요"})
 )
router.post('/addUser', (req, res) => {
  //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
  //그것들을  데이터 베이스에 넣어준다.
  
  var user = new User(req.body)
  console.log(req.body)
  console.log(req.body.password)
  user.save((err, userInfo) => {
    if (!userInfo){
      return res.status(500).json({addUserSuccess: false, err})
    }
    else{
      return res.render('addUser',
      { 
       layout: './addUser',
       addUserSuccess:true,
       message:"회원가입 성공",
      })
    }
  })
})

router.post('/', (req, res) => {
  //요청된 사번을 데이터베이스에서 있는지 찾는다.
  User.findOne({ userId: req.body.userId }, (err,user) => {
    if (!user) {
      // return res.render('alert', {error: '요청하신 사번은 존재하지 않습니다.'});
      return res.json({ loginSuccess: false, message: "요청하신 사번은 존재하지 않습니다." })
    }
    //요청된 사번이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch){return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })}
      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        return res.cookie("x_auth", user.token)
        .cookie("username", user.userName)
          .status(200)
          .json({ loginSuccess: true, userId: user._id, loginSuccess: true, successmessage: `${user.userName}`+"님 환영합니다." })
      })
    })
  })
})


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
router.get('/logout', auth, (req, res) => {
  var use = User({userName : req.user.userName})
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ logoutsuccess: false, err });
      return res.render('login',{layout:'./login',hellow:`${use.userName}님 환영합니다.`,content: '로그아웃'})
    })
})

/********************************
 * 회원가입되었을때 띄울 화면
 * 
 *******************************/
router.get('/successAddUser',auth,(req,res)=>{
  
  var user = User({userId : req.user.userId,
                  userName : req.user.userName,
                  email : req.user.email,
                  teamList1 : req.user.teamList1
                })
  console.log(user.userId, user.userName, user.email, user.teamList1)
  return res.render('successAddUser', 
  {
    userId : user.userId,
    userName : user.userName,
    email : user.email,
    teamList1 : user.teamList1,
    layout:'./successAddUser',
    hellow:"환영합니다."
  })
})
/*************************************************
 * 마이페이지에 들어가면 나의 대여 현황이 보이는 기능
 * 
 *************************************************/
router.get("/myRentalStatus/:userNumber",auth, function(req, res, next) {
  var use = User({userName : req.user.userName})
  const userNumber = req.body.userNumber;
  User
    .findOne({ userNumber: userNumber })
    .then(user => {
      if (!user) return res.status(404).json({ message: "post not found" });
      console.log("Read Detail 완료");
      return res.status(200).render('myRentalStatus',{
        message: "Read Detail success",
        hellow:`${use.userName}님 환영합니다.`,
        data: {
          user: user
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: err
      });
    });
});

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
router.post('/userManagement',(req,res)=>{
  return res.json({
    message:"success"
  })
})
router.get('/userManagement',auth,(req, res)=>{
  const users=User({userName:req.user.userName})
  const use =User({
    userName    : req.params.userName,
    teamPosition: req.params.teamPosition,
    email       : req.params.email,
    userId      : req.user.userId,
    role        : req.user.role
  }) 
    User.findOne({ 
      userId    : req.params.userId,
      role      :req.params.role
     },(err,user) => { 
      if (use.role==1) {
        console.log("Read Detail 완료");
        console.log(user)
          User.updateOne({
            userId:req.body.userId
          },
          {
            rentalMan : req.body.rentalMan,
            registMan : req.body.registMan,
            editMan   : req.body.editMan
          })
          return res.render('userManagement',{
            userId    : req.user.userId,
            _id       : req.user._id,
            isAdmin   : req.user.role === 0 ? false : true,
            isAuth    : true,
            email     : req.user.email,
            userName  : req.user.userName,
            teamList  : req.user.teamList,
            role      : req.user.role,
            teamPosition :  req.user.teamPosition,
            token     : req.user.token,
            isEdit    :req.user.editMan === 0 ? false:true,
            isRental  :req.user.rentalMan === 0 ? false:true,
            isRegist  : req.user.registMan ===0 ? false:true,
            editMan   : req.params.editMan,
            rentalMan : req.params.rentalMan,
            registMan : req.paramsregistMan,
            hellow   : `${users.userName}`+"관리자님 환영합니다.",
            layout    : "./userManagement"
          })}
        else return res.json({message:"권한이 없습니다"})
      })
})
/********************************************
 * 관리자 권한 부여  
 ********************************************/
router.post('/admin/:userId',auth,(req,res)=>{
  const user = new User({
    isAdmin: req.body.role === 0 ? false : true,
    isAuth: true,
    isEdit:req.user.editMan === 0 ? false:true,
    isRental:req.user.rentalMan === 0 ? false:true,
    isRegist : req.user.registMan ===0 ? false:true,
    email: req.body.email,
    userId:req.body.userId,
    userName: req.body.userName,
    teamList: req.body.teamList,
    role: req.body.role,
    teamPosition :req.body.teamPosition,
    token: req.body.token,
    editMan : req.body.editMan,
    rentalMan : req.body.rentalMan,
    registMan : req.body.registMan
  })
  //비밀번호 초기화
  //client비밀번호 초기화->사번확인->사번에 저장된 비밀번호 초기화
  if(req.user.userId===''){
    res.status(400).send("userName required");
  }
  const userId = req.body.userId;
  User.findOne({ userNumber: userId} ,(err,user)=>{
      if (!user) return res.status(404).json({ message: "post not found" });
      console.log("Read Detail 완료");
      return res.status(200).json({
        message: "Read Detail success",
        data: {user: {user}},
        message:`${user.userName}`+"관리자님 환영합니다."
      });
  })
})

/******************************************
 * 마이페이지 만들기
 * 로그인하고 해당되는 토큰을 가졌을때만 가능
*******************************************/
router.post('/myRentalStatus',(req,res)=>{
  const user = new User({
    userId: req.user.userId,
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    isEdit:req.user.editMan === 0 ? false:true,
    isRental:req.user.rentalMan === 0 ? false:true,
    isRegist : req.user.registMan ===0 ? false:true,
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
  
    const userNumber = req.body.userNumber;
    User.findOne({ userNumber: userNumber} ,(err,user)=>{
        if (!user) return res.status(404).json({ message: "post not found" });
        console.log("Read Detail 완료");
        return res.status(200).json({
          message: "Read Detail success",
          data: {user: user},
          message:`${user.userName}`+"님 환영합니다."
        });
    })
})

/*******************************
 * 마이페이지 get
 * 자신의 대여현황이 보이게하기
 ******************************/
router.get('/myRentalStatus',auth,(req,res)=>{
const use = User({userName:req.user.userName});
    User.findOne({ userId:req.user.userId } ,(err,user)=>{
      Stock.find({$equal:{userId:req.user.userId}},(err,stock)=>{
        console.log(user)
        // if (!user) return res.status(404).json({ message: "post not found" });
        console.log("Read Detail 완료");
        return res.status(200).render('myRentalStatus',{
          message: "Read Detail success",
          data: {
            userName  : user.userName,
            email     : user.email,
            editMan   : user.editMan,
            rentalMan : user.rentalMan,
            registMan : user.registMan
          },
          layout:"./myRentalStatus",
          hellow:`${use.userName}`+"님 환영합니다.",
          userName : use.userName
        });
      })
    })
})
/*************************
 * 물품 관리 페이지
 * 
 *************************/
router.get('/stockManagement',auth,(req,res)=>{
  var user=User({userName:req.user.userName})
  res.status(200).render('stockManagement',{
    hellow:`${user.userName}님 환영합니다`,layout:"./stockManagement"
  })
})
router.get('/allRentalStatus',auth,(req,res)=>{
  var user=User({userName:req.user.userName})
  res.status(200).render('allRentalStatus',{
    hellow:`${user.userName}님 환영합니다`,layout:"./allRentalStatus"
  })
})


module.exports = router;