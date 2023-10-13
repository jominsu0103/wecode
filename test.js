const http = require("http");
const express = require("express");
const { DataSource } = require("typeorm");
const dotenv = require("dotenv");

dotenv.config();

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
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

  const userNickName = req.body.nickname;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  console.log("req userName: " + userNickName);
  console.log("req userName: " + userEmail);
  console.log("req userName: " + userPassword);
  //1-2 받아온 정보를 DB에 저장함
  //1-2-1 typeorm 설치 후 , appData
  //1-2-2 SQL

  const userData = await appDataSource.query(`
  insert into users (nickname, email, password) 
  values ('${userNickName}', '${userEmail}', '${userPassword}')`);

  //1-3 저장이 되었는지 확인하기

  console.log("typeorm return userData" + userData);
  //1-4 front에게 저장이 잘 되었다고 res 보내기

  return res.status(201).json({ message: "SignUp successful" });
};

const insertPost = async (req, res) => {
  const postContent = req.body.content;
  const postUserId = req.body.user_id;

  console.log(postContent);
  console.log(postUserId);

  const postData = await appDataSource.query(`
  insert into threads (content , user_id) values ('${postContent}' , '${postUserId}')`);

  console.log("typeorm return postData" + postData);

  return res.status(201).json({ message: "post created" });
};

const totalSelect = async (req, res) => {
  const selectData = await appDataSource.query(`
  select * from threads`);

  console.log("typeorm return selectData" + selectData);

  return res.status(200).json({
    message: "post read",
    data: selectData,
  });
};

const userSelect = async (req, res) => {
  const userId = req.body.user_id;

  const selectData = await appDataSource.query(
    `select t.content from users u join threads t on u.id = t.user_id where u.id = '${userId}'`
  );

  console.log("typeorm return selectData" + selectData);

  return res.status(200).json({
    message: "user post read",
    data: selectData,
  });
};

const postUpdate = async (req, res) => {
  const userId = req.body.user_id;
  const updateData = req.body.content;
  const threadId = req.body.thread_id;

  const updateElement = await appDataSource.query(
    `update threads set content = '${updateData}' where user_id = '${userId}' and thread_id = '${threadId}'`
  );
  const selectElement = await appDataSource.query(`select * from threads`);

  console.log(updateElement);

  return res.status(200).json({
    message: "posting update successfully",
    data: selectElement,
  });
};

const deletePost = async (req, res) => {
  const userId = req.body.user_id;

  const delectElement = await appDataSource.query(
    `delete from threads where user_id = '${userId}'`
  );

  console.log(delectElement);

  return res.status(200).json({ message: "delete post successfully" });
};

const insertLikes = async (req, res) => {
  const userId = req.body.user_id;
  const threadId = req.body.thread_id;

  const heart = await appDataSource.query(
    `insert into thread_likes (user_id, thread_id)
    values ('${userId}' , '${threadId}')`
  );

  console.log(heart);

  return res.status(200).json({ message: "insert heart successfully" });
};

//2.Express app에 회원가입 하는 함수 연결
//2-1. HTTP method와 HTTP url 같이 설정하여 연결

app.post("/users/signUp", signUp);
app.post("/posts/posting", insertPost);
app.get("/posts/read", totalSelect);
app.get("/users/posts/read", userSelect);
app.patch("/posts/posting/update", postUpdate);
app.delete("/posts/posting/delete", deletePost);
app.post("/posts/posting/heart", insertLikes);

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(8000, () => console.log("Server is listening on 8000"));

    appDataSource.initialize().then(() => {
      console.log("Data Source has been initialized");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
