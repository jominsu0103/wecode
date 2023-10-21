const threadService = require("../services/threadService");
const etc = require("../middleware/etc");
const secretKey = process.env.SECRET_KEY;

const insertThread = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const content = req.body.content;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    //토큰 보유 여부 확인 예외처리
    if (!acccesToken) {
      const err = new Error("로그인이 필요합니다.");
      err.statusCode = 401;
      throw err;
    }

    // 내용 길이 확인 예외처리
    if (content.length < 1) {
      const err = new Error("내용이 한 글자 이상이어야 합니다.");
      err.statusCode = 400;
      throw err;
    }

    const result = await threadService.insertThread(content, userId);
    return res.status(200).json({ message: "thread 등록성공!", result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const selectThread = async (req, res) => {
  try {
    const result = await threadService.totalSelect();
    if (!result) {
      return res.status(200).json({});
    } else {
      return res.status(200).json({ message: result });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const selectOneThread = async (req, res) => {
  try {
    const userId = req.body.userId;
    const threadId = req.body.threadId;

    if (!userId || !threadId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await threadService.oneSelect(threadId, userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const threadUpdate = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const content = req.body.content;
    const threadId = req.body.threadId;

    if (!content || !threadId || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await threadService.updateThread(content, threadId, userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const threadDelete = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const threadId = req.body.threadId;

    if (!threadId || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await threadService.deleteThread(threadId, userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const insertLikes = async (req, res) => {
  try {
    const threadId = req.body.threadId;

    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    //토큰 보유 여부 확인 예외처리
    if (!acccesToken) {
      const err = new Error("로그인이 필요합니다.");
      err.statusCode = 401;
      throw err;
    }

    if (!userId || !threadId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await threadService.insertLikes(userId, threadId);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  insertThread,
  selectThread,
  selectOneThread,
  threadUpdate,
  threadDelete,
  insertLikes,
};
