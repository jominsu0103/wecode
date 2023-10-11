const http = require("http");
const express = require("express");
const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: "3306",
  username: "root",
  password: "",
  database: "wethread_50",
});

const app = express();
app.use(express.json());

//Health check function
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

//http 용어는 front 입장에서 만들어졌기 때문에 get은 front가 back에게 가져오는거 post는 front가 back에게 보내는것

// 1.회원가입 하는 함수 생성
const signUp = async (req, res) => {
  //1-1 request body로부터 사용자 정보 받아오기
  const requestBody = req.body;

  const userName = requestBody.name;
  const userEmail = requestBody.email;
  const userPassword = requestBody.password;

  console.log("req userName: " + userName);
  console.log("req userName: " + userEmail);
  console.log("req userName: " + userPassword);
  //1-2 받아온 정보를 DB에 저장함
  //1-2-1 typeorm 설치 후 , appData
  //1-2-2 SQL

  const userData = await appDataSource.query(`
  insert into users (name, email, password) 
  values ('${userName}', '${userEmail}', '${userPassword}')`);

  //1-3 저장이 되었는지 확인하기

  console.log("typeorm return userData" + userData);
  //1-4 front에게 저장이 잘 되었다고 res 보내기

  return res.status(201).json({ message: "SignUp successful" });
};

//2.Express app에 회원가입 하는 함수 연결
//2-1. HTTP method와 HTTP url 같이 설정하여 연결

app.post("/users/signUp", signUp);

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(3050, () => console.log("Server is listening"));

    
  } catch (err) {
    console.log(err);
  }
};
