import { Storage } from "@google-cloud/storage";

const gc = new Storage({
  keyFilename: `src/secure/${process.env.GCS_KEYFILE}`,
  projectId: process.env.GCLOUD_PROJECT_ID,
});

export const gcsBucket = gc.bucket(process.env.GCLOUD_STORAGE_BUCKET);
