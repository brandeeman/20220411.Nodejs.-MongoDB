// 서버 오픈 문법

// 아까 설치한 라이브러리를 첨부해주세요.
const express = require("express");
// 첨부한 라이브러리를 가지고 객체를 만들어주세요.
const app = express();

// bodyParser 라이브러리 사용법
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// 서버를 염
// .땡땡 붙는 것 : 전부 다 함수
// 8080 서버 포트에 띄어주세요.
// 8080 포트로 들어오는 요청은 아래 처리를 해달라는 의미
// 브라우저 검색창 : http://localhost:8080/
app.listen(8080, function () {
  console.log("listening on 8080");
});

// get 요청 처리 하는 문
// 누군가가 /pet 으로 방문을 하면..
//pet 관련된 안내문을 띄어주자.

// app.get('경로', function(요청, 응답할 방법){
//     응답.send('펫용품 쇼핑할 수 있는 페이지입니다.');
// });

app.get("/pet", function (요청, 응답) {
  응답.send("펫용품 쇼핑할 수 있는 페이지입니다.");
});
//브라우저 : http://localhost:8080/pet

app.get("/", function (요청, 응답) {
  응답.sendFile(__dirname + "/index.html");
});

//

app.get("/write", function (요청, 응답) {
  응답.sendFile(__dirname + "/write.html");
});

//

//신문법 : ES6
// app.get("/write", (요청, 응답) => {
//   응답.sendFile(__dirname + "/write.html");
// });

//

// 어떤 사람이 /add 경로로 POST 요청을 하면...
// ??를 해주세요~
// consol로 value 값을 보냄
app.post("/add", function (요청, 응답) {
  console.log(요청.body.title);
  console.log(요청.body.date);
  console.log(요청.body);
  응답.send("전송완료");
});
