const express = require("express");
const router = express.Router();

//localhost:3000/users/ ---
const userRouter = require("./userRouter");
router.use("/users", userRouter.router);

//localhost:3000/posts/ ---
const threadRouter = require("./threadRouter");
router.use("/posts", threadRouter.router);

//localhost:3000/comments/ ---
const threadCommentRouter = require("./threadCommentRouter");
router.use("/comments", threadCommentRouter.router);

module.exports = router;
