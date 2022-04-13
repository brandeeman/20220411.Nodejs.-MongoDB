// 서버 오픈 문법

// 아까 설치한 라이브러리를 첨부해주세요.
const express = require("express");
// 첨부한 라이브러리를 가지고 객체를 만들어주세요.
const app = express();

// ejs를 쓰겠다.는 의미
app.set("view engine", "ejs");

// bodyParser 라이브러리 사용법
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//전에 작성한 app.listen 옮겨오기
//mongodb 접속 완료되면 app.listen 실행해 주세요.
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb+srv://admin:qwer1234@cluster0.8rr3j.mongodb.net/todoapp?retryWrites=true&w=majority", function(에러, client){
    
  //에러가 발생했을 때 어떤 에러인지 알려줌
  if (에러) return console.log(에러);

  // todoapp이라는 db로 연결
  db = client.db("todoapp");

  // db에 저장하는 법
  // db.collection('post').insertOne('저장할데이터', function(에러, 결과){
  //   console.log('저장완료');
  // });

  // insertOne : post라는 파일에 '저장할데이터'를 저장해 주세요.
  // db.collection("post").insertOne(
  // object 자료형 형식으로 저장하면 됨
    // { _id: 100, 이름: "Jone", 나이: 20 }, 
    // function (에러, 결과) {
      // console.log("저장완료");
    // }
  // );

  //서버띄우는 코드 여기로 옮기기
  app.listen('8080', function(){
    console.log('listening on 8080')
  });
});

// 서버를 염
// .땡땡 붙는 것 : 전부 다 함수
// 8080 서버 포트에 띄어주세요.
// 8080 포트로 들어오는 요청은 아래 처리를 해달라는 의미
// 브라우저 검색창 : http://localhost:8080/
// app.listen(8080, function () {
//     console.log("listening on 8080");
// });
  
// get 요청 처리 하는 문
// 누군가가 /pet 으로 방문을 하면..
// pet 관련된 안내문을 띄어주자.
  
// app.get('경로', function(요청, 응답할 방법){
//     응답.send('펫용품 쇼핑할 수 있는 페이지입니다.');
// });
  
//브라우저 : http://localhost:8080/pet
app.get("/pet", function (요청, 응답) {
  응답.send("펫용품 쇼핑할 수 있는 페이지입니다.");
});
  
app.get("/", function (요청, 응답) {
  응답.sendFile(__dirname + "/index.html");
});
  
app.get("/write", function (요청, 응답) {
  응답.sendFile(__dirname + "/write.html");
});
  
//신문법 : ES6 : 화살표 함수
// app.get("/write", (요청, 응답) => {
//   응답.sendFile(__dirname + "/write.html");
// });
  
//숙제
//어떤 사람이 /add 라는 경로로 post 요청을 하면, 
//데이터 2개(날짜, 제목)를 보내주는데, 
// 오브젝트 자료형 형식으로 : {제목 : '어쩌구', 날짜 : '어쩌구'}
// app.post("/add", function (요청, 응답) {
//   응답.send("전송완료");
//   console.log(요청.body.title);
//   console.log(요청.body.date);
//   // insertOne : 데이터를 데이터베이스에 넣을 수 있음
//   db.collection('post').insertOne({제목 : 요청.body.title, 날짜: 요청.body.date}, function (에러, 결과) {
//     console.log("저장완료");
//   });
// });
  
// 어떤 사람이 /add 경로로 POST 요청을 하면...
// ??를 해주세요~
// consol로 value 값을 보냄
// app.post("/add", function (요청, 응답) {
//   응답.send("전송완료");
//   console.log(요청.body.title);
//   console.log(요청.body.date);
//   console.log(요청.body);
// });

// 주제 : _id: 총게시물갯수(totalPost) + 1 만드는 법
//1단계 : DB에 'counter' collection 생성 -> Insert Document 생성(사진)
app.post("/add", function (요청, 응답) {
  응답.send("전송완료");

  // findOne : counter collection에서 데이터 하나를 찾고 싶다.
  // name이 게시물갯수인 데이터를 찾아주세요. 
  db.collection('counter').findOne({
    name : '게시물갯수'}, function(에러, 결과){ console.log(결과.totalPost);

    var 총게시물갯수 = 결과.totalPost;
  
    db.collection('post').insertOne({_id:총게시물갯수 + 1, 제목 : 요청.body.title, 날짜: 요청.body.date}, function (에러, 결과) {
      console.log("저장완료");

      // 숙제 : counter라는 collection에 있는 totalpost라는 항목도 1증가시켜야 함
      //updateOne : DB 데이터를 수정해주세요.
      // db.collection('counter').updateOne({어떤데이터를 수정 할 것인가},{{수정값}}, function(){})
      //수정값은 중괄호 안에 중괄호를 넣어줘야 함 : operator라고 함
      db.collection('counter').updateOne({name:'게시물갯수'},{$inc:{totalPost:1}}, function(에러, 결과){if(에러){return console.log(에러)}
      })
    });
  });
});
  
//목표
// /list로 GET 요청으로 접속하면
//실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌
//"EJS 템플릿" 사용
// -> list.html 만들기
  
app.get("/list", function (요청, 응답) {

  //DB에 저장된 데이터 가져오는 법
  // 디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요.
  // 포스트라는 파일을 가져오고 싶다.
  //.find().toArray()모든 데이터 가져오기 문법
  db.collection("post").find().toArray(function (에러, 결과) {
    console.log(결과);

    //ejs를 브라우저에 보여주는 법
    응답.render('list.ejs',{posts : 결과});
  });  
});

//삭제 요청 만드는 법
app.delete('/delete', function(요청, 응답){
  console.log(요청.body)
})