/****************************************
 * 담당자 : 김건희
 * 페이지 : 로그아웃시 로그인 페이지로
 * 기능   : 로그아웃 되었을시 데이터베이스에 저장된
 *          토큰을 지우므로 해당토큰이 만료되었음을
 *          알게하기
 ***************************************/ 
var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');


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

module.exports = router;