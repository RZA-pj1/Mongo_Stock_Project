/*******************************************
 * 담당자 : 김건희
 * 페이지 : 마이페이지
 * 기능   : 1. 해당 유저의 대여현황을 띄워주기
 *          2. 해당 유저의 정보를 띄워주기
 ********************************************/

var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');

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

module.exports = router;