export declare class Timelapse {
    private s3;
    private figma;
    constructor();
    init(): Promise<void>;
    snapshot(): Promise<any>;
}
