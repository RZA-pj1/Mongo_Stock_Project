 /******************************************************************************
 * 담당자      : 이승현
 * 함수 설명   : .background >>>>> .background .show 로 className을 추가해 팝업 열기
 *              .background .show >>>>> .background 로 다시 되돌려주면 팝업 닫기
 * 기능 설명   : 팝업을 띄우고, 종료하는 함수
 *            
*******************************************************************************/ 
  $( document ).ready(function() {
    $('.show_btn').on('click', function() {
        $('.background').addClass('show');
        return false;
    });
    $('#close').on('click', function() {
        $('.background').removeClass('show');
        return false;
    });
});
/******************************************************************************
 * 담당자      : 이승현
 * 함수 설명   : jQuery :eq() 선택자를 이용해서 hidden class를 부여하고 삭제하였다.
 * 기능 설명   : 대분류 메뉴 클릭 시 대분류 메뉴 항목 전환하고,
 *              클릭한 메뉴의 테이블만 보이게 한다.
 *              추가로 어떤 대분류에 해당하는 내용인지 알 수 있도록
 *              해당 대분류에 hover 효과 고정과 같은 class인 select_title을 부여했다.
 *              대분류에 해당하는 소분류 항목이 보이도록 설정함(대분류 소분류 조건 검색)
 *            
*******************************************************************************/
$(window).ready(function(){
  // defalut 값
  $(".sub:eq(0)").removeClass('hidden')
  $(".title:eq(0)").addClass('select_title')
  $(".small_group:eq(0)").removeClass('hidden')
  $(".small_group:not(:eq(0))").addClass('hidden')

})
$("#stock_big_group tr .title:eq(0)").on('click', function() {
  // 대분류에 해당하는 테이블만 보여주기
  $(".sub:not(:eq(0))").addClass('hidden')
  $(".sub:eq(0)").removeClass('hidden')
  // 대분류 메뉴 현재 위치 알려주기
  $(".title:eq(0)").addClass('select_title')
  $(".title:not(:eq(0))").removeClass('select_title')

  // 대분류에 해당하는 소분류 보여주기
  $(".small_group:eq(0)").removeClass('hidden')
  $(".small_group:not(:eq(0))").addClass('hidden')
})
$("#stock_big_group tr .title:eq(1)").on('click', function() {
    $(".sub:not(:eq(1))").addClass('hidden')
    $(".sub:eq(1)").removeClass('hidden')
    // 대분류 메뉴 현재 위치 알려주기
    $(".title:eq(1)").addClass('select_title')
    $(".title:not(:eq(1))").removeClass('select_title')
    // 대분류에 해당하는 소분류 보여주기
    $(".small_group:eq(1)").removeClass('hidden')
    $(".small_group:not(:eq(1))").addClass('hidden')
})
$("#stock_big_group tr .title:eq(2)").on('click', function() {
    $(".sub:not(:eq(2))").addClass('hidden')
    $(".sub:eq(2)").removeClass('hidden')

    $(".title:eq(2)").addClass('select_title')
    $(".title:not(:eq(2))").removeClass('select_title')

    $(".small_group:eq(2)").removeClass('hidden')
    $(".small_group:not(:eq(2))").addClass('hidden')
})
$("#stock_big_group tr .title:eq(3)").on('click', function() {
    $(".sub:not(:eq(3))").addClass('hidden')
    $(".sub:eq(3)").removeClass('hidden')

    $(".title:eq(3)").addClass('select_title')
    $(".title:not(:eq(3))").removeClass('select_title')

    $(".small_group:eq(3)").removeClass('hidden')
    $(".small_group:not(:eq(3))").addClass('hidden')
})
$("#stock_big_group tr .title:eq(4)").on('click', function() {
    $(".sub:not(:eq(4))").addClass('hidden')
    $(".sub:eq(4)").removeClass('hidden')

    $(".title:eq(4)").addClass('select_title')
    $(".title:not(:eq(4))").removeClass('select_title')

    $(".small_group:eq(4)").removeClass('hidden')
    $(".small_group:not(:eq(4))").addClass('hidden')
})
$("#stock_big_group tr .title:eq(5)").on('click', function() {
    $(".sub:not(:eq(5))").addClass('hidden')
    $(".sub:eq(5)").removeClass('hidden')

    $(".title:eq(5)").addClass('select_title')
    $(".title:not(:eq(5))").removeClass('select_title')

    $(".small_group:eq(5)").removeClass('hidden')
    $(".small_group:not(:eq(5))").addClass('hidden')
})
$("#stock_big_group tr .title:eq(6)").on('click', function() {
    $(".sub:not(:eq(6))").addClass('hidden')
    $(".sub:eq(6)").removeClass('hidden')

    $(".title:eq(6)").addClass('select_title')
    $(".title:not(:eq(6))").removeClass('select_title')

    $(".small_group:eq(6)").removeClass('hidden')
    $(".small_group:not(:eq(6))").addClass('hidden')
})
$("#stock_big_group tr .title:eq(7)").on('click', function() {
    $(".sub:not(:eq(7))").addClass('hidden')
    $(".sub:eq(7)").removeClass('hidden')

    $(".title:eq(7)").addClass('select_title')
    $(".title:not(:eq(7))").removeClass('select_title')

    $(".small_group:eq(7)").removeClass('hidden')
    $(".small_group:not(:eq(7))").addClass('hidden')
})

// var params = {
//     postType: 'insEvent'
//     ,rcvSlct: $('[name=radio]:checked').val()   // radio값 받아오기
//     ,stockName     : $("#productName").val()     // 제품명
//     // *** 오류코드
//     ,category       : $("#bigGroup").val()             // 분류
//     ,productCode    : $("#productCode").val()   // 제품코드

//     // *** 해결해야 할 것 : get으로 백에서 계산된 값 받아오기 ***
//     // ,stockRentableNumber    : $("").val()       // 대여 가능 수량
//     ,stockCount     : $("#rentingNumber").val() // 대여 중 수량
//     ,stockMount     : $("#totalNumber").val()   // 총 수량
    
//     // *** input radio 값 받아오기
//     ,rental         : $('#rentable').val()    // 대여 가능 여부(O,X)
//     ,mustReturn     : $('#mustReturn').val()      // 반납 여부(O,X)

//     ,
//     }
  /********************************************
  //담당자 : 김건희 
  //회원가입 확인 버튼을 클릭했을 때 실행되는 함수
  *********************************************/
//     console.log(params)    
//     // ajax 통신
//     $.ajax({
//         type : "POST",            // HTTP method type(GET, POST) 형식이다.
//         url : "/index",      // 컨트롤러에서 대기중인 URL 주소이다.
//         data : params,            // Json 형식의 데이터이다.
//         success : function(res){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
        // success : function(data){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
            // console.log(data);
            // if(data.type == 2) {
            //     alert("대여 가능");
            // }
            // else {
            //     alert("대여 불가능")
            // }    
        // 응답코드 > 0000
            // if(stockMount == 0){
            //     alert(res.successmessage);}
            //     // window.location.replace("/index");
            // else{
            //     alert(res.message);}
    //     },
    //     error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
    //         alert("통신 실패.")
    //     }
    // });
