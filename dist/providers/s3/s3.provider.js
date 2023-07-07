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
exports.s3Provider = void 0;
const s3Provider = () => __awaiter(void 0, void 0, void 0, function* () {
    const getProvider = () => __awaiter(void 0, void 0, void 0, function* () {
        switch (process.env.TIMELAPSE_S3_VENDOR) {
            case 'aws':
                return yield require('./aws/s3-aws-provider').s3ProviderInit();
            case 'minio':
                return yield require('./minio/s3-minio-provider').s3ProviderInit();
            default:
                throw new Error('Type S3 provider not defined. Declare S3_VENDOR in .env file');
        }
    });
    return yield getProvider();
});
exports.s3Provider = s3Provider;
