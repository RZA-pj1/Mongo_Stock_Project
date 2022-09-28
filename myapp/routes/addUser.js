/*****************************************************
 * 담당자 : 김건희
 * 페이지 : 회원가입
 * 기능   : 회원가입시 client가 입력한 유저 정보저장
 *****************************************************/
var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');


router.get('/',(req,res) =>
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

module.exports = router;