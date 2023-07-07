import { getDiffTime } from '../../utils/time';
import { FigmaAPI } from './figma.api';
import axios from 'axios';
import { FigmaProviderOptions } from './figma.provider.model';

export const figmaProvider = async (options: FigmaProviderOptions): Promise<any> => {

  const host = 'https://api.figma.com';

  if (!process.env.TIMELAPSE_FIGMA_API_KEY) {
    throw new Error('FIGMA_API_KEY not defined in .env file');
  }

  if (!process.env.TIMELAPSE_FIGMA_FILE_UUID) {
    throw new Error('FIGMA_FILE_UUID not defined in .env file');
  }

  const initFigmaFile = async () => {
    const url  = new URL(`/v1/files/${process.env.TIMELAPSE_FIGMA_FILE_UUID}`, host);

    return axios.get(url.toString(), {
      headers: {
        'X-Figma-Token': process.env.TIMELAPSE_FIGMA_API_KEY
      } as any
    })
      .then(response => {
        const diff = getDiffTime(new Date(response.data.lastModified), new Date());
        const seconds: number | null = getDiffTime(new Date(response.data.lastModified), new Date(), 'seconds').seconds || 0;

        console.log(`Connect to Figma File is success. Last modified: ${diff.days} days ${diff.hours} hours ${Math.round(diff.minutes || 0)} minutes ago`);

        return new FigmaAPI(process.env.TIMELAPSE_FIGMA_API_KEY, process.env.TIMELAPSE_FIGMA_FILE_UUID, {
          age: seconds,
          ...options
        });
      })
      .catch(error => {
        console.error(error);
        throw new Error('Connect to Figma API error')
      });
  }

  return await initFigmaFile();
}
