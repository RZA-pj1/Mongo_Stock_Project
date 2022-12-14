/*
    담당자 : 김건희
    함수 설명 : 전체적인 물품의 현황을 다루는 스키마
    기능 설명 :  1. 물품의 대여 현황 및 사용자의 이용 현황 관리해 줄 스키마
*/
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var saltRounds = 10
// var jwt = require('jsonwebtoken');


var stockName = new mongoose.Schema({
    //품번(Sirial Number) , 쿨품 코드
    stockNumber: {
        type        : String,
        unique      : true,
    },
    category : {
        //대분류
        bigGroup: {
            type        : String,
        },
        //소분류
        smallGroup:{
            type        : String,
        }
    },
    //물품명
    stockName :{
        type        : String,
    },
    //물품 정보
    stockInfo: {
        type        : String,
    },
    //대여 여부
    rental: {
        type        : String ,

    },
    //반납여부
    return:{
        type        : Number,
        default     : 0
    },
    // 대여 가능 수량
    stockRentable:{
        type        : Number,
        default     : 0
    },
    //대여 중 수량
    stockCount:{
        type        : Number,
        default     : 0
    },
    //총 수량
    stockMount:{
        type        : Number,
    },
    //대여할 수량
    rentalMount:{
        type        : Number,
    },
    //물품 이미지 랜더
    stockImage:{
        image       : String,
    },
    //빌리는 일자
    startDate:{
        type        : Date,
        default     : Date.now()
    },
    //반납일자 지정
    endDate:{
        type        : Date,
        default     : Date.now()
    },
    //실제 반납일자
    returnDate:{
        type        : Date,
        default     : Date.now()
    },
    // 등록일
    updated_at : {
        type        : Date,
        default     : Date.now()
    },
    userId : {
        type        : Number
    }
})

const Stock = mongoose.model('stocks', stockName)

module.exports = { Stock }
