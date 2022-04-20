const cors = require("cors")
const express = require("express")
const { userAuthRouter } = require("./routers/userRouter")
const { errorMiddleware } = require("./middlewares/errorMiddleware")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 기본
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.")
})

// router | userAuthRouter는 맨 위
app.use("/users", userAuthRouter)

app.use(errorMiddleware)

module.exports = { app }
