import dotenv from "dotenv";
import path from "path";
import { app } from "./src/app.js";
const __dirname = path.resolve();

dotenv.config({ path: path.join(__dirname, "path/to/.env") });
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.`);
});
