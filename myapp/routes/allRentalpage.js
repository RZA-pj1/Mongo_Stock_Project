/*************************************************
 * 담당자 : 김건희
 * 페이지 : 회원가입
 * 기능   : 유저들이 자신의 정보를 적으면 그 정보들을 
 *          백데이터에 담아주는 역할을 한다.
 *************************************************/
 var express = require('express');
 var router = express.Router();
 
 const { User } = require('../Models/addUser')
 const { auth } = require('../Controller/Auth')

router.get('/',auth,(req,res)=>{
    var user=User({userName:req.user.userName})
    res.status(200).render('allRentalStatus',{
      hellow:`${user.userName}님 환영합니다`,layout:"./allRentalStatus"
    })
  })