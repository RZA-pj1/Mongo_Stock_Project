var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var saltRounds = 10
// var jwt = require('jsonwebtoken');
// var autoIncrement = require('mongoose-auto-increment');

var stockName = new mongoose.Schema({
    stockNumber: {
        type        : String,
        maxlength   : 50,
        unique      : true,
        // Array       : [],
        require     : [true,"사용하고 있는 품번입니다."]
    },
    bigGroup: {
        type        : String,
        maxlength   : 50,
        // Array       : [],
    },
    smallGroup:{
        type        : String,
        maxlength   : 50,
        // Array       : [],
    },
    stockInfo: {
        type        : String,
        // Array       :[]
    },
    role: {
        type        : Number,
        default     : 0,
        // Array       : []
    },
    stockimage: {
        type        : String,
        // Array       : [],
    },
    updated_at : {
        type        : Date,
        defailt     : Date.now
    },
    seq:{
        type        : Number,
        default     : 0
    }
})
// stockName.plugin(autoIncrement.plugin, {
//     model: 'hws',
//     field: 'seq',
//     startAt: 1, //시작
//     increment: 1 // 증가
// });

const Stock = mongoose.model('stock', stockName)

module.exports = { Stock }

