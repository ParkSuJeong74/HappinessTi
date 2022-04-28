export function errorMiddleware(error, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", error);
  res.status(error.status || 400).send(error.message);
}

//permission 문제일경우는 401
//예상치 못한 서버 에러는 500으로 띄워줘야 수월할듯 한데요
//400은 보통 에러 발생 원인을 아는경우 나에게 나쁜 request를 해서 난 결과값을 못준다 란 의미로 사용하도록 하세요
