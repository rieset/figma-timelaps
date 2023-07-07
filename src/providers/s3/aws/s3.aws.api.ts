import { FigmaImageFile } from '../../figma/figma.api.model';

export class AwsS3API {

  private s3;

  constructor(s3) {
    this.s3 = s3;
  }

  public async upload(file: FigmaImageFile): Promise<string> {
    const awsS3UploadParams = {
      Bucket: process.env.TIMELAPSE_S3_BUCKET_NAME,
      Key: [process.env.TIMELAPSE_S3_PATH, file.name].join('/'),
      Body: file.data
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(awsS3UploadParams, (error, data) => {
        if (error) {
          reject(error)
        } else {
          console.log('Fiel storted, ', data);
          resolve(data.Location);
        }
      })
    })
  }

}
