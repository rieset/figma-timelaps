import { TimelapseOptions } from './timelapse.model';
export declare class Timelapse {
    private s3;
    private figma;
    private options;
    constructor(options: TimelapseOptions);
    init(): Promise<void>;
    snapshot(): Promise<string | null>;
}
