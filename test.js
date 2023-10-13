const appDataSource = require('./db')
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const express = require("express");

const { signUp } = require("./services/userService");
const {
  insertPost,
  totalSelect,
  userSelect,
  postUpdate,
  deletePost,
  insertLikes,
} = require("./services/threadService");


const app = express();


app.use(express.json());

// Health check function
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

// Routes
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
