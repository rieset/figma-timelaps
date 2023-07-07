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
    // Конфигурируем AWS SDK
    AWS.config.update({
        accessKeyId: 'YOUR_ACCESS_KEY',
        secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
    });
    // Создаем новый экземпляр S3
    return new AWS.S3();
});
exports.s3ProviderInit = s3ProviderInit;
