/******************************************************************************
  * 담당자      : 이승현
  * Function명 : selectTeam
  * 함수 설명   : remove와 append 함수를 사용
  * 기능 설명   : 영업부를 선택하면 영업부에 해당하는 부서만 보이도록 
  *              부서 선택에 조건으로 selcet option 추가하는 기능
  * Params     : 
  * Return     : true or false
  *            
  *******************************************************************************/ 
 function selectTeam() {
  var salesTeam = ["국내영업","해외영업","대리점관리"];
  var technologyTeam = ["제품생산","자재관리","외주관리"];
  var qualityManagementTeam = ["품질경영","품질관리","A/S"];
  var affiliatedEnterprise = ["제품설계","제품개발","지적재산권"];

  // 1번 셀렉트 박스의 값이 바뀔때마다 2번 셀렉트 박스의 옵션들이 바뀌도록 만들어 보자
  var selectTeamFirst = $("#teamList1").val();
  var changeTeam;

  if(selectTeamFirst == "영업부"){
    changeTeam = salesTeam;
  }
  else if(selectTeamFirst == "기술부"){
    changeTeam = technologyTeam;
  }
  else if(selectTeamFirst == "품질경영부"){
    changeTeam = qualityManagementTeam;
  }
  else if(selectTeamFirst == "기업부설연구소"){
    changeTeam = affiliatedEnterprise;
  }

  $('#teamList2 option').remove(); // 기존에 들어가 있는 2번 셀렉트 박스 안의 옵션들을 깨끗하게 지우기 위해서 remove함수를 사용

  for(var count = 0; count < changeTeam.length; count++ ){
                  var option = $("<option>"+changeTeam[count]+"</option>");
                  $('#teamList2').append(option);
                  // append 함수를 이용해 셀렉트 박스 안에 만들어진 option을 삽입
  }

} 

/******************************************************************************
 * 담당자      : 이승현
 * Function명 : fn_pw_check
 * 함수 설명   : 정규표현식을 활용한 비밀번호 체크 로직
 * 기능 설명   : 2. 비밀번호 유효성 검증기능 - [비밀번호 최소 4자리 이상 특수문자 제외]
                2-1. 비밀번호 확인 기능
 * Params     : 
 * Return     : true or false
 *            
*******************************************************************************/ 
// 2. 비밀번호 검증 기능
var pw_passed = true;  // 추후 벨리데이션 처리시에 해당 인자값 확인을 위해

