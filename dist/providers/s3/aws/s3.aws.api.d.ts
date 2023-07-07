import { FigmaImageFile } from '../../figma/figma.api.model';
export declare class AwsS3API {
    private s3;
    constructor(s3: any);
    upload(file: FigmaImageFile): Promise<string>;
}
