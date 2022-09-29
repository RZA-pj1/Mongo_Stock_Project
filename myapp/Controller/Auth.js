var { User } = require('../Models/addUser');

let auth = (req, res, next) => {

    //인증 처리를 하는곳 
    //클라이언트 쿠키에서 토큰을 가져온다.
    const token = req.cookies.x_auth;
    // 토큰을 복호화 한후  유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        //유저가 로그인 안헸을경우
        if (!user) {
            return res.render('successAddUser',
            {
                hellow:"로그인이 안되어있습니다",
                layout:"successAddUser",
                isAuth: false,
                error: true,
                hellow:"",
                message: "불러올 수 있는 값이 없습니다.",
                userId : "undefined",
                email : "undefined",
                userName : "undefined",
                teamList1 : "undefined",
                teamList2 : "undefined",
                teamPosition:"undefind"
            })
            
        }
        
        req.token = token;
        if(req.user = user){
            //다음에 올 함수를 실행시키기 위해 next()써준다. 
            next();
        }
        else{
            res.send('로그인이 안되어있습니다. 로그인해주세요')
        }

    })
}

module.exports = { auth };