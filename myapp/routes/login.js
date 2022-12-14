/************************************************************************
 * 담당자 : 김건희
 * 페이지 : 로그인
 * 기능   : 1. 로그인시 비밀번호 확인
 *          2. 사번 입력한 유저의 사번과 데이터베이스 사번을 확인
 *          3. 사번이 일치한다면 해당 로그인 유저의 이름으로 '환영합니다' 띄우기
 ************************************************************************/
var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');

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

router.get('/', (req, res) => res.render('login', {content: '로그인'}))

module.exports = router;