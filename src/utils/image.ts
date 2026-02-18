import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import { StringSchema } from "../types";

const { AWS_ACCESS_KEY, AWS_SECRET, AWS_BUCKET_NAME, AWS_BUCKET_REGION } =
  process.env;

export async function storeImage(image: any, userId: string) {
  const compressedImage = await sharp(image)
    .resize({ width: 800 })
    .webp({ quality: 80 })
    .toBuffer();
  const name = `images/${userId}/${uuidv4()}.webp`;

  await uploadImage(name, compressedImage);

  console.log("Image stored with name:", name);
  return name;
}

export const uploadImage = async (name: string, image: any) => {
  const { success: regionSuccess, data: region } =
    StringSchema.safeParse(AWS_BUCKET_REGION);
  const { success: accessKeySuccess, data: accessKey } =
    StringSchema.safeParse(AWS_ACCESS_KEY);
  const { success: secretSuccess, data: secret } =
    StringSchema.safeParse(AWS_SECRET);

  if (!regionSuccess || !accessKeySuccess || !secretSuccess) {
    throw new Error("Invalid AWS credentials or region");
  }

  const s3Client = new S3Client({
    region: region,
    credentials: { accessKeyId: accessKey, secretAccessKey: secret },
  });

  const params = {
    Body: image,
    Bucket: AWS_BUCKET_NAME,
    Key: name,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
};
