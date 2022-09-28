/******************************************
 * 담당자 : 김건희
 * 페이지 : 물품 편집
 * 기능   : 물품을 편집하기 위한 페이지
 *          client가 원하는 제품 등록시 저장하게되면
 *          해당 물품이 데이터베이스에 저장 
 */
var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');

router.post('/stockEdit',(req,res)=>{
    const stoke = new Stock({
      stockNumber   : req.body.stockNumber,
      stockImage    : req.body.stockImage,
      stockInfo     : req.body.stockInfo,
      category:{
        bigGroup    : req.body.bigGroup,
        smallGroup  : req.body.smallGroup
      },
      rental        : req.body.rental,
      return        : req.body.return,
      stockMount    : req.body.stockCount,
      stockName     : req.body.stockName
    })
    stoke.update(
      {stokeNumber  : req.body.stockNumber},
      {
        stockMount  : req.body.stockMount,
        stockName   : req.body.stockName,
        stockInfo   : req.body.stockInfo,
        stockImage  : req.body.stockImage,
        rental      : req.body.rental,
        return      : req.body.return,
        category:{
          bigGroup    : req.body.bigGroup,
          smallGroup  : req.body.smallGroup
        }
      })
      return res.status(200).json({
        stockMount  : req.body.stockMount,
        stockName   : req.body.stockName,
        stockInfo   : req.body.stockInfo,
        stockImage  : req.body.stockImage,
        rental      : req.body.rental,
        return      : req.body.return,
        bigGroup    : req.body.bigGroup,
        smallGroup  : req.body.smallGroup,
        stockNumber : req.body.stockNumber
      })
  })
  router.get('/',auth,(req,res)=>{
    var user = User({userName:req.user.userName})
    var category = new Category({
      bigGroup:req.params.bigGroup,
      smallGroup:req.params.smallGroup
    })
    category.findOne().where(stockNumber)
    return res.status(200).render('stockEdit',{
      layout    : './stockEdit',
      bigGroup  : req.params.bigGroup,
      smallGroup: req.params.smallGroup,
      hellow    : `${user.userName}님 환영합니다.`
    })
  })

module.exports = router;