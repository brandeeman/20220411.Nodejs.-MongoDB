// 서버 오픈 문법

// 아까 설치한 라이브러리를 첨부해주세요.
const express = require("express");
// 첨부한 라이브러리를 가지고 객체를 만들어주세요.
const app = express();

// ejs를 쓰겠다. 등록하기
app.set("view engine", "ejs");

// bodyParser 라이브러리 사용법
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//전에 작성한 app.listen 옮겨오기
//mongodb 접속 완료되면 app.listen 실행해 주세요.
const MongoClient = requrie("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:1234@cluster0.8rr3j.mongodb.net/todoapp?retryWrites=true&w=majority",
  function (에러, client) {
    //에러가 발생했을 때 어떤 에러인지 알려줌
    if (에러) {
      return console.log(에러);
    }

    // todoapp이라는 db로 연결
    db = client.db("todoapp");

    // db.collection('post').insertOne('저장할데이터', function(에러, 결과){
    //   console.log('저장완료');
    // });

    // insertOne : post라는 파일에 '저장할데이터'를 저장해 주세요.
    db.collection("post").insertOne(
      { _id: 100, 이름: "Jone", 나이: 20 },
      function (에러, 결과) {
        console.log("저장완료");
      }
    );

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

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

  // _id: 총게시물갯수(totalPost) + 1 만드는 법
  db.collection("counter").findOne(
    { name: "게시물갯수" },
    function (에러, 결과) {
      console.log(결과.totalPost);
      var 총게시물갯수 = 결과.totalPost;

      db.collection("post").insertOne(
        { _id: 총게시물갯수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date },
        function (에러, 결과) {
          console.log("저장완료");
        }
      );
    }
  );
});

//목표
// /list로 GET 요청으로 접속하면
// 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌
// EJS 템플릿 사용

app.get("/list", function (요청, 응답) {
  // 디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요.
  //모든 데이터 가져오기 문법(DB 자료 찾기)
  db.collection("post")
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과);

      // html데이터를 브라우저에 보여줌
      // 찾은 DB 자료를 ejs에 집어넣기
      응답.render("list.ejs", { posts: 결과 });

      // ->list.html로 간다.
    });
});
