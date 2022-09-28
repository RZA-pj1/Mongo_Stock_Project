/************************************************
 * 회원가입 성공했을때 넘어갈 화면
************************************************/
 var express = require('express');
 var router = express.Router();

const { User } = require('../Models/addUser')
const { auth } = require('../Controller/Auth')
 
router.get('/',auth,(req,res)=>{
  
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