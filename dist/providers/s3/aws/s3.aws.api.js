"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3API = void 0;
class AwsS3API {
    constructor(s3) {
        this.s3 = s3;
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const awsS3UploadParams = {
                Bucket: process.env.TIMELAPSE_S3_BUCKET_NAME,
                Key: [process.env.TIMELAPSE_S3_PATH, file.name].join('/'),
                Body: file.data
            };
            return new Promise((resolve, reject) => {
                this.s3.upload(awsS3UploadParams, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        console.log('Fiel storted, ', data);
                        resolve(data.Location);
                    }
                });
            });
        });
    }
}
exports.AwsS3API = AwsS3API;
