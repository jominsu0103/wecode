const http = require("http");
const express = require("express");
const { DataSource } = require("typeorm");
const dotenv = require("dotenv");

const { signUp } = require("./services/userService");
const { insertPost } = require("./services/threadService");
const { totalSelect } = require("./services/threadService");
const { userSelect } = require("./services/threadService");
const { postUpdate } = require("./services/threadService");
const { deletePost } = require("./services/threadService");
const { insertLikes } = require("./services/threadService");

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
