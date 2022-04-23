const cors = require("cors")
const express = require("express")
const { userAuthRouter } = require("./routers/userRouter")
const { errorMiddleware } = require("./middlewares/errorMiddleware")
// const multer = require("multer")
// const MulterGoogleCloudStorage = require("multer-google-storage")

// const uploadHandler = multer({
//   storage: multerGoogleStorage.storageEngine(),
// })

const { swaggerUi, specs } = require("./config/swaggerDoc")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
)
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  `${process.cwd()}/src/` + process.env.GCS_KEYFILE

console.log(
  "google authentication installed at",
  process.env["GOOGLE_APPLICATION_CREDENTIALS"]
)

// 기본
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.")
})

// app.post("/upload", uploadHandler.any(), (req, res) => {
//   console.log(req.files)
//   res.json(req.files)
// })

// router | userAuthRouter는 맨 위
app.use("/users", userAuthRouter)

app.use(errorMiddleware)

module.exports = { app }
