/*************************************************
 * 담당자 : 김건희
 * 페이지 : 회원가입
 * 기능   : 유저들이 자신의 정보를 적으면 그 정보들을 
 *          백데이터에 담아주는 역할을 한다.
 *************************************************/
var express = require('express');
var router = express.Router();

const { User } = require('../Models/addUser')

router.post('/addUser', (req, res) => {
    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다.
    var user = new User(req.body)
    console.log(req.body)
    console.log(req.body.password)
    user.save((err, userInfo) => {
        console.log(userInfo)
        if (!userInfo) {
            return res.json({ hellow:"" ,addUserSuccess: false, err })
        }
        else {
            return res.json(
                { 
                    hollow:"",
                    addUserSuccess: true,
                    message: "회원가입 성공",
                })
        }
    })
})
router.get('/',(req,res)=>{
    res.status(200).render(
        'addUser',
        {
            hellow:"",
            layout:""
        })
})
module.exports = router;