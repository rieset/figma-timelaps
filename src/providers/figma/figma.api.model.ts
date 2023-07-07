export interface FigmaImageFile {
  name: string;
  data: Buffer;
  mimetype: string;
}

export interface FigmaImagesFileResponse {
  err: string | null;
  images: {
    [key: string]: string;
  }
}
