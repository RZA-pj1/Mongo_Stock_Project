/******************************************************************************
 * 담당자      : 이승현
 * Function명  : logoutPage(), stockManagementPage(), 
 *               stockRegistrationPage(), allRentalStatusPage()
 * 함수 설명   : document.location.href를 통해 이동할 페이지를 지정해 준다.
 * 기능 설명   : 1. 각 페이지로 이동하는 기능  
 *              [각 메뉴] 버튼 클릭 시 메인 화면으로 Redirect 하기
 *            
*******************************************************************************/ 
/*=============== 메인 index ===============*/
function indexPage()  {
  document.location.href = "/index.ejs";
}

/*=============== 물품 관리 ===============*/
function stockManagementPage()  {
  document.location.href = "/index.ejs";
}
/*=============== 물품 등록 ===============*/
function stockRegistrationPage()  {
  $.ajax({
  type : "GET",                       // HTTP method type(GET, POST) 형식이다.
    url : "/stockRegistration",        // 컨트롤러에서 대기중인 URL 주소이다.
    data : params,                     // Json 형식의 데이터이다.
    success : function(res){           // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
        // 응답코드 > 0000
        if(res.logoutsuccess!=false){
          alert("logout 성공");
          window.location.replace("/stockRegistration");}
      else{
          alert("logout실패");}
  },
  // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
    error : function(XMLHttpRequest, textStatus, errorThrown){ 
      console.log(XMLHttpRequest, textStatus, errorThrown) 
        alert("통신 실패.")
  }
  });
  document.location.href = "/stockRegistration.ejs";
}
/*=============== 대여 현황 ===============*/
function allRentalStatusPage()  {
  document.location.href = "/index.ejs";
}
/*=============== 마이페이지(나의 대여 현황) ===============*/
function myRentalStatusPage()  {
  document.location.href = "/myRentalStatus.ejs";
}

/******************************************************************************
 * 담당자      : 이승현
 * Function명  : userManagementPage()
 * 함수 설명   : document.location.href를 통해 이동할 페이지를 지정해 준다.
 * 기능 설명   : [이용자 관리] - 관리자만 표시되게 한다.
 *            
*******************************************************************************/

/*=============== 이용자 관리 페이지 - [관리자만 표시] ===============*/
function userManagementPage()  {
  document.location.href = "/userManagement.ejs";
}
/******************************************************************************
 * 담당자      : 이승현
 * 함수 설명   : toggle 함수를 사용해서 버튼을 클릭할 때마다 
 *              다크모드 속성이 추가되고, 빠지고 반복 형태이다
 * 기능 설명   : 달 모양 버튼을 클릭하면 다크모드로 변경되면서, 
 *              해 모양 이모티콘으로 바뀌고 다크모드 적용된다.
 *              그 후로 다크모드, 라이트모드 toggle
 *            
*******************************************************************************/

/*=============== DARK LIGHT THEME. 다크, 라이트 모드 ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// 이전에 선택한 항목(사용자가 선택한 경우)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// 다크 테마 클래스를 승인함으로써 인터페이스가 가지고 있는 현재 테마를 얻음
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

//사용자가 이전에 주제를 선택했는지 확인
if (selectedTheme) {
// 유효성 검사가 수행될 경우 다크모드를 활성화했는지 비활성화했는지 여부를 확인하는 데 어떤 문제가 있었는지를 묻기
document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// 버튼을 사용하여 테마를 수동으로 활성화/비활성화
themeButton.addEventListener('click', () => {
  // 어두운/아이콘 테마 추가 또는 제거
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // 사용자가 선택한 테마와 현재 아이콘을 저장
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})
/******************************************************************************
 * 담당자      : 이승현
 * Function명  : linkAction(), scrollHeader()
 * 함수 설명   : addEventListener로 add, remove 함수 및 클릭 이벤트를 
 *              사용하여 nav toggle 효과를 주었고,
 *              scroll event를 부여했다.
 * 기능 설명   : 1. 모바일에서 상단 메뉴가 사라지고 버튼 클릭 시 나타난다.
 *              2. 스크롤을 80viewport 이상 내리면 헤더 아랫 부분 은은한 그림자를 주어
 *                 헤더 영역을 돋보이게 만든다.
 *            
*******************************************************************************/
/*=============== 반응형. SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

/*===== MENU SHOW. 메뉴 보이기 =====*/
if(navToggle){
  navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
  })
}

/*===== MENU HIDDEN. 메뉴 닫기 =====*/
if(navClose){
  navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MENU MOBILE. 모바일에서 메뉴 toggle ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  // 각 nav__link를 클릭하면 show-menu 클래스가 제거됨
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER. header 배경 변경 ===============*/
function scrollHeader(){
  const header = document.getElementById('header')
  // 스크롤 높이가 80 veiwport 보다 크면 header 태그에 scroll-header class 를 추가한다.
  if(this.scrollY >= 80) header.classList.add('scroll-header'); 
  else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*=============== 로그아웃 ===============*/
function logoutPage()  {
  $.ajax({
  type : "GET",            // HTTP method type(GET, POST) 형식이다.
    url : "/logout",      // 컨트롤러에서 대기중인 URL 주소이다.
    data : params,            // Json 형식의 데이터이다.
    success : function(res){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
        // 응답코드 > 0000
        if(res.logoutsuccess!=false){
          alert("logout 성공");
          window.location.replace("/login");} // 성공 시 login 페이지로 이동
      else{
          alert("logout실패");}
  },
    error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
        alert("통신 실패.")
  }
  });
  // document.location.href = "/logout.ejs";
}
