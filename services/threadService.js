const insertPost = async (req, res) => {
  const postContent = req.body.content;
  const postUserId = req.body.user_id;

  console.log(postContent);
  console.log(postUserId);

  const postData = await appDataSource.query(`
  insert into threads (content , user_id) values ('${postContent}' , '${postUserId}')`);

  console.log("typeorm return postData" + postData);

  return res.status(201).json({ message: "post created" });
};

//2023-10-13 sql update
const totalSelect = async (req, res) => {
  const selectData = await appDataSource.query(`
  select threads.* ,users.nickname as name from threads join users on threads.user_id = users.id`);

  console.log("typeorm return selectData" + selectData);

  return res.status(200).json({
    message: "post read",
    data: selectData,
  });
};

const userSelect = async (req, res) => {
  const userId = req.body.user_id;

  const selectData = await appDataSource.query(
    `select t.content from users u join threads t on u.id = t.user_id where u.id = '${userId}'`
  );

  console.log("typeorm return selectData" + selectData);

  return res.status(200).json({
    message: "user post read",
    data: selectData,
  });
};

const postUpdate = async (req, res) => {
  const userId = req.body.user_id;
  const updateData = req.body.content;
  const threadId = req.body.thread_id;

  const updateElement = await appDataSource.query(
    `update threads set content = '${updateData}' where user_id = '${userId}' and thread_id = '${threadId}'`
  );
  const selectElement = await appDataSource.query(`select * from threads`);

  console.log(updateElement);

  return res.status(200).json({
    message: "posting update successfully",
    data: selectElement,
  });
};

const deletePost = async (req, res) => {
  const userId = req.body.user_id;

  const delectElement = await appDataSource.query(
    `delete from threads where user_id = '${userId}'`
  );

  console.log(delectElement);

  return res.status(200).json({ message: "delete post successfully" });
};

const insertLikes = async (req, res) => {
  const userId = req.body.user_id;
  const threadId = req.body.thread_id;

  const heart = await appDataSource.query(
    `insert into thread_likes (user_id, thread_id)
    values ('${userId}' , '${threadId}')`
  );

  console.log(heart);

  return res.status(200).json({ message: "insert heart successfully" });
};

module.exports = {
  insertPost,
  totalSelect,
  userSelect,
  postUpdate,
  deletePost,
  insertLikes
}