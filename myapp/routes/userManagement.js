/**********************************************
 * 담당자 : 김건희
 * 페이지 : 관리자 페이지
 * 기능   : 유저 추방 및 권한 부여등 관리자의
 *          역할을 수행할 수 있게 만들어주는 기능 
 **********************************************/

var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');


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

module.exports = router;