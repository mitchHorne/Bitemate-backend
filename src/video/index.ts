import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { StringSchema } from "../types";

const { AWS_ACCESS_KEY, AWS_SECRET, AWS_BUCKET_NAME, AWS_BUCKET_REGION } =
  process.env;

export const createPresignedUrl = async (
  filename: string,
  contentType: string = "video/mp4",
) => {
  const { success: regionSuccess, data: region } =
    StringSchema.safeParse(AWS_BUCKET_REGION);
  const { success: accessKeySuccess, data: accessKey } =
    StringSchema.safeParse(AWS_ACCESS_KEY);
  const { success: secretSuccess, data: secret } =
    StringSchema.safeParse(AWS_SECRET);

  if (!regionSuccess || !accessKeySuccess || !secretSuccess)
    throw new Error("Invalid AWS credentials or region");

  const s3Client = new S3Client({
    region: region,
    credentials: { accessKeyId: accessKey, secretAccessKey: secret },
  });

  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  return signedUrl;
};
