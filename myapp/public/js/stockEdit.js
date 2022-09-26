/******************************************************************************
 * 담당자      : 이승현
 * Function명 : selectGroup
 * 함수 설명   : remove와 append 함수를 사용
 * 기능 설명   : 대분류, 소분류 선택란
 *            
*******************************************************************************/ 
 function selectGroup() {
  var oscilloscope = ["Benchtop Oscilloscopes","터치스크린 오실로스코프","고성능 실시간 오실로스코프"];
  var spectrum = ["RF 스펙트럼 분석기 및 신호 분석기","Keithley 4200A-SCS 반도체 특성 분석기","광학 변조 분석기","주파수 카운터/타이머","8 시리즈 광 클럭 복구"];
  var accessory = ["Keithley 액세서리","프로브 및 액세서리"];
  var signalGenerator = ["임의 함수 발생기","텍트로닉스 임의 파형 발생기","RF 신호 발생기 TSG4100A"];
  var equipment = ["Keithley 소스 측정 장치","텍트로닉스 및 Keithley 디지털 멀티미터","Keithley 낮은 레벨, 고감도 및 특수 장비", "Keithley 액세서리"];
  var semiconductor = ["Keithley 4200A-SCS 반도체 특성 분석기","Keithley 파라메트릭 곡선 트레이서 구성","Keithley 파라메트릭 테스트 시스템", "Keithley 700 시리즈 반도체 스위칭 시스템"];
  var switching = ["Keithley DAQ6510 6½ Digits 데이터 획득 및 로깅 멀티미터 시스템","Keithley 2700 멀티미터/데이터 획득/스위치 시스템","Keithley 3700A 시스템 스위치/멀티미터", "시리즈 S46 마이크로파 전환 시스템"];
  var software = ["TekScope PC 분석 오실로스코프 소프트웨어","Keithley KickStart 소프트웨어","스펙트럼 분석기 소프트웨어", "TekDrive – 협업 데이터 작업 공간"];

  // 1번 셀렉트 박스의 값이 바뀔때마다 2번 셀렉트 박스의 옵션들이 바뀌도록 만들어 보자
  var selectGroupFirst = $("#bigGroup").val();
  var changeGroup;

  if(selectGroupFirst == "오실로스코프"){
    changeGroup = oscilloscope;
  }
  else if(selectGroupFirst == "신호, 스펙트럼 및 변조 분석기"){
    changeGroup = spectrum;
  }
  else if(selectGroupFirst == "구성 요소 및 액세서리"){
    changeGroup = accessory;
  }
  else if(selectGroupFirst == "신호 발생기"){
    changeGroup = signalGenerator;
  }
  else if(selectGroupFirst == "Keithley 장비 및 제품"){
    changeGroup = equipment;
  }
  else if(selectGroupFirst == "Keithley 반도체 테스트 시스템"){
    changeGroup = semiconductor;
  }
  else if(selectGroupFirst == "Keithley 스위칭 및 데이터 획득 시스템"){
    changeGroup = switching;
  }
  else if(selectGroupFirst == "소프트웨어"){
    changeGroup = software;
  }

  $('#smallGroup option').remove(); // 기존에 들어가 있는 2번 셀렉트 박스 안의 옵션들을 깨끗하게 지우기 위해서 remove함수를 사용

  for(var count = 0; count < changeGroup.length; count++ ){
                  var option = $("<option>"+changeGroup[count]+"</option>");
                  $('#smallGroup').append(option);
                  // append 함수를 이용해 셀렉트 박스 안에 만들어진 option을 삽입
  }
} 

/******************************************************************************
 * 담당자      : 이승현
 * 기능 설명   : 1. 편집 기능
                  > [수량은 숫자만 입력 가능]
                  > + 아니면 알림창 띄우기 기능
 * 함수 설명   :- window.event의 다양한 속성 중 paste, keypress를 사용하여 각각 붙여넣기,
                 키보드 키를 눌렀을 때 이벤트가 수행될 수 있도록 설젇했고,
               - getData() >> 이 이벤트는 이벤트의 clipboardData속성을 호출하여
                 클립보드 내용에 액세스할 수 있다
                          
*******************************************************************************/ 
function validate(evt) {
  var theEvent = evt || window.event;

  // 붙여넣기 시작하면 이벤트 시작
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // 사용자가 키를 눌렀을 때 이벤트 수행
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  // 숫자가 아닌 다른 것을 입력했을 때 오류 알림
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    alert('수량은 숫자만 입력해주세요.');
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

/******************************************************************************
 * 담당자      : 이승현
 * 기능 설명   : 제품 코드는 숫자와 문자만 입력 가능
 * 함수 설명   :  setInputFilter기능 을 사용하여 텍스트의 입력 값을 필터링 할 수 있다
 *               문자+숫자로만 입력 가능한 정규표현식은,
 *               /[^0-9a-zA-Zㄱ-ㅎ]/g  이다.
 * 
*******************************************************************************/ 
// input 숫자와 문자만 입력
// 지정된 텍스트 상자에 대한 입력을 지정된 입력 필터로 제한
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        alert('문자와 숫자만 입력해주세요.');
        $(this).val($(this).val().replace(/[^0-9a-zA-Zㄱ-ㅎ]/g,""));
      } else {
        
        this.value = "";
      }
    });
  });
}

// 입력 필터를 설치
setInputFilter(document.getElementById("productCode"), function(value) {
  return /^[0-9a-zA-Zㄱ-ㅎ]*$/i.test(value); });

/******************************************************************************
* 담당자      : 이승현
* 기능 설명   : 2. 초기화 기능
            > [작성 내용 모두 지우는 기능]
*              #id selector 를 사용해 [초기화] 버튼을 클릭했을 때 value 값을 삭제
*              함으로 초기화 기능을 부여함
* 
* 함수 설명   : input >> 클릭하면 사용자가 입력한 value 값을 null값으로 변환
*              radio >> 클릭하면 deselect 함수를 호출하고 함수 내에서는 radio 
*                       버튼타입의 input 중에서 name값이 fruit인 것들의 체크상태를
*                       false로 설정
*            
*******************************************************************************/ 
$(document).ready(function() {
// btn_reset을 클릭했을 때의 함수
$("#btn_reset").click(function() {
// text 속성
document.getElementById("productName").value = '';
document.getElementById("productCode").value = '';
// number 속성
document.getElementById("quantity").value = '';
// select 속성
document.getElementById("bigGroup").value = '';
document.getElementById("smallGroup").value = '';
// radio 속성
$("input:radio[name='rentable']").prop('checked', false);
$("input:radio[name='mustReturn']").prop('checked', false);

})
})
/******************************************************************************
* 담당자      : 이승현
* 기능 설명   : 3. 취소 기능                  
              > [작성 중인 화면 종료]
              >> [취소] 버튼을 클릭하면 화면 종료하는 기능
* 함수 설명   : javaScript의 History Object를 통해 
            한 페이지 뒤로 가는 기능 구현이 가능했습니다.
*            
*******************************************************************************/
function goCancle() {
window.history.back();
}