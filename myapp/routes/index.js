var express = require('express');
var router = express.Router();
let multer = require ('multer')

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');



/**********************************************
 * 물품 편집 등록 기능
**********************************************/

router.post('/stockRegistration', (req, res) =>{
  //회원가입 할때 필요한 정보들을 Clinent 에서 가져오면
  //그것들을 데이터베이스에 넣어준다 

  const stoke = new Stock({
    stockNumber:req.body.stockNumber,
    category:{
      bigGroup:req.body.category.bigGroup,
      smallGroup:req.body.category.smallGroup
    },
    stockInfo:req.body.stockInfo
  });
  stoke.save((err, result) => {
    console.log(result)
      if (err) {
        return res.status(401).json({ stockSaveSuccess: false, err })
      }
      else{
        return res.status(200).json({
          bigGroup:req.body.category.bigGroup,
          smallGroup:req.body.category.smallGroup,
          stockSaveSuccess: true,
          rental:req.body.rental
        })
      }
  })
  stoke.findOne({rental: req.body.rental},function(req,res){
    if(rental=="O")
    {
      var stock = new Stock({
        stockCount:req.body.stockCount
      })
      stock.updateOne(stockCount,{$inc:-1},function(err,res){
        res.json({stockCount:req.body.stockCount,message : "rental합니다."})
      })
    }
    else res.json({message:"렌탈하지 않습니다."})
  })
  // stoke.updateOne(res)
})

router.get('/stockRegistration',(req,res)=>{
  Stock.find(req.body)
  console.log(req.body.category.bigGroup)
  console.log(req.body.stockNumber)
  console.log(req.body.category.smallGroup)
  
  return res.render('stockRegistration',
  {
    bigGroup : req.body.category.bigGroup,
    smallGroup:req.body.category.smallGroup,
    stockNumber:req.body.stockNumber,
    layout:'./stockRegistration'
  });
})
// router.get('/stockRegistration',function(req,res,next){
//   var type = req.query.type;
//   if(type == 'smallGroup')
//   {
//     Stock.find().where('smallGroup').select('smallGroup').sort({smallGroup:'asc'})
//     res.render('stockRegistration',{title:'Express',smallGroupdata : Stock, layout:'./stockRegistration'});
//   }
//   Stock.query(query, function(error,bigGroupdata){
//     var data_arr = [];
//     bigGroupdata.forEach(function(row){
//       data_arr.push(row.Data);
//     });
//     res.json(data_arr);
//   })
// })


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
router.get('/addUser',(req,res) => res.render('addUser',{content:'회원가입'}))
router.post('/addUser', (req, res) => {
  //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
  //그것들을  데이터 베이스에 넣어준다. 
  var user = new User(req.body)
  console.log(req.body)
  console.log(req.body.password)
  user.save((err, userInfo) => {
    if (err){
      return res.json({addUserSuccess: false, err})
    }
    else{
      return res.render('successAddUser', { layout: './successAddUser',addUserSuccess:true,message:"회원가입 성공"})
    }
  })
})

router.post('/', (req, res) => {
  //요청된 사번을 데이터베이스에서 있는지 찾는다.
  User.findOne({ userId: req.body.userId }, (err,user) => {
    
    console.log('user', req.body.userId)
    if (!user) {
      // return res.render('alert', {error: '요청하신 사번은 존재하지 않습니다.'});
      return res.json({ loginSuccess: false, message: "요청하신 사번은 존재하지 않습니다." })
    }

    //요청된 사번이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log("password",req.body.password)
      if (!isMatch){return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })}
      else if(isMatch) {return res.json({userName:user.userName,loginSuccess: true, message: `${user.userName}`+"님 환영합니다."})}
      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        return res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
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
    teamList: req.user.teamList,
    role: req.user.role,
    teamPosition :req.user.teamPosition,
    token: req.user.token
  })
})

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.render('/',{content: '로그인'})
      
    })
})
// app.get('/mypage', auth, function (요청, 응답) { 
//   console.log(요청.user); 
//   응답.render('mypage.ejs', {}) 
// }) 



router.get('/successAddUser',(req,res)=>{
  return res.render('successAddUser', {layout:'./successAddUser'})
})



/**********************************
 * 이미지 업로드 기능 
 * 
 **********************************/
 var storage = multer.diskStorage({
    destination : function(req,file,cb){
    cb(null,'./public/image')},
    filename :function(req,file,cb){
    cb(null,file.originalname)}
  });
  var upload=multer({storage:storage});
  router.get('/upload',function(요청,응답){
  응답.render('upload.ejs')});
  router.post('/upload', upload.single('input의 name속성이름'),function(요청,응답){ 응답.send('업로드완료')});


module.exports = router;