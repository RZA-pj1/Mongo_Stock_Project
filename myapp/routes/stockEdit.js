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
var { Category } = require('../Models/category')
var { auth } = require('../Controller/Auth');
var { Stock } = require('../Models/stockName')
const { User } = require('../Models/addUser')

router.post('/stockEdit', (req, res) => {
    const stoke = new Stock({
        //제품코드
        stockNumber: req.body.stockNumber,
        //제품이미지
        stockImage: req.body.stockImage,
        //제품정보
        stockInfo: req.body.stockInfo,
        //대분류 소분류
        category: {
            //대분류
            bigGroup: req.body.bigGroup,
            //소분류
            smallGroup: req.body.smallGroup
        },
        //대여가능여부
        rental: req.body.rental,
        //반납가능여부
        return: req.body.return,
        //현재 재고
        stockMount: req.body.stockCount,
        //제품 이름
        stockName: req.body.stockName
    })
    //해당제품코드를 찾아 다음 정보들을 바꾸기
    stoke.update(
        //제품코드 찾기
        { stokeNumber: req.body.stockNumber },
        {
            //제품재고
            stockMount: req.body.stockMount,
            //제품이름
            stockName: req.body.stockName,
            //제품정보
            stockInfo: req.body.stockInfo,
            //제품이미지
            stockImage: req.body.stockImage,
            //대여가능여부
            rental: req.body.rental,
            //대여반납여부
            return: req.body.return,
            //대분류 소분류
            category: {
                bigGroup: req.body.bigGroup,
                smallGroup: req.body.smallGroup
            }
        })
    //다음 정보들 저장하기    
    return res.status(200).json({
        //재품 총수량
        stockMount: req.body.stockMount,
        //제품 이름
        stockName: req.body.stockName,
        //제품 정보
        stockInfo: req.body.stockInfo,
        //제품 이미지
        stockImage: req.body.stockImage,
        //대여 가능 여부
        rental: req.body.rental,
        //반납 가능 여부
        return: req.body.return,
        //대분류
        bigGroup: req.body.bigGroup,
        //소분류
        smallGroup: req.body.smallGroup,
        //제품코드
        stockNumber: req.body.stockNumber
    })
})
//제품 편집 화면 띄우기
router.get('/', auth, (req, res) => {
    //유저의 이름을 헤더에 보내기 위한 작업
    var user = User({ userName: req.user.userName })
    //분류를 화면에 띄우기 위해 카테고리 스키마를 가져온다.
    var category = new Category({
        bigGroup: req.params.bigGroup,
        smallGroup: req.params.smallGroup
    })
    //카테고리 
    Stock.findOne({stockNumber},)
    return res.status(200).render('stockEdit', {
        bigGroup: req.params.bigGroup,
        smallGroup: req.params.smallGroup,
        hellow: `${user.userName}님 환영합니다.`
    })
})

module.exports = router;