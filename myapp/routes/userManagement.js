/**************************************************
 * 담당자 : 김건희
 * 페이지 : 유저관리 페이지
 * 기능   : 관리자만 이용가능
 *          이용자의 권한부여
 *          해당유저 추방가능
 *          현재 사이트에 가입한 유저 리스트 확인가능
 **************************************************/
var express = require('express');
var router = express.Router();

const { User } = require('../Models/addUser')
const { auth } = require('../Controller/Auth')

router.post('/userManagement', (req, res) => {
    return res.json({
        message: "success"
    })
})
router.get('/userManagement', auth, (req, res) => {
    const users = User({ userName: req.user.userName })
    const use = User({
        userName: req.params.userName,
        teamPosition: req.params.teamPosition,
        email: req.params.email,
        userId: req.user.userId,
        role: req.user.role
    })
    User.findOne({
        userId: req.params.userId,
        role: req.params.role
    }, (err, user) => {
        if (use.role == 1) {
            console.log("Read Detail 완료");
            console.log(user)
            User.updateOne({
                userId: req.body.userId
            },
                {
                    rentalMan: req.body.rentalMan,
                    registMan: req.body.registMan,
                    editMan: req.body.editMan
                })
            return res.render('userManagement', {
                userId: req.user.userId,
                _id: req.user._id,
                isAdmin: req.user.role === 0 ? false : true,
                isAuth: true,
                email: req.user.email,
                userName: req.user.userName,
                teamList: req.user.teamList,
                role: req.user.role,
                teamPosition: req.user.teamPosition,
                token: req.user.token,
                isEdit: req.user.editMan === 0 ? false : true,
                isRental: req.user.rentalMan === 0 ? false : true,
                isRegist: req.user.registMan === 0 ? false : true,
                editMan: req.params.editMan,
                rentalMan: req.params.rentalMan,
                registMan: req.paramsregistMan,
                hellow: `${users.userName}` + "관리자님 환영합니다.",
                layout: "./userManagement"
            })
        }
        else return res.json({ message: "권한이 없습니다" })
    })
})
router.post('/admin/:userId',auth,(req,res)=>{
    const user = new User({
      isAdmin: req.body.role === 0 ? false : true,
      isAuth: true,
      isEdit:req.user.editMan === 0 ? false:true,
      isRental:req.user.rentalMan === 0 ? false:true,
      isRegist : req.user.registMan ===0 ? false:true,
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