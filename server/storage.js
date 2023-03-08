import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import config from './config';

const { bucket, ...configS3 } = config.s3;
export const s3 = new S3Client(configS3);

export default {
  set: async (key, buffer) => s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: 'application/json',
    ACL: 'public-read'
  })),
};