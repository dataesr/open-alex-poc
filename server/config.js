export default {
  s3: {
    endpoint: process.env.S3_ENDPOINT || 'http://minio:9000',
    bucket: process.env.S3_BUCKET || 'open-alex-poccache',
    region: process.env.S3_REGION || 'gra',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || 'administrator',
      secretAccessKey: process.env.S3_SECRET_KEY || 'root',
    },
    signatureVersion: 'v4',
  },
};