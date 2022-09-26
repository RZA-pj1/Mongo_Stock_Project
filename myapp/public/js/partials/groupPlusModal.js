/******************************************************************************
 * 담당자      : 이승현
 * Function명 : show(), close()
 * 함수 설명   : .background >>>>> .background .show 로 className을 변환해 팝업 열기
 *              .background .show >>>>> .background 로 다시 되돌려주면 팝업 닫기
 * 기능 설명   : 팝업을 띄우고, 종료하는 함수
 * Params     : 
 * Return     : true or false
 *            
*******************************************************************************/ 
// 팝업 열기
function show() {
  document.querySelector(".background").className = "background show";
}

// 팝업 닫기
function close() {
  document.querySelector(".background").className = "background";
}

document.querySelector("#show").addEventListener("click", show);
document.querySelector("#close").addEventListener("click", close);
/*********************************************
*담당자 : 김건희
*기능   : 추가하기 버튼을 눌렀을때 데이터값 저장
**********************************************/
//추가하기 버튼을 눌렀을때 이벤트
function addList(){
  
  //통신해줄 값 정의
  var params = {
    bigGroup     : $("#bigGroup").val()
    ,smallGroup  : $("#samllGroup").val()
  }
  
  // ajax 통신
  $.ajax({
    type : "POST",            // HTTP method type(GET, POST) 형식이다.
    url : "/stockRegistration",      // 컨트롤러에서 대기중인 URL 주소이다.
    data : params,            // Json 형식의 데이터이다.
    success : function(res){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
    // 응답코드 > 0000
      if(res.stockSaveSuccess == true){
        alert("물품 저장 성공");
      }
      else{
        alert("물품 저장 실패");
      }
    },
    error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
      alert("통신 실패.")
    }
  });
}
