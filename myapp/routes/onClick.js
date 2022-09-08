import fetch from 'node-fetch'

var myButton = document.getElementById('go_index');

myButton.addEventListener('click', function(){
    alert("Hello World");
    /******************************************************************************
     * 담당자      : 김건희
     * Function명  : fetch()
     * 함수 설명   : 오류시알람, 성공시 알람 후 페이지 이동
     *           
     *              - [토큰을 이용한 사용자 검증]
     *              [로그인] 버튼 클릭 시 메인 화면으로 Redirect 하기
     *            
    *******************************************************************************/ 
       
    document.location.href = "/index";
       fetch('/login',{
           method: 'post',
           body: JSON.stringify({
               name: res.user._id,
               userNumber: res.user.userNumber,
               password:res.user.password,
           })
       })
       .then(res => {
           return res.json()
       })
       .then(res => {
        if (res.status === 200) {
             res.render('alert',(console.error('로그인 성공입니다.')))
             window.location.replace("http://localhost:3000/index.ejs");   
        } else /*if (res.status === 403)*/ {
             alert("사번 또는 비밀번호가 틀렸습니다.");
             return res.json();
        }
    })
    if (res.status === 200) {
        res.render('alert',(console.error('로그인 성공입니다.')))
        window.location.replace("http://localhost:3000/index.ejs");
   } else /*if (res.status === 403)*/ {
        alert("사번 또는 비밀번호가 틀렸습니다.");
   }
   });
