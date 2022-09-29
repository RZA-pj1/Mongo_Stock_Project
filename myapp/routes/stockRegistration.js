/***************************************************
 * 담당자 : 김건희
 * 페이지 : 물품등록
 * 기능   : 1. 대분류 소분류 새로 등록시 카테고리 스키마에
 *          저장
 *          2. 확인을 누를시 카테고리 스키마에 저장된 값이
 *          화면에 들어가도록 데이터 프론트로 넘김
 *          3. 확인을 누르면 stock스키마에 물품 등록
 *******************************************************/
var express = require('express');
var router = express.Router();
let multer = require('multer')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(cookieParser());

const { User } = require('../Models/addUser')
const { Stock } = require('../Models/stockName')
const { Category } = require('../Models/category')
const { auth } = require('../Controller/Auth')


router.get('/', auth, (req, res) => {
  const user = User({ userName: req.user.userName })
  User.find({}).then(category => {
    return res.status(200).render('stockRegistration', {
      category: { category },
      hellow: `${user.userName}님 환영합니다.`,
      userName: user.userName,
    })
  })
})
router.post('/stockRegistration', (req, res) => {
  //물품등록할때 필요한 정보들을 Clinent 에서 가져오면
  //그것들을 데이터베이스에 넣어준다
  const category = new Category({
    bigGroup: req.body.bigGroup,
    smallGroup: req.body.smallGroup
  })
  const stoke = new Stock({
    stockNumber: req.body.stockNumber, // 품번
    stockImage: req.body.stockImage,  // 물품 이미지
    stockInfo: req.body.stockInfo, // 물품 정보
    category: {
      bigGroup: req.body.bigGroup,
      smallGroup: req.body.smallGroup
    },
    stockMount: req.body.stockMount,  // 총 수량
    stockCount: req.body.stockCount,  // 대여 중 수량
    stockName: req.body.stockName, // 물품명
    startDate: req.body.startDate, // 대여일
    returnDate: req.body.returnDate,  // 실제 반납일
    endDate: req.body.endDate, // 반납일
    rental: req.body.rental,  // 대여여부
    mustReturn: req.body.mustReturn, // 반납 여부
    updated_at: req.body.updated_at // 등록일, 최종 수정일
  });

  //카테고리에 대분류 소분류에 적은 값을 저장
  category.save((err, categori) => {
    console.log(categori)
    stoke.save((err, stock) => {
      if (err) {
        return res.json({ stockSaveSuccess: false, err })
      }
      else {
        return res.json({
          //프론트에서 올때는 body에서 바로 오기때문에 다큐먼트에서 내올 필요 없음
          stockNumber: req.body.stockNumber,
          category:category,
          stockSaveSuccess: true,
          rental: req.body.rental
        })
      }
    })
  })
})
  module.exports = router;