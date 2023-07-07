import { FigmaImageFile } from './providers/figma/figma.api.model';
import { TimelapseOptions } from './timelapse.model';

require('dotenv').config();

export class Timelapse {

  private s3;
  private figma;

  private options;

  constructor (options: TimelapseOptions) {
    this.options = options;
  }

  async init() {
    this.s3 = await require(__dirname + '/providers/s3/s3').s3Provider();
    this.figma = await require(__dirname + '/providers/figma/figma.provider').figmaProvider(this.options);
  }

  async snapshot() {
    const files: FigmaImageFile[] = await this.figma.getFileImage();

    if (files.length === 0) {
      console.error('File is unavailable. File may be older than need');
      return null;
    }

    const report: string[] = [];

    for await (const file of files) {
      await this.s3.upload(file)
        .then((path: string) => {
          report.push( `Snapshot stored by link: ${path}`)
        })
        .catch((error) => {
          // console.log(error);
          report.push( `Error when upload file from node ${file?.node} to S3. ${error?.message}`)
        })
    }

    return report.join('\n');
  }
}
