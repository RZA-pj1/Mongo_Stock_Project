/************************************************************************
 * 담당자 : 김건희
 * 기능   : 로그아웃 할 때 데이터베이스에서 로그인한 유저의 토큰을 지워줌
 *          토큰이 맞는 지 확인시 데이터베이스에서 확인을 해주기때문에
 *          데이터베이스에 있는 토큰을 지울시 무효화됨
 ************************************************************************/
 var express = require('express');
 var router = express.Router();

 const { User } = require('../Models/addUser')
 const { auth } = require('../Controller/Auth')


router.get('/', auth, (req, res) => {
    var use = User({ userName: req.user.userName })
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ logoutsuccess: false, err });
            return res.render('login', { layout: './login', hellow: `${use.userName}님 환영합니다.`, content: '로그아웃' })
        })
})
module.exports = router;