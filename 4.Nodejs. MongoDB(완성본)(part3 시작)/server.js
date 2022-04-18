// 서버 오픈 문법

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use('/public', express.static('public'));

// bodyParser 라이브러리 사용법
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//methodOverride 라이브러리 설정 : 2줄
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//mongodb 접속 완료되면 app.listen 실행해 주세요.
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb+srv://admin:qwer1234@cluster0.8rr3j.mongodb.net/todoapp?retryWrites=true&w=majority", function(에러, client){
    
  if (에러) return console.log(에러);

  db = client.db("todoapp");
  // db = client;

  app.listen('8080', function(){
    console.log('listening on 8080')
  });
});

//브라우저 : http://localhost:8080/pet
app.get("/pet", function (요청, 응답) {
  응답.send("펫용품 쇼핑할 수 있는 페이지입니다.");
});

app.get('/', function (요청, 응답) {
  응답.render('index.ejs');
});
  
app.get('/write', function (요청, 응답) {
  응답.render('write.ejs');
});  

// 주제 : _id: 총게시물갯수(totalPost) + 1 만드는 법
//1단계 : DB에 'counter' collection 생성 -> Insert Document 생성(사진)
app.post("/add", function (요청, 응답) {
  응답.send("전송완료");

  db.collection('counter').findOne({
    name : '게시물갯수'}, function(에러, 결과){ console.log(결과.totalPost);

    var 총게시물갯수 = 결과.totalPost;
  
    db.collection('post').insertOne({_id:총게시물갯수 + 1, 제목 : 요청.body.title, 날짜: 요청.body.date}, function (에러, 결과) {
      console.log("저장완료");

      db.collection('counter').updateOne({name:'게시물갯수'},{$inc:{totalPost:1}}, function(에러, 결과){if(에러){return console.log(에러)}
      });
    });
  });
});

//DB에 저장된 데이터 가져오는 법
app.get("/list", function (요청, 응답) {

  db.collection("post").find().toArray(function (에러, 결과) {
    console.log(결과);
    응답.render('list.ejs',{posts : 결과});
  });  
});

//삭제 요청 만드는 법
app.delete('/delete', function(요청, 응답){
  console.log(요청.body);
  
  요청.body._id = parseInt(요청.body._id);

  // 요청.body 의 내용물을 삭제해주세요. 
  db.collection('post').deleteOne(요청.body, function(에러, 결과){
    console.log('삭제완료');
    응답.status(200).send({message : '성공했습니다'});
  });
});

//

//detail1로 접속하면 detail1.ejs 보여줌
app.get('/detail/:id', function(요청, 응답){
  db.collection('post').findOne({_id : parseInt(요청.params.id)}, function(에러, 결과){
    console.log(결과);
    응답.render('detail.ejs', { data : 결과 });
  });
});

//

//edit 기능
app.get('/edit/:id',function(요청, 응답){
  db.collection('post').findOne({_id : parseInt(요청.params.id)}, function(에러, 결과){
    //숙제 : 에러코드가 발생했을 경우 try-catche 어떻게 쓸까?

    console.log(결과);
    응답.render('edit.ejs', { post :  결과 });
  });
});

//update 함수 쓰는 법
app.put('/edit', function(요청, 응답){
  //폼에담긴 제목 데이터, 날짜 데이터를 가지고 db.collection 에다가 업데이트함
  //set : update 해주세요. 없으면 추가해주세요.
  db.collection('post').updateOne({_id : parseInt(요청.body.id)},{$set : {제목:요청.body.title, 날짜:요청.body.date}}, function(에러, 결과){
    console.log("수정완료");

    // 업데이트 후 다른 페이지로 이동하는 코드
    응답.redirect('/list');
  });
});

// const passport = require('passport');