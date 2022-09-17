var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var saltRounds = 10
// var jwt = require('jsonwebtoken');


var stockName = new mongoose.Schema({
    stockNumber: {
        type        : String,
        //maxlength   : 50,
        unique      : true,
        //required     : true
    },
    category : {
        bigGroup: {
            type        : String,
            // maxlength   : 50,
        },
        smallGroup:{
            type        : [String],
            // maxlength   : 50,
        }
    },
    stockName :{
        type        : String,
    },
    stockInfo: {
        type        : String,
    },
    role: {
        type        : Number,
        default     : 0,
    },
    stockimage: {
        type        : String,
    },
    updated_at : {
        type        : Date,
        defailt     : Date.now()
    },
    
    rental: {
        type        : String ,
    },
    stockMount:{
        type        : Number,
    },
    stockCount:{
        type        : Number,
    },
    stockImage:{
        image       : String,
    },
    startDate:{
        Date        : Date,
    },
    endDate:{
        Date        : Date,
    }
})

const Stock = mongoose.model('stock', stockName)

module.exports = { Stock }

