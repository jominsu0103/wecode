const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;

//token 만들기
const generateToken = (email, userId) => {
  return jwt.sign({ email, userId }, secretKey);
};

//디코딩 token
const decoded = (token, secretKey) => {
  const result = jwt.verify(token, secretKey);
  return result;
};

//hash 만들기
const makeHash = async (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

//hash 검증
const checkHash = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//이메일 형식 정규식
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
//패스워드 정규식
const validatePassword = (password) => {
  const passwordRegex = /^.{10,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  generateToken,
  makeHash,
  checkHash,
  decoded,
  validateEmail,
  validatePassword,
};
