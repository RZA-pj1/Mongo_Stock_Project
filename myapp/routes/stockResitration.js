/**********************************************
 * 담당자 : 김건희
 * 페이지 : 물품 등록
 * 기능   : 물품을 등록할 경우 물품의 정보 및
 *          대분류 소분류도 필요한 분류를 등록하여
 *          사용가능하도록 설계
 ***********************************************/

var express = require('express');
var router = express.Router();

var { User } = require('../Models/addUser');
var { auth } = require('../Middleware/Auth');
var { Stock } = require('../Models/stockName');
var { Category } = require('../Models/category');

router.get('/',auth,(req,res)=>{
    const user= User({userName:req.user.userName})
    Category.find({}).then(category=>{
      res.status(200).render('stockRegistration',{
        category : {category},
        hellow:`${user.userName}님 환영합니다.`,
        layout:"/stockRegistration",
        userName : user.userName
      })
    })
  })
  router.post('/stockRegistration' ,(req, res) =>{
    //물품등록할때 필요한 정보들을 Clinent 에서 가져오면
    //그것들을 데이터베이스에 넣어준다
    const category = new Category({
      bigGroup :  req.body.bigGroup,
      smallGroup : req.body.smallGroup
    })
    const stoke = new Stock({
      stockNumber   : req.body.stockNumber, // 품번
      stockImage    : req.body.stockImage,  // 물품 이미지
      stockInfo     : req.body.stockInfo, // 물품 정보
      category:{
        category
      },
      stockMount    : req.body.stockMount,  // 총 수량
      stockCount    : req.body.stockCount,  // 대여 중 수량
      stockName     : req.body.stockName, // 물품명
      startDate     : req.body.startDate, // 대여일
      returnDate    : req.body.returnDate,  // 실제 반납일
      endDate       : req.body.endDate, // 반납일
      rental        : req.body.rental,  // 대여여부
      mustReturn    : req.body.mustReturn, // 반납 여부
      updated_at    : req.body.updated_at // 등록일, 최종 수정일
    });
    category.save((err,categori)=>{
      console.log(categori)
      if (err) {
         res.json({ stockSaveSuccess: false, err })
      }
      else{
         res.json({
        //프론트에서 올때는 body에서 바로 오기때문에 다큐먼트에서 내올 필요 없음
        bigGroup:req.body.bigGroup,
        smallGroup:req.body.smallGroup,
        })
      }
    })
      stoke.save((err, stock) => {
        console.log("stock",stock)
        
        if (err) {
          return res.status(401).json({ stockSaveSuccess: false, err })
        }
        else{
           return res.status(200).json({
              //프론트에서 올때는 body에서 바로 오기때문에 다큐먼트에서 내올 필요 없음
              stockNumber:req.body.stockNumber,
              category:{
              bigGroup        :req.body.bigGroup,
              smallGroup      :req.body.smallGroup,
              },
              stockSaveSuccess: true,
              rental          :req.body.rental
              })
            }
        })
  })

module.exports = router;