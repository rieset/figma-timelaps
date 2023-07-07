/// <reference types="node" />
export interface FigmaAPIOptions {
    obsolescence: number;
    frequency: number;
    nodes: string;
    age: number;
    file: string;
}
export interface FigmaImageFile {
    timestamp: string;
    node: string;
    fileUUID: string;
    name: string;
    data: Buffer;
    mimetype: string;
    length: number;
}
export interface FigmaImagesFileResponse {
    err: string | null;
    images: {
        [key: string]: string;
    };
}
