const userService = require("../services/userService");
const etc = require("../middleware/etc");

const signUp = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    if (!nickname || !email || !password) {
      return res
        .status(400)
        .json({ message: "필수 항목을 꼭 기입해야 합니다." });
    }
    const result = await userService.signUp(nickname, email, password);
    return res.status(200).json({ message: "sign-up successfully" , result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "이메일 주소와 패스워드를 확인해 주세요." });
    }
    // 이메일 체크
    const userCheck = await userService.login(email);
    if (!userCheck) {
      throw new Error(401, "not found email");
    }
    //비밀번호 체크
    const passwordCheck = userCheck[0].password;
    const result = await etc.checkHash(password, passwordCheck);
    //결과가 나오면 토큰 생성
    if (result) {
      const userId = userCheck[0].id;
      const userNickname = userCheck[0].nickname;
      const jwtToken = etc.generateToken(email , userId);
      if (!jwtToken) {
        throw new Error(401, "token generation failed");
      }
      return res.status(200).json({
        message: "login success",
        token: `${jwtToken}`,
        id: userId,
        nickname: userNickname,
      });
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  login,
};
