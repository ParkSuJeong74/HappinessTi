import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransport({
  //gmail stmp 서버 설정하기
  service: "gmail",
  host: "smtp.gmail.com",
  port: "587",
  secure: true,
  tls: {
    rejectUnauthorize: false,
  },

  //이메일 전송을 위해 필요한 인증정보
  //gmail 계정과 암호
  auth: {
    user: "",
    pass: "",
  },
});

export {smtpTransport};
