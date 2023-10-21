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
    console.log("Thread Data Source has been initialized");
  });
} catch (err) {
  console.log(err);
}

const insertThread = async (content, userId) => {
  try {
    const result = await appDataSource.query(
      `insert into threads (content , user_id) values (?,?);`,
      [content, userId]
    );
    return result;
  } catch (error) {
    const err = new Error("Data input error");
    err.statusCode = 500;
    throw err;
  }
};

const totalSelect = async () => {
  try {
    const result = await appDataSource.query(`
    select threads.* ,users.nickname as name, users.profile_image from threads join users on threads.user_id = users.id order by threads.created_at desc
    `);
    return result || [];
    //데이터 없을 경우 빈 배열 반환
  } catch (error) {
    const err = new Error("Data read error");
    err.statusCode = 500;
    throw err;
  }
};

const userSelect = async (threadId, userId) => {
  try {
    // 쓰레드가 존재하는지 확인
    const checkThreadAlive = await appDataSource.query(
      `select id from threads where id = ?`,
      [threadId]
    );

    if (!checkThreadAlive) {
      const err = new Error("쓰레드가 존재하지 않습니다.");
      err.statusCode = 404;
      throw err;
    }

    const result = await appDataSource.query(
      `
      select t.content , u.nickname as name , t.created_at as createDate ,t.updated_at as updateDate  ,u.profile_image as profileImage
      from users u
      join threads t on u.id = t.user_id
      where t.id = ? and u.id = ?;      
    `,
      [threadId, userId]
    );
    return result;
  } catch (error) {
    const err = new Error("Data read error");
    err.statusCode = 500;
    throw err;
  }
};

const updateThread = async (content, threadId, userId) => {
  try {
    //본인이 작성한 쓰레드인지 확인
    const checkMyThread = await appDataSource.query(
      `
    select user_id from threads where id = ?
    `,
      [threadId]
    );

    if (!checkMyThread || checkMyThread[0].user_id !== userId) {
      const err = new Error("권한이 없습니다.");
      err.statusCode = 403;
      throw err;
    }

    // 쓰레드가 존재하는지 확인
    const checkThreadAlive = await appDataSource.query(
      `select id from threads where id = ?`,
      [threadId]
    );

    if (!checkThreadAlive) {
      const err = new Error("쓰레드가 존재하지 않습니다.");
      err.statusCode = 404;
      throw err;
    }

    const result = await appDataSource.query(
      `
    update threads set content = ? where id = ? and user_id = ?`,
      [content, threadId, userId]
    );
    return result;
  } catch (error) {
    const err = new Error("Data update error");
    err.statusCode = 500;
    throw err;
  }
};

const deleteThread = async (threadId, userId) => {
  try {
    // 본인이 작성한 쓰레드인지 확인
    const checkMyThread = await appDataSource.query(
      `select user_id from threads where id = ?`,
      [threadId]
    );

    if (!checkMyThread || checkMyThread[0].user_id !== userId) {
      const err = new Error("권한이 없습니다.");
      err.statusCode = 403;
      throw err;
    }

    // 쓰레드가 존재하는지 확인
    const checkThreadAlive = await appDataSource.query(
      `select id from threads where id = ?`,
      [threadId]
    );

    if (!checkThreadAlive) {
      const err = new Error("쓰레드가 존재하지 않습니다.");
      err.statusCode = 404;
      throw err;
    }
    const result = await appDataSource.query(
      `
    delete from threads where id = ? and user_id = ?
    `,
      [threadId, userId]
    );
    return result;
  } catch (error) {
    const err = new Error("Data delete error");
    err.statusCode = 500;
    throw err;
  }
};

const likes = async (userId, threadId) => {
  try {
    // 쓰레드가 존재하는지 확인
    const checkThreadAlive = await appDataSource.query(
      `select id from threads where id = ?`,
      [threadId]
    );

    if (!checkThreadAlive) {
      const err = new Error("쓰레드가 존재하지 않습니다.");
      err.statusCode = 404;
      throw err;
    }
    const result = await appDataSource.query(
      `
    insert into threads_likes (user_id, thread_id) values (?, ?)
    `,
      [userId, threadId]
    );
    return result;
  } catch (error) {
    const err = new Error("Data insert error");
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  insertThread,
  totalSelect,
  userSelect,
  updateThread,
  deleteThread,
  likes,
  // threadId,
};
