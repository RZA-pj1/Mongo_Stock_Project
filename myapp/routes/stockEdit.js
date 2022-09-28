/***************************************************************************************
 * ** 물품 편집 페이지 **
 * ** 물품 편집을 위한 스키마 작업 **
 * ** Stock에 들어있는 물품 정보 **
 * 담당자 :김건희
 * 페이지 : 물품편집
 * 기능 : 각 물품 정보 업데이트를 위해 client들이 원하는 정보 받아와서 각 물품 정보 업데이트
 ***************************************************************************************/
var express = require('express');
var router = express.Router();

//로그인한 유저의 정보를 가져오기
var { auth } = require('../Controller/Auth');
var { Stock } = require('../Models/stockName')
const { User } = require('../Models/addUser')

router.post('/stockEdit', (req, res) => {
    const stoke = new Stock({
        stockNumber: req.body.stockNumber,
        stockImage: req.body.stockImage,
        stockInfo: req.body.stockInfo,
        category: {
            bigGroup: req.body.bigGroup,
            smallGroup: req.body.smallGroup
        },
        rental: req.body.rental,
        return: req.body.return,
        stockMount: req.body.stockCount,
        stockName: req.body.stockName
    })
    stoke.update(
        { stokeNumber: req.body.stockNumber },
        {
            stockMount: req.body.stockMount,
            stockName: req.body.stockName,
            stockInfo: req.body.stockInfo,
            stockImage: req.body.stockImage,
            rental: req.body.rental,
            return: req.body.return,
            category: {
                bigGroup: req.body.bigGroup,
                smallGroup: req.body.smallGroup
            }
        })
    return res.status(200).json({
        stockMount: req.body.stockMount,
        stockName: req.body.stockName,
        stockInfo: req.body.stockInfo,
        stockImage: req.body.stockImage,
        rental: req.body.rental,
        return: req.body.return,
        bigGroup: req.body.bigGroup,
        smallGroup: req.body.smallGroup,
        stockNumber: req.body.stockNumber
    })
})
router.patch('/', auth, (req, res) => {
    var user = User({ userName: req.user.userName })
    var category = new Category({
        bigGroup: req.params.bigGroup,
        smallGroup: req.params.smallGroup
    })
    category.findOne().where(stockNumber)
    return res.status(200).render('stockEdit', {
        layout: './stockEdit',
        bigGroup: req.params.bigGroup,
        smallGroup: req.params.smallGroup,
        hellow: `${user.userName}님 환영합니다.`
    })
})

module.exports = router;