function fn_pw_check() {

  var pw = document.getElementById("txtPassword1").value; //비밀번호
  var pw2 = document.getElementById("txtPassword2").value; // 확인 비밀번호
  var id = document.getElementById("userId").value; // 아이디

  pw_passed = true;

  var pattern1 = /[0-9]/;     // 숫자
  var pattern2 = /[a-zA-Z]/;  // 영문
  var pw_msg = "";

  // 아이디(사원번호) validation
  if(id.length == 0) {
          alert("사원번호를 입력해주세요");
          return false;
    } else {
          
    }

    // ************************ 2-1 비밀번호 확인 기능 ****************************
    if(pw.length == 0) {
          alert("비밀번호를 입력해주세요");
          return false;
    } else {
            if( pw  !=  pw2) {
                  alert("비밀번호가 일치하지 않습니다.");
                  return false;
            } else {
              if ( pw == pw2 )
                alert("비밀번호가 일치합니다!");
                return false;
            }
    }
  
    if(!pattern1.test(pw)||!pattern2.test(pw)||pw.length<4||pw.length>50){
      alert("영문+숫자 4자리 이상으로 구성하여야 합니다.");
      return false;
  }          
  if(pw.indexOf(id) > -1) {
      alert("비밀번호는 ID를 포함할 수 없습니다.");
      return false;
  }
  var SamePass_0 = 0; //동일문자 카운트
  var SamePass_1 = 0; //연속성(+) 카운드
  var SamePass_2 = 0; //연속성(-) 카운드

  for(var i=0; i < pw.length; i++) {
        var chr_pass_0;
        var chr_pass_1;
        var chr_pass_2;
        if(i >= 2) {
            chr_pass_0 = pw.charCodeAt(i-2);
            chr_pass_1 = pw.charCodeAt(i-1);
            chr_pass_2 = pw.charCodeAt(i);

            //동일문자 카운트
            if((chr_pass_0 == chr_pass_1) && (chr_pass_1 == chr_pass_2)) {
              SamePass_0++;
            } 
            else {
              SamePass_0 = 0;
              }
            //연속성(+) 카운드
            if(chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
                SamePass_1++;
            }
            else {
              SamePass_1 = 0;
            }
            //연속성(-) 카운드
            if(chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
                SamePass_2++;
            } 
            else {
              SamePass_2 = 0;
            }  
        }     
      if(SamePass_0 > 0) {
          alert("동일문자를 3자 이상 연속 입력할 수 없습니다.");
          pw_passed=false;
        }
      if(SamePass_1 > 0 || SamePass_2 > 0 ) {
          alert("영문, 숫자는 3자 이상 연속 입력할 수 없습니다.");
          pw_passed=false;
        } 
        if(!pw_passed) {             
            return false;
            break;
      }
  }
  return true;
}
/******************************************************************************
 * 담당자      : 이승현
 * Function명 : CheckEmail(str)
 * 함수 설명   : 정규표현식을 활용한 이메일 유효성 검증
 * 기능 설명   : 3. 메일 검증 기능 - [@, . 등은 있어야 함]
 * Params     : str
 * Return     : true or false
 *            
*******************************************************************************/ 
  // 3. 메일 검증 기능

  // 이메일이 잘못되었는지 확인하는 함수 
  function CheckEmail(str){
    var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!reg_email.test(str)){
      return false;
    }
    else{
      return true;
    }
  }

  // 회원가입 확인 버튼을 클릭했을 때 실행되는 함수                                 
  function GoToEnroll(){
    var obEmail = document.getElementById("email");
    if (!obEmail.value) {
      alert("이메일을 입력하세요!");
      obEmail.focus();   
      return;
    }
    else{
      if(!CheckEmail(obEmail.value))   {
        alert("이메일 형식이 잘못되었습니다 @, .은 반드시 포함해 주세요");
        obEmail.focus();
        return;
      }
      else{
       var param={
         userId      : $("#userId").val(),
         userName    : $("#userName").val(),
         password    : $(".txtPassword").val(),
         email       : $("#email").val(),
         teamList1   : $("#teamList1").val(),
         teamList2   : $("#teamList2").val(),
         teamPosition : $("#teamPosition").val()
       }
       $.ajax({
         type : "POST",            // HTTP method type(GET, POST) 형식이다.
         url : "/addUser",         // 컨트롤러에서 대기중인 URL 주소이다.
         data : param,             // Json 형식의 데이터이다.
         //dataType : JSON,          //Jason형식데이터로 받겠다.
         success : function(res){  // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
         console.log(res)  
         // 응답코드 > 0000
           if(res.addUserSuccess!=false){
              alert("가입성공")
             window.location.replace("/successAddUser");}  // 회원가입 성공 시 이동
           else{
            console.log("가입실패")
           }
       },
       error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
         console.log(XMLHttpRequest, textStatus, errorThrown) 
         alert("통신 실패.")
         console.log("가입실패")
       }
       });
      }
    }
   
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
            $(this).find('.fa-eye').attr('class',"fas fa-eye-slash").parents('.input').find('.txtPassword').attr('type',"text");
                        // i 클래스               // 텍스트 보이기 i 클래스
        }
        else{
            $(this).find('.fa-eye-slash').attr('class',"fas fa-eye").parents('.input').find('.txtPassword').attr('type','password');
        }
    });
});





