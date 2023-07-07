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
exports.getFileByUrl = void 0;
const axios_1 = require("axios");
const getFileByUrl = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!url) {
            return null;
        }
        const response = yield axios_1.default.get(url, {
            responseType: 'arraybuffer'
        });
        if (response.status === 200) {
            // const buffer = Buffer.from(response.data);
            // console.log('File loaded to buffer');
            return {
                length: response.data.length,
                mimetype: response.headers['content-type'],
                data: response.data
            };
        }
        else {
            console.error('Error when load file to buffer', response.status);
            return Promise.resolve(null);
        }
    }
    catch (error) {
        console.error('Catched error when load file to buffer', error);
        return Promise.resolve(null);
    }
});
exports.getFileByUrl = getFileByUrl;
