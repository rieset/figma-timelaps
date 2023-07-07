import axios, { AxiosResponse } from 'axios';
import { FigmaImageFile, FigmaImagesFileResponse } from './figma.api.model';
import { getFileByUrl } from '../../utils/files';

export class FigmaAPI {
  private host = 'https://api.figma.com';
  private fileAge: number

  private apiKey: string;
  private fileUUID: string;

  private enabled: boolean = false;

  constructor(apiKey, FileUUID, age: number) {
    this.apiKey = apiKey;
    this.fileUUID = FileUUID;
    this.fileAge = age;

    // When file age less than 12 hours (43200 seconds) then enable class methods
    if (this.fileAge < 43200) {
      this.enabled = true;
    }
  }

  public async getFileImage (fileUUID: string): Promise<FigmaImageFile | null> {
    if (!this.enabled) {
      return null;
    }

    const url = new URL(`/v1/images/${fileUUID}?format=png&ids=0-1`, this.host);

    return await axios.get(url.toString(), {
      headers: {
        'X-Figma-Token': this.apiKey
      } as any,
      responseType: 'json'
    }).then(async (response: AxiosResponse<FigmaImagesFileResponse>): Promise<FigmaImageFile | null> => {

      if (response?.data?.err) {
        return null;
      }

      if (!response?.data?.images || !response?.data?.images['0:1']) {
        return null;
      }

      const file = await getFileByUrl(response?.data?.images['0:1'] || null);

      if (!file) {
        return null;
      }

      return {
        name: new Date().valueOf().toString() + '-' + fileUUID,
        mimetype: response?.headers['content-type'],
        data: file
      }
    }).catch((error) => {
      console.log('Error wheb get file image from Figma API', error);
      return Promise.resolve(null);
    })
  }
}
