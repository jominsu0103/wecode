const appDataSource = require('../db')

// 1.회원가입 하는 함수 생성
const signUp = async (req, res) => {
  //1-1 request body로부터 사용자 정보 받아오기

  const userNickName = req.body.nickname;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  console.log("req userName: " + userNickName);
  console.log("req userName: " + userEmail);
  console.log("req userName: " + userPassword);
  //1-2 받아온 정보를 DB에 저장함
  //1-2-1 typeorm 설치 후 , appData
  //1-2-2 SQL

  const userData = await appDataSource.query(`
  insert into users (nickname, email, password) 
  values ('${userNickName}', '${userEmail}', '${userPassword}')`);

  //1-3 저장이 되었는지 확인하기

  console.log("typeorm return userData" + userData);
  //1-4 front에게 저장이 잘 되었다고 res 보내기

  return res.status(201).json({ message: "SignUp successful" });
};

//2.Express app에 회원가입 하는 함수 연결
//2-1. HTTP method와 HTTP url 같이 설정하여 연결

module.exports = {
  signUp,
};
