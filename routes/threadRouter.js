const express = require("express");
const threadController = require("../controller/threadController");
const router = express.Router();


//게시글 등록 
router.post("/insertThread", threadController.insertThread);

//게시글 조회
router.get("/selectThread", threadController.selectThread);

//유저 게시글 조회
router.get("/threadUserSelect", threadController.selectOneThread);

//유저 게시글 수정
router.put("/threadUpdate", threadController.threadUpdate);

//유저 게시글 삭제하기
router.delete("/threadDelete", threadController.threadDelete);

// 좋아요 누르기
router.post("/threadLike", threadController.insertLikes);

module.exports = {
    router
}