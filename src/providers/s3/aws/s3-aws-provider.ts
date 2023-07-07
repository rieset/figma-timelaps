import { AwsS3API } from './s3.aws.api';

export const s3ProviderInit = async (): Promise<any> => {
  const AWS = require('aws-sdk');

  if (!process.env.TIMELAPSE_S3_ACCESS_KEY_ID) {
    throw new Error('TIMELAPSE_S3_ACCESS_KEY_ID is not defined in .env file');
  }

  if (!process.env.TIMELAPSE_S3_SECRET_ACCESS_KEY) {
    throw new Error('TIMELAPSE_S3_SECRET_ACCESS_KEY is not defined in .env file');
  }

  if (!process.env.TIMELAPSE_S3_REGION) {
    throw new Error('TIMELAPSE_S3_REGION is not defined in .env file');
  }

  if (!process.env.TIMELAPSE_S3_BUCKET_NAME) {
    throw new Error('TIMELAPSE_S3_BUCKET_NAME is not defined in .env file');
  }

  if (!process.env.TIMELAPSE_S3_PATH) {
    throw new Error('TIMELAPSE_S3_PATH is not defined in .env file');
  }

  // Конфигурируем AWS SDK
  AWS.config.update({
    accessKeyId: process.env.TIMELAPSE_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.TIMELAPSE_S3_SECRET_ACCESS_KEY
  });

  const s3  = new AWS.S3();

  // Execute test request to S3
  s3.listBuckets((err, data) => {
    if (err) {
      console.error('\nError when try to connect to S3\n', err);
    } else {
      console.log(`\nConnected to S3. Available ${data.Buckets.length} buckets\n`);

      if (!data.Buckets.find((bucket) => bucket.Name === process.env.TIMELAPSE_S3_BUCKET_NAME)) {
        console.log('Available buckets:\n\t', data.Buckets.map((bucket) => {
          return `- ${bucket.Name}`;
        }).join('\n\t'));

        throw new Error(`Bucket ${process.env.TIMELAPSE_S3_BUCKET_NAME} not found`);
      }
    }
  });

  // Создаем новый экземпляр S3
  return new AwsS3API(s3);
}
