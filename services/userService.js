const userDao = require("../models/userDao");
const etc = require("../middleware/etc");

const signUp = async (nickname, email, password) => {
  //패스워드 예외처리
  if (!etc.validatePassword(password)) {
    const err = new Error("패스워드는 10자리 이상이어야 합니다.");
    err.status = 409;
    throw err;
  }
  //이메일 예외처리
  if (!etc.validateEmail(email)) {
    const err = new Error("이메일 형식이 올바르지 않습니다.");
    err.status = 409;
    throw err;
  }

  //중복 이메일 예외처리
  const checkEmail = await userDao.checkEmail(email);
  if (checkEmail) {
    const err = new Error("이미 사용 중인 이메일입니다.");
    err.status = 409;
    throw err;
  }

  const hashedPassword = await etc.makeHash(password, 10);

  const insertHash = await userDao.signUp(nickname, email, hashedPassword);

  const result = await etc.checkHash(password, hashedPassword);

  return insertHash;
};

const login = async (email) => {
  const users = await userDao.login(email);

  return users;
};
module.exports = {
  signUp,
  login,
};
