import { FigmaImageFile } from './providers/figma/figma.api.model';

require('dotenv').config();

export class Timelapse {

  private s3;
  private figma;

  constructor () {}

  async init() {
    this.s3 = await require(__dirname + '/providers/s3/s3').s3Provider();
    this.figma = await require(__dirname + '/providers/figma/figma.provider').figmaProvider();
  }

  async snapshot() {
    const file: FigmaImageFile | null = await this.figma.getFileImage(process.env.TIMELAPSE_FIGMA_FILE_UUID);

    if (!file) {
      console.error('File is unavailable. File may be older than 12 hours');
      return null;
    }

    return await this.s3.upload(file)
      .then((path: any) => {
        return `Snapshot stored by link: ${[path]}`
      })
      .catch((error) => {
        console.log('Error when upload file to S3', error);
        return Promise.resolve(null);
      })
  }

}
