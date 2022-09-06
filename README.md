# Mongo_Stock_Project

1. express-generator로 구조 개편
2. 전체 기능 정의 
3. 각 기능별 세부 기능에 대해 api 명세 작성 - 아래 구조 참고
    - 로그인
    url : /api/login
    method : method
    data : {
     ID:{아이디}
     Password:{패스워드}
    }
    returnValue(반환값) : 
     로그인 성공시 : true
     id OR password incorrect : false

4. DB 비번 걸어두기 - 안걸어두면 털림
5. git pull test