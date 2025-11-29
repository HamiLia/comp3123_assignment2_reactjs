// backend/middleware/validate.js

// 예전에 express-validator 결과를 체크해서
// 에러가 있으면 400을 보내던 파일이었는데,
// 지금은 검증을 막지 않고 그냥 다음 미들웨어로 넘기도록 바꾼다.

exports.handleValidation = (req, res, next) => {
  // 디버그용으로 보고 싶다면 주석 풀어서 확인해도 됨
  // console.log("handleValidation called, body:", req.body);
  next();
};
