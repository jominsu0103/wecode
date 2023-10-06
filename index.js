const http = require("http");
const express = require("express");
const { sendProducts } = require("./sendProducts");
const { createUser } = require("./user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/ping", (req, res) => {
  res.json({ message: "/ pong" });
});

//app.post("/signup", createUser);
app.post("/signup", (req, res) => {
  res.json({ message: "signup success" });
});
app.post("/login", (req, res) => {
  res.json("login success");
});
app.get("/products", sendProducts);

const server = app.listen(8080, () => {
  console.log("서버가 열렸습니다.");
});

// server.close(() => {
//   console.log('서버가 닫혔습니다.');
// });
