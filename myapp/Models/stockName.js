var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var saltRounds = 10
// var jwt = require('jsonwebtoken');


var stockName = new mongoose.Schema({
    stockNumber: {
        type        : String,
        unique      : true,
    },
    category : {
        bigGroup: {
            type        : String,
        },
        smallGroup:{
            type        : [String],
        }
    },
    stockName :{
        type        : String,
    },
    stockInfo: {
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
        type        : Date,
    },
    endDate:{
        type        : Date,
    },
    returnDate:{
        type        : Date,
        default     : Date.now
    }
})

const Stock = mongoose.model('stock', stockName)

module.exports = { Stock }

