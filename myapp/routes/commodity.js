var {Stock} = require("../models/stockName");
var stock = express.Router();
var stockbig = {};
var stocksmall = {};

stock.use(express.json());
stock.get('/commodity', (req, res) => res.render('commodityRegistration', {content: '물품등록'}))
stock.post('/commodity',function(req,res,next){
    smallGroup.distinct("bigGroup").sort({"bigGroup : 1" : console.log(`${res}`)})
    //물류 데이터 추가
    stockName.update = function (req, res) {
        Employee.findByIdAndUpdate(
            req.params.id, {
            $set:
            {
                stockNumber: req.body.stockNumber,
                stockname: req.body.name,
                stockInfo: req.body.stockInfo,
                seq: req.body.seq
            }
        },
            { new: true }, function (err, Stock) {
                if (err) {
                    console.log(err);
                } else {
                    return res.render('index',{title:'Express',bigGroupdata:data});
                }
            });
    };
})
stock.delete('/commodity',function(req,res,next){
    smallGroup.distinct("bigGroup").sort({"bigGroup : 1" : console.log(`${res}`)})
    // 물류 데이터 제거
    stockName.delete = function (req, res) {
        Employee.remove({ _id: req.body.id }, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Employee deleted!!");
                res.redirect("/stock");
            }
        });
    };
});


    // smallGroup.distinct("bigGroup").sort({"country:1"})
    // Stock.query('SELECT DISTINCT bigGroup FROM smallGroup ORDER BY country ASC', function(error,data){
    //     res.render('index',{title:'Express',bigGroupdata:data});
    // });


//검색창에 검색시 사용할 부분
//검색키워드(물품이름)을 칠시 관련 키워드를 찾음
// stock.get("/commodityRegistration",async (req,res)=>{
//     let data = await Product.find(
//         {
//             "$or":[
//                 {name:{$regex:req.params.key}}
//             ]
//         }
//     )
//     console.log(req.params.key);
//     res.send(data);
// })
//---------------------------------------------------//



//끄적인 부분 이후에 사용할 수 있으니 놔두는 부분
/*function itemChange(){
    var keyboard = ["갈축","청축","적축"];
    var mouse = ["광마우스","유선마우스","비싼마우스","미키마우스"];
    var monitor = ["17인치","22인치","24인치","26인치"];
    var selectItem = $("#select1").val();
    var changeItem;
    if(selectItem == "키보드"){
        changeItem = keyboard;
    }
    else if(selectItem == "마우스"){
        changeItem = mouse;
    }
    else if(selectItem == "모니터"){
        changeItem = monitor;
    }
    $('#select2').empty();//2번쩨 셀렉트 박스 옵션 지우기
    for(var count = 0; count < changeItem.size(); count++){
        var option = $("<option>"+changeItem[count]+"</option>");
        $('#select2').append(option);//2번째 셀렉트 박스에 만들어진 option삽입
    }
}*/
