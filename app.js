const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(bodyParser.json());

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];
const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 2,
  },
];

//회원가입 코드
app.post("/signup", (req, res) => {
  const newUser = req.body;
  
  newUser.id = parseInt(newUser.id, 10);
  
  users.push(newUser);
  
  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
  
  console.log("현재유저 :", users);
});

//게시물 등록 코드
app.post("/posts", (req, res) => {
  const newPost = req.body;
  
  newPost.id = parseInt(newPost.id, 10);
  newPost.userId = parseInt(newPost.userId, 10);
  
  posts.push(newPost);
  
  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
  
  console.log("현재 게시글:", posts);
});

//http -v POST localhost:8000/posts id=3 title="아직 모르겠다" content="지금 배워가는중" userId=1 -j

//게시물 목록 조회코드
app.get("/", (req, res) => {
  const postList = posts.map((post) => {
    const user = users.find((user) => user.id === post.userId);
    return {
      userId: user.id,
      userName: user.name,
      postingId: post.id,
      postingTitle: post.title,
      postingContent: post.content,
    };
  });

  res.status(200).json({ data: postList });
});

//게시물 수정 코드
app.patch("/posts/:postingId", (req, res) => {
  const postingId = parseInt(req.params.postingId, 10);
  const updatedPost = req.body;

  const postToUpdate = posts.find((post) => post.id === postingId);

  if (!postToUpdate) {
    return res.status(404).json({ message: "Post not found" });
  }

  postToUpdate.title = updatedPost.title;
  postToUpdate.content = updatedPost.content;

  res.status(200).json({
    data: {
      userId: postToUpdate.userId,
      userName: postToUpdate.userName,
      postingId: postToUpdate.id,
      postingTitle: postToUpdate.title,
      postingContent: postToUpdate.content,
    },
  });

  console.log("현재 게시글 목록:", posts);
});

//게시물 삭제 코드
app.delete("/posts/:postingId", (req, res) => {
  const postingId = parseInt(req.params.postingId, 10);

  const indexToDelete = posts.findIndex((post) => post.id === postingId);

  if (indexToDelete === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(indexToDelete, 1);

  res.status(200).json({
    message: "Post deleted successfully",
    deletePostId: postingId,
  });

  console.log("현재 게시글 목록 : ", posts);
});

//유저와 게시물 조회코드
//2023-10-08 commit
app.get("/users/:userId/posts", (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const userPosts = posts.filter((post) => post.userId === userId);

  if (userPosts.length === 0) {
    return res.status(404).json({ message: "User has no posts" });
  }

  const userData = users.find((user) => user.id === userId);

  res.status(200).json({
    data: {
      userId: userData.id,
      userName: userData.name,
      postings: userPosts.map((post) => ({
        postingId: post.id,
        postingName: post.title,
        postingContent: post.content,
      })),
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
