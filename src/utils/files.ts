import axios from 'axios';

export interface FileByUrl {
  length: number;
  data: Buffer;
  mimetype: string;
}

export const getFileByUrl = async (url: string | null): Promise<FileByUrl | null> => {
  try {
    if (!url) {
      return null;
    }

    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });

    if (response.status === 200) {
      // const buffer = Buffer.from(response.data);
      // console.log('File loaded to buffer');
      return {
        length: response.data.length,
        mimetype: response.headers['content-type'],
        data: response.data
      };
    } else {
      console.error('Error when load file to buffer', response.status);
      return Promise.resolve(null);
    }
  } catch (error) {
    console.error('Catched error when load file to buffer', error);
    return Promise.resolve(null);
  }
}
