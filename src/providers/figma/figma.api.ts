import axios, { AxiosResponse } from 'axios';
import {
  FigmaAPIOptions,
  FigmaImageFile,
  FigmaImagesFileResponse
} from './figma.api.model';
import { FileByUrl, getFileByUrl } from '../../utils/files';

export class FigmaAPI {
  private host = 'https://api.figma.com';
  private options: FigmaAPIOptions;

  private apiKey: string;
  private fileUUID: string;

  private enabled: boolean = false;

  constructor(apiKey, FileUUID, options: FigmaAPIOptions) {
    this.apiKey = apiKey;
    this.fileUUID = FileUUID;
    this.options = options;

    // When file age less than 12 hours (obsolescence parameter) then enable class methods
    if (this.options.age < this.options.obsolescence) {
      console.log('Аile is too old');
      this.enabled = true;
    }

    if (this.options.age < this.options.frequency) {
      this.enabled = true;
    }
  }

  public async getFileImage (): Promise<FigmaImageFile[]> {
    if (!this.enabled) {
      return [];
    }

    const url = new URL(`/v1/images/${this.options.file}?format=png&ids=${this.options.nodes}`, this.host);

    return await axios.get(url.toString(), {
      headers: {
        'X-Figma-Token': this.apiKey
      } as any,
      responseType: 'json'
    }).then(async (response: AxiosResponse<FigmaImagesFileResponse>): Promise<FigmaImageFile[]> => {

      if (response?.data?.err) {
        return [];
      }

      if (!response?.data?.images || typeof response?.data?.images !== 'object') {
        return [];
      }

      const result: FigmaImageFile[] = [];

      for await (const key of Object.keys(response?.data?.images)) {
        const file: FileByUrl | null = await getFileByUrl(response?.data?.images['0:1'] || null);

        if (!file) {
          continue;
        }

        const node = key.replace(':', '-');

        result.push({
          node,
          fileUUID: this.options.file,
          timestamp: new Date().valueOf().toString(),
          name: [this.options.file, node, new Date().valueOf().toString()].join('/'),
          mimetype: file.mimetype,
          data: file.data,
          length: file.length
        })
      }

      return result;
    }).catch((error) => {
      console.log('Error wheb get file image from Figma API', error);
      return [];
    })
  }
}
