import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import { url } from "koa-router";

const { AWS_ACCESS_KEY, AWS_SECRET, AWS_BUCKET_NAME, AWS_BUCKET_REGION } =
  process.env;

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET,
  region: AWS_BUCKET_REGION,
});

export const uploadImage = async (name: string, image: any) => {
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: name,
    Body: fs.createReadStream(image.filepath),
  };

  const res = await s3.upload(uploadParams).promise();

  return { id: res.Key, url: res.Location };
};
