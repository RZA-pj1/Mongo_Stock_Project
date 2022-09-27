/**
* 
* 담당자 : 이승현
* 함수 설명 :
* 기능 설명 :   1. 비밀번호, 사번 검증 - [비밀번호, 사번 둘 중 하나가 틀린 경우 둘 다 오류 표시]
                2. 회원가입 페이지 이동
                3. 메인 페이지 이동 기능 - [토큰을 이용한 사용자 검증]
* 
* */

/******************************************************************************
* 담당자      : 이승현
* Function명 : (set, get, delete)Cookie
* 함수 설명   : toGMTString()
* 기능 설명   : 사원번호 저장하기 누르면 7일 간 저장됨
* Return     : unescape(cookieValue)
*            
*******************************************************************************/ 
  $(document).ready(function(){

  // 저장된 쿠키값을 가져와서 ID 칸에 넣어준다. 없으면 공백으로 들어감.
  var key = getCookie("key");
  $("#userId").val(key); 
  
  if($("#userId").val() != ""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
      $("#idSaveCheck").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
    }
    
    $("#idSaveCheck").change(function(){ // 체크박스에 변화가 있다면,
        if($("#idSaveCheck").is(":checked")){ // ID 저장하기 체크했을 때,
            setCookie("key", $("#userId").val(), 7); // 7일 동안 쿠키 보관
        }else{ // ID 저장하기 체크 해제 시,
            deleteCookie("key");
        }
    });
  
  // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
  //  $("#userId").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
  //      if($("#idSaveCheck").is(":checked")){ // ID 저장하기를 체크한 상태라면,
  //          setCookie("key", $("#userId").val(), 7); // 7일 동안 쿠키 보관
  //      }
  //  });
  });

  function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
  }

  function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
  }

  function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
  }

  /******************************************************************************
    * 담당자      : 이승현
    * 함수 설명   : toggleClass()
    * 기능 설명   : 눈 이모티콘 클릭 시 비밀번호 보이기/가리기 기능
    *            
  *******************************************************************************/ 
  $(function(){
      // 눈표시 클릭 시 패스워드 보이기
      $('.eyes').on('click',function(){
          $('.input.password').toggleClass('active');

          if( $('.input.password').hasClass('active') == true ){
              $(this).find('.fa-eye').attr('class',"fas fa-eye-slash").parents('.input').find('#password').attr('type',"text");
                          // i 클래스                // 텍스트 보이기 i 클래스
          }
          else{
              $(this).find('.fa-eye-slash').attr('class',"fas fa-eye").parents('.input').find('#password').attr('type','password');
          }
      });
  });

  /******************************************************************************
  * 담당자      : 이승현
  * Function명  : indexPage
  * 함수 설명   : window.location.replace를 통해 이동할 페이지를 지정해 준다.
  * 기능 설명   : 3. 메인 페이지 이동 기능 - [토큰을 이용한 사용자 검증]
  *              [로그인] 버튼 클릭 시 메인 화면으로 Redirect 하기
  *            
  *******************************************************************************/ 
  function addUserPage()  {
      window.location.replace("http://localhost:5000/addUser");
  }

  $("#go_index").click(function(){

  // json 형식으로 데이터 set
  var params = {
          userId         : $("#userId").val()
          , userName     : $("#name").val()
          , password     : $("#password").val()
  }
      
  // ajax 통신
  $.ajax({
      type : "POST",            // HTTP method type(GET, POST) 형식이다.
      url : "/",      // 컨트롤러에서 대기중인 URL 주소이다.
      data : params,            // Json 형식의 데이터이다.
      success : function(res){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
          // 응답코드 > 0000
          if(res.loginSuccess!=false){
              alert(res.successmessage);
              window.location.replace("/index");}
          else{
              alert(res.message);}
      },
      error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
          alert("통신 실패.")
      }
  });
  });
            
            