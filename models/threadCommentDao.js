const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});
try {
  appDataSource.initialize().then(() => {
    console.log("Data Source has been initialized");
  });
} catch (error) {
  console.log(error);
}

const insertComment = async (userId, content, threadId) => {
  try {
    //쓰레드가 존재하는지 확인
    const checkThreadAlive = await appDataSource.query(
      `
    select id from threads where id = ?
    `,
      [threadId]
    );

    if (!checkThreadAlive) {
      const err = new Error("쓰레드가 존재하지 않습니다.");
      err.statusCode = 404;
      throw err;
    }

    const result = await appDataSource.query(
      `
    insert into thread_comments (user_id, content, thread_id) values(?,?,?);
    `,
      [userId, content, threadId]
    );
    return result;
  } catch (error) {
    const err = new Error("Data input error");
    err.statusCode = 500;
    throw err;
  }
};

const selectComment = async (threadId) => {
  try {
    const result = await appDataSource.query(
      `
    select tc.*, u.nickname as name, u.profile_image
    from thread_comments tc
    join users u on tc.user_id = u.id
    where tc.thread_id = ?;
    `,
      [threadId]
    );
    return result;
  } catch (error) {
    const err = new Error("Data read error");
    err.statusCode = 500;
    throw err;
  }
};

const updateComment = async (content, threadCommentId, userId) => {
  try {
    return await appDataSource.query(
      `
  update thread_comments set content = ? where id = ? and user_id = ?
  `,
      [content, threadCommentId, userId]
    );
  } catch (error) {
    const err = new Error("Data update error");
    err.statusCode = 500;
    throw err;
  }
};

const deleteComment = async (threadCommentId, userId) => {
  try {
    return await appDataSource.query(
      `
    delete from thread_comments where id = ? and user_id = ?
    `,
      [threadCommentId, userId]
    );
  } catch (error) {
    const err = new Error("Data delete error");
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  insertComment,
  selectComment,
  updateComment,
  deleteComment,
};
