/******************************************************************************
 * 담당자      : 이승현
 * Function명 : fn_egov_init_date()
 * 함수 설명   : jquery datetimepicker plugin을 사용하여 시작일, 종료일 설정한다.
 *              부가적인 옵션 설정을 통해 간결하게 1시간 단위으 시간 설정과, 한국어 설정,
 *              스크롤(휠) 이벤트 차단, 최소 날짜와 최대 날짜 설정을 도와주었다.
 * 기능 설명   : 1. 반납 시간 설정 기능
                > [시작일, 종료일 설정 가능]
                > [시간 단위로 설정 기능]
*            
*******************************************************************************/ 
jQuery.datetimepicker.setLocale('kr');  // 한국어 설정
$(document).ready(function() {
    fn_egov_init_date()
})

function fn_egov_init_date(){
    var $startDate = $('#startDate'); // 시작일
    var $endDate = $('#endDate'); // 종료일
    // 시작일 설정
    $startDate.datetimepicker({
        lang: 'ko',
        format: 'Y-m-d H:i',  // 시간 단위로 설정 ex) 2022-09-13 21:25
        scrollMonth: false, // 달력에서 스크롤 이벤트가 발생하여도 날짜 변동이 없게 만들기
        scrollInput: false,
        onShow: function (ct) {
            this.setOptions({
                maxDate: $endDate.val() ? $endDate.val() : false  
                // $endDate.val()가 참값일 때 maxDate에 $endDate.val()값이 할당되고, 거짓일 때 false가 할당됨
            })
        },
    });
    // 종료일 설정
    $endDate.datetimepicker({
        lang: 'ko',
        format: 'Y-m-d H:i',
        scrollMonth: false,
        scrollInput: false,
        onShow: function (ct) {
            this.setOptions({
                minDate: $startDate.val() ? $startDate.val() : false
            })
        }
    });

}
/******************************************************************************
 * 담당자      : 이승현
 * 기능 설명   : 3. 취소 클릭 시 진행 취소 기능
                >> [취소] 버튼을 클릭하면 화면 종료하는 기능
* 함수 설명   : javaScript의 History Object를 통해 
              한 페이지 뒤로 가는 기능 구현이 가능했습니다.
*            
*******************************************************************************/
function goCancle() {
window.history.back();
}