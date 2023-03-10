import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

import config from './config';

const { bucket, ...configS3 } = config.s3;
export const s3 = new S3Client(configS3);

export default {
  set: async (key, buffer) => s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: 'application/json',
    ACL: 'public-read',
  })),
  exists: async (key) => s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key })),
  get: async (key) => s3.send(new GetObjectCommand({ Bucket: bucket, Key: key })),
};
