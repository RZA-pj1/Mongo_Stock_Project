/*
    담당자 : 김건희
    함수 설명 : 
    기능 설명 :  1. 비밀번호, 사번 검증 - [비밀번호, 사번 둘 중 하나가 틀린 경우 둘 다 오류 표시]
                2. 회원가입 페이지 이동
                3. 메인 페이지 이동 기능 - [토큰을 이용한 사용자 검증]

 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltRounds = 10
var jwt = require('jsonwebtoken');


var userSchema = new mongoose.Schema({
    userId: {
        type        : Number,
        maxlength   : 50,
        unique      : true,
    },
    userName: {
        type        : String,
        maxlength   : 50
    },
    email: {
        type        : String,
        trim        : true,
        unique      : 1
    },
    password: {
        type        : String,
        minlength   : 4
    },
    lastname: {
        type        : String,
        maxlength   : 50
    },
    role: {
        type        : Number,
        default     : 0
    },
    image           : String,
    token: {
        type        : String
    },
    tokenExp: {
        type        : Number
    },
    updated_at : {
        type        : Date,
        defailt     : Date.now
    },
    teamList1:{
        type : String,
    },
    teamList2:{
        type : String,
    },
    teamPosition:{
        type : String,
    },
    editMan:{
        type        : String,
        default     : 0,
    },
    rentalMan:{
        type        : String,
        default     : 0,
    },
    registMan:{
        type        :String,
        default     : 0,
    },
    stockCount:{
        type        :Number,
    }
})


userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function (plainPassword, cb) {

    //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    console.log('user._id', user._id)
    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id
    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    // user._id + ''  = token
    //토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}



var User = mongoose.model('User', userSchema)

module.exports = { User }