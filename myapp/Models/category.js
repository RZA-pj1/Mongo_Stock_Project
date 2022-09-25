/*
    담당자 : 김건희
    함수 설명 :  대분류 소분류 관리 스키마
    기능 설명 :  1. 대분류 소분류를 따로 관리하기 위한 스키마 작성
 */
var mongoose = require('mongoose');

var category = new mongoose.Schema({
    //대분류
    bigGroup: {
        type        : String,
    },
    //소분류
    smallGroup:{
        type        : [String],
    }
})



const Category = mongoose.model('category', category)

module.exports = { Category }