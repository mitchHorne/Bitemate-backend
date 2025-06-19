import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

import { StringSchema } from "../types";

const { AWS_ACCESS_KEY, AWS_SECRET, AWS_BUCKET_NAME, AWS_BUCKET_REGION } =
  process.env;

const compressImage = async (image: object, type: string) => {
  if (type === "jpeg") {
    return await sharp(image)
      .resize({ width: 800 })
      .jpeg({ mozjpeg: true })
      .toBuffer();
  } else {
    return await sharp(image).resize({ width: 800 }).png().toBuffer();
  }
};

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

  const type = image.mimetype.split("/")[1];
  const compressedImage = await compressImage(image.filepath, type);

  const s3Client = new S3Client({
    region: region,
    credentials: { accessKeyId: accessKey, secretAccessKey: secret },
  });

  const params = {
    Body: compressedImage,
    Bucket: AWS_BUCKET_NAME,
    Key: name,
  };

  const command = new PutObjectCommand(params);
  const response = await s3Client.send(command);

  if (response.$metadata.httpStatusCode !== 200) {
    throw new Error("Failed to upload image to S3");
  }

  const url = `https://bitemate-files.s3.eu-north-1.amazonaws.com/${name}`;

  return { url };
};
