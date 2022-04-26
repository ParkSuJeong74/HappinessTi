import jwt from "jsonwebtoken";

export function login_required(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  if (userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const userId = jwtDecoded.userId;
    req.currentUserId = userId;
    next();
  } catch (error) {
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

/*이걸 middleware로 구현한게 옳은 방법인지 다시 생각해보세요.
여러가지 방식의 로그인을 지원 할 경우도 있고
또한 lookup value들과 같이 frontend에서 아직 로그인 전에도 api를 호출할 경우도 있을텐데 이리 강제 하는게 맞나 싶어요
물론 해도 상관은 없는데 그렇다 하더라도 middleware보다는 passport를 통하여 auth는 핸들하도록 바꾸시고
또 global filter에 추가하더라도 passport로 바꾼후 추가하는게 좋을듯 합니다.*/
