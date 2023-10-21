const threadCommentDao = require("../models/threadCommentDao");

const insertComment = async (userId, content, threadId) => {
  const insertComment = await threadCommentDao.insertComment(
    userId,
    content,
    threadId
  );

  return insertComment;
};

const selectComment = async (threadId) => {
  const selectComment = await threadCommentDao.selectComment(threadId);

  return selectComment;
};

const updateComment = async (content, threadCommentId, userId) => {
  const updateComment = await threadCommentDao.updateComment(
    content,
    threadCommentId,
    userId
  );

  return updateComment;
};

const deleteComment = async (threadCommentId, userId) => {
  const deleteComment = await threadCommentDao.deleteComment(
    threadCommentId,
    userId
  );
  return deleteComment;
};
module.exports = {
  insertComment,
  selectComment,
  updateComment,
  deleteComment
};
