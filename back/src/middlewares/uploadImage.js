import { Storage } from "@google-cloud/storage";
import * as jimp from "jimp";
import { format } from "util";
import { Buffer } from "buffer";

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const THUMNAIL_IMG_SIZE = 200;

export const uploadImage = async (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      message: "업로드된 파일이 없습니다",
    });
    return;
  }

  //     // 이미지 리사이즈
  //     const jimpImg = await jimp.read(Buffer.from(req.file.buffer));
  //     if (jimpImg.bitmap.width > jimpImg.bitmap.height) {
  //         jimpImg.resize(jimp.AUTO, THUMNAIL_IMG_SIZE);
  //         jimpImg.crop(
  //             jimpImg.bitmap.width / 2 - THUMNAIL_IMG_SIZE / 2,
  //             0,
  //             THUMNAIL_IMG_SIZE,
  //             THUMNAIL_IMG_SIZE
  //         );
  //     } else {
  //         jimpImg.resize(THUMNAIL_IMG_SIZE, jimp.AUTO);
  //         jimpImg.crop(
  //             0,
  //             jimpImg.bitmap.height / 2 - THUMNAIL_IMG_SIZE / 2,
  //             THUMNAIL_IMG_SIZE,
  //             THUMNAIL_IMG_SIZE
  //         );
  //     }
  //     const resized = await jimpImg.getBufferAsync(req.file.mimetype);

  //     // 이미지 업로드 준비
  //     const blob = bucket.file(
  //         `${req.user.username}/${Date.now()}-${req.file.originalname}`
  //     );
  //     // 이미지 업로드 스트림 생성
  //     const blobStream = blob.createWriteStream();

  //     // 에러 핸들링
  //     blobStream.on("error", (err) => {
  //         console.log("?");
  //         res.status(500).json({
  //             message: "업로드 중 오류가 발생했습니다",
  //             error: JSON.parse(JSON.stringify(err)),
  //         });
  //     });

  //     // 종료 처리
  //     blobStream.on("finish", () => {
  //         const publicUrl = format(
  //             `https://storage.googleapis.com/${bucket.name}/${blob.name}`
  //         );
  //         req.gcpImgUrl = publicUrl;
  //         next();
  //     });

  //     // 업로드 스트림 실행
  //     blobStream.end(resized);
};
