const threadDao = require("../models/threadDao");

const insertThread = async (content, userId) => {
  const insertThread = await threadDao.insertThread(content, userId);

  return insertThread;
};

const totalSelect = async () => {
  const totalAllSelect = await threadDao.totalSelect();

  return totalAllSelect;
};

const oneSelect = async (threadId, userId) => {
  const userSelect = await threadDao.userSelect(threadId , userId);

  return userSelect;
};

const updateThread = async (content, threadId, userId) => {
  const updatePost = await threadDao.updateThread(content, threadId, userId);

  return updatePost;
};

const deleteThread = async (threadId, userId) => {
  const deletePost = await threadDao.deleteThread(threadId, userId);

  return deletePost;
};

const insertLikes = async (userId, threadId) => {
  const likes = await threadDao.likes(userId, threadId);

  return likes;
};

module.exports = {
  insertThread,
  totalSelect,
  oneSelect,
  updateThread,
  deleteThread,
  insertLikes,
};
