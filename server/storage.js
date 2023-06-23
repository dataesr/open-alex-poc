import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

import config from './config';

const CACHE_DURATION_DAYS = 7;

function shouldUseCache(lastModified) {
  if (!lastModified) return false;
  const now = new Date();
  const cacheValidAfter = new Date(now.getFullYear(), now.getMonth(), now.getDate() - CACHE_DURATION_DAYS);
  console.log(`Cache valid after ${cacheValidAfter}`);
  console.log(`Last modified ${lastModified}`);
  console.log(`Should use cache? ${lastModified > cacheValidAfter}`);
  return lastModified > cacheValidAfter;
}

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
  exists: async (key) => {
    const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
    return shouldUseCache(head?.LastModified);
  },
  get: async (key) => s3.send(new GetObjectCommand({ Bucket: bucket, Key: key })),
};