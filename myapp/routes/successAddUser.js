/******************************************
 * 담당자 : 김건희
 * 페이지 : 회원가입후 client에게 회원가입이
 *         잘 완료되었는지 알려주는 페이지 
 **************************************** */


var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');

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

module.exports = router;