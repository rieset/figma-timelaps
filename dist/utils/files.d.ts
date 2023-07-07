/// <reference types="node" />
export interface FileByUrl {
    length: number;
    data: Buffer;
    mimetype: string;
}
export declare const getFileByUrl: (url: string | null) => Promise<FileByUrl | null>;
