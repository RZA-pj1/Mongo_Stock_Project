var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongoose = require('mongoose');
process.setMaxListeners(15);

var config = require('./config/key');
var router = require('./routes');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.use(router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var db;
//mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI,{
  //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('connected successful'))
  .catch((err) => console.error(err));

module.exports = app;




/**
 * 담당자 : 이승현
 * 함수 설명 : view engine을 ejs로 세팅
 * 기능 설명 : ejs를 사용하기 위한 랜더링 기능 
 */
// 가져오기
// const express = require('express') 
// const expressLayouts = require('express-ejs-layouts')
// const router = express.Router()


// const app = express()
// const port = 3000

 
// app.use(express.static('public')) // 정적 폴더 지정
 
//  app.use(expressLayouts)
//  // app.set('layout', './about') ('키', '값')으로 설정을 저장
//  app.set('layout', './login')  // views/login.ejs를 기본 레이아웃으로 설정하고 <%- body %> 부분에 렌더링 된 html 문자열이 들어감
//  app.set("layout extractScripts", true) // 렌더링된 html에서 모든 script 태그를 추출해서 <%- script %> 부분에 들어감
//  app.set('view engine', 'ejs') // Express에서 view엔진을 ejs로 설정
//  app.engine('html', require('ejs').renderFile)
 
 
//  app.get('', (req, res) => {   // render 파일명(ejs 확장자는 생략이 가능)
//    res.render('login', {content: '로그인'})
//  })
//  app.get('/addUser', (req, res) => {
//    res.render('addUser')
//  })
 
//  app.get('/successAddUser', (req, res) => {
//    res.render('successAddUser', { layout: './successAddUser'})
//  })
 
//  app.get('/index', (req, res) => {
//    res.render('index', { layout: './index'})
//  })
 
//  app.get('/stockManagement', (req, res) => {
//    res.render('stockManagement', { layout: './stockManagement'})
//  })
 
//  app.get('/stockRegistration', (req, res) => {
//    res.render('stockRegistration', { layout: './stockRegistration'})
//  })
 
//  app.get('/stockEdit', (req, res) => {
//    res.render('stockEdit', { layout: './stockEdit'})
//  })
 
//  app.get('/rentalScreen', (req, res) => {
//    res.render('rentalScreen', { layout: './rentalScreen'})
//  })
 
//  app.get('/myRentalStatus', (req, res) => {
//    res.render('myRentalStatus', { layout: './myRentalStatus'})
//  })
 
//  app.get('/userManagement', (req, res) => {
//    res.render('userManagement', { layout: './userManagement'})
//  })
 
//  app.get('/allRentalStatus', (req, res) => {
//    res.render('allRentalStatus', { layout: './allRentalStatus'})
//  })
 
//  app.get('/rentalHistory', (req, res) => {
//    res.render('rentalHistory', { layout: './rentalHistory'})
//  })
 

// // 포트 5000에서 수신 대기 중
// app.listen(port, () => console.info('Listening on port ${port}'))

// module.exports = router;
