var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var auth = require('../Middleware/Auth');
var token = require('morgan');
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
router.get('/', (req, res) => res.render('login', {content: '로그인'}))

//app.get('/api/hello', (req, res) => res.send('Hello World!~~ '))
router.get('/addUser',(req,res) => res.render('addUser',{content:'회원가입'}))
router.post('/addUser', (req, res) => {
  //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
  //그것들을  데이터 베이스에 넣어준다. 
  var user = new User(req.body)
  user.save((err, userInfo) => {
    if (err){
        return res.json({
        success: false, err,
      })
    }
    else{ 
      return res.render('addUser', { layout: './addUser'})
        // return res.status(200).json({
        // success: true, userInfo
      //})
    }
  })
  console.log('req.body', res.body)
})

router.post('/login', (req, res) => {
  //요청된 사번을 데이터베이스에서 있는지 찾는다.
  User.findOne({ userNumber: req.body.userNumber }, (err, user) => {
    console.log('user', user)
    if (!user) {
      return res.send(
        "<scrit>alert('제공된 사번에 해당하는 유저가 없습니다.');window.location.replace(/login)</script>"
        // loginSuccess: false,
        // message: "제공된 사번에 해당하는 유저가 없습니다."
      )
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)

      // console.log('isMatch',isMatch)

      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

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
    userNumber: req.user.userNumber,
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    token: req.user.token
  })
  
})

router.get('/logout', auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})





module.exports = router;