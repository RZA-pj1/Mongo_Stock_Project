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

//관리자 페이지 띄우기
router.get('/', auth, (req, res) => {
  //현재 로그인 중인 유저의 정보중 관리자 권한 정보와 이름을 가져오기  
  const users = User({
    userName: req.user.userName,
    role: req.user.role
  })
  //관리자인지 아닌지 확인
  if (users.role == 1) {
    //데이터베이스에 들어있는 모든 유저정보 가져오기
    User.find({}).then(user => {
      console.log("Read Detail 완료");
      console.log(user)
      return res.render('userManagement', {
        user:user,
        hellow: `${users.userName}` + "관리자님 환영합니다.",
      })
    })
  }
  else return res.json({ message: "권한이 없습니다" })
})
router.post('/userManagement/authority', auth, (req, res) => {
  const user = new User({
    isAdmin: req.body.role === 0 ? false : true,
    isAuth: true,
    isEdit: req.user.editMan === 0 ? false : true,
    isRental: req.user.rentalMan === 0 ? false : true,
    isRegist: req.user.registMan === 0 ? false : true,
    editMan: req.body.editMan,
    rentalMan: req.body.rentalMan,
    registMan: req.body.registMan
  })
  //권한부여
  //라디오 박스 클릭 후 권한부여 클릭하면 권한 부여 혹은 권한 제거
  if (req.user.userId === '') {
    res.status(400).send("userName required");
  }
  const userId = req.body.userId;
  User.findOneAndUpdate({ userId: userId }, (err, user) => {
    if (!user) return res.status(404).json({ message: "post not found" });
    console.log("Read Detail 완료");
    return res.status(200).json({
      message: "Read Detail success",
      data: { user: { user } },
      message: `${user.userName}` + "관리자님 환영합니다."
    });
  })
})

module.exports = router;