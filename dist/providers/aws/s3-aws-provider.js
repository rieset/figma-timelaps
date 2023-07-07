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
exports.s3ProviderInit = void 0;
const s3ProviderInit = () => __awaiter(void 0, void 0, void 0, function* () {
    const AWS = require('aws-sdk');
    if (!process.env.S3_ACCESS_KEY_ID) {
        throw new Error('S3_ACCESS_KEY_ID is not defined in .env file');
    }
    if (!process.env.S3_SECRET_ACCESS_KEY) {
        throw new Error('S3_SECRET_ACCESS_KEY is not defined in .env file');
    }
    if (!process.env.S3_REGION) {
        throw new Error('S3_REGION is not defined in .env file');
    }
    if (!process.env.S3_BUCKET_NAME) {
        throw new Error('S3_BUCKET_NAME is not defined in .env file');
    }
    // Конфигурируем AWS SDK
    AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    });
    const s3 = new AWS.S3();
    // Execute test request to S3
    s3.listBuckets((err, data) => {
        if (err) {
            console.error('\nError when try to connect to S3\n', err);
        }
        else {
            console.log(`\nAvailable ${data.Buckets.length} buckets\n`);
            if (!data.Buckets.find((bucket) => bucket.Name === process.env.S3_BUCKET_NAME)) {
                console.log('Available buckets:\n\t', data.Buckets.map((bucket) => {
                    return `- ${bucket.Name}`;
                }).join('\n\t'));
                throw new Error(`Bucket ${process.env.S3_BUCKET_NAME} not found`);
            }
        }
    });
    // Создаем новый экземпляр S3
    return s3;
});
exports.s3ProviderInit = s3ProviderInit;
