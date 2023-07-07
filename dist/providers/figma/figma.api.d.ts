import { FigmaImageFile } from './figma.api.model';
export declare class FigmaAPI {
    private host;
    private fileAge;
    private apiKey;
    private fileUUID;
    constructor(apiKey: any, FileUUID: any, age: number);
    getFileImage(fileUUID: string): Promise<FigmaImageFile | null>;
}
