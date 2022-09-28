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
 //로그인한 유저의 아이디를 검색해서 토큰을 지워준다
    User.findOneAndUpdate(
      //로그인해 있는 유저의 아이디 찾기
        { _id: req.user._id },
        //토큰 지우기
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ logoutsuccess: false, err });
            //로그아웃을 할 경우 로그인화면을 랜더 시키기
            return res.render('login', { layout: './login',content: '로그아웃' })
        })
})
module.exports = router;