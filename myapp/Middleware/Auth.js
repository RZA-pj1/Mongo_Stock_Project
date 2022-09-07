var { User } = require('../Models/addUser');

let auth = (req, res, next) => {
    //인증 처리를 하는곳 
    //클라이언트 쿠키에서 토큰을 가져온다.

    let token = req.cookies.x_auth;
    // 토큰을 복호화 한후  유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })


        // console.log('userh', user)

        req.token = token;
        req.user = user;
        next();
    })
}



// const { JsonWebTokenError } = require("jsonwebtoken");
// const { User } = require("../models/User");

// let auth = (req,res,next)=>{
// //인증처리
//     //클라이언트 쿠키에서 토큰을 가져온다.
//     let token = req.cookies.x_auth;

//     //토큰을 복호화 한후 유저를 찾음
//     User.findByToken(token,(err,user)=>{
//         if(err) throw err;
//         if(!user) return res.json({isAuth: false, error: true})
//         req.token = token;
//         req.user = user;
//         next();
//     })
        
//     //유저가 있으면 인증한다

//     //유저가 없으면 인증 못한다.

// }
module.exports = { auth };