import { FigmaAPIOptions, FigmaImageFile } from './figma.api.model';
export declare class FigmaAPI {
    private host;
    private options;
    private apiKey;
    private fileUUID;
    private enabled;
    constructor(apiKey: any, FileUUID: any, options: FigmaAPIOptions);
    getFileImage(): Promise<FigmaImageFile[]>;
}
