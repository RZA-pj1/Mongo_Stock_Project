// import fetch from 'node-fetch'

// var myButton = document.getElementById('go_index');

// myButton.addEventListener('click', function(){
//     alert("Hello World");
//     /******************************************************************************
//      * 담당자      : 김건희
//      * Function명  : fetch()
//      * 함수 설명   : 오류시알람, 성공시 알람 후 페이지 이동
//      *           
//      *              - [토큰을 이용한 사용자 검증]
//      *              [로그인] 버튼 클릭 시 메인 화면으로 Redirect 하기
//      *            
//     *******************************************************************************/ 
       
//     document.location.href = "/index";
//        fetch('/login',{
//            method: 'post',
//            body: JSON.stringify({
//                name: res.user._id,
//                userNumber: res.user.userNumber,
//                password:res.user.password,
//            })
//        })
//        .then(res => {
//            return res.json()
//        })
//        .then(res => {
//         if (res.status === 200) {
//              alert('<%=error%>')
//              window.location.replace("http://localhost:3000/index.ejs");   
//         } else /*if (res.status === 403)*/ {
//              alert('<%=error%>');
//              history.back();
//         }
//     })
//    });
   $("#go_index").click(function(){
 
    // json 형식으로 데이터 set
    var params = {
            userNumber  : $("#userNumber").val()
            , name     : $("#name").val()
            , sex       : $("#sex").val()
            , age       : $("#age").val()
            , tellPh    : $("#tellPh").val()
    }
        
    // ajax 통신
    $.ajax({
        type : "POST",            // HTTP method type(GET, POST) 형식이다.
        url : "../Models/addUser",      // 컨트롤러에서 대기중인 URL 주소이다.
        data : params,            // Json 형식의 데이터이다.
        success : function(res){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
            // 응답코드 > 0000
            alert(res.code);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
            alert("통신 실패.")
        }
    });
});