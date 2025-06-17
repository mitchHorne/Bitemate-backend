import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

import { StringSchema } from "../types";

const { AWS_ACCESS_KEY, AWS_SECRET, AWS_BUCKET_NAME, AWS_BUCKET_REGION } =
  process.env;

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
    Body: fs.createReadStream(image.filepath),
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
