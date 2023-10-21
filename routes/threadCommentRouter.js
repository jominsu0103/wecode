const express = require("express");
const threadCommentController = require("../controller/threadCommentController");
const router = express.Router();

//댓글 등록
router.post("/insertComment/:threadId" , threadCommentController.insertComment);

//댓글 조회
router.get("/selectComment/:threadId" , threadCommentController.selectComment);

//댓글 수정
router.put("/updateComment", threadCommentController.updateComment);

//댓글 삭제
router.delete("/deleteComment" , threadCommentController.deleteComment);

module.exports = {
  router
}