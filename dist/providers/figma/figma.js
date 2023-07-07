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
exports.figmaProvider = void 0;
const time_1 = require("../../utils/time");
const axios = require('axios');
class FigmaAPI {
    constructor(apiKey, FileUUID, age) {
        this.apiKey = apiKey;
        this.fileUUID = FileUUID;
        this.fileAge = age;
    }
}
const figmaProvider = () => __awaiter(void 0, void 0, void 0, function* () {
    const host = 'https://api.figma.com';
    if (!process.env.FIGMA_API_KEY) {
        throw new Error('FIGMA_API_KEY not defined in .env file');
    }
    if (!process.env.FIGMA_FILE_UUID) {
        throw new Error('FIGMA_FILE_UUID not defined in .env file');
    }
    const initFigmaFile = () => __awaiter(void 0, void 0, void 0, function* () {
        const url = new URL(`/v1/files/${process.env.FIGMA_FILE_UUID}`, host);
        return axios.get(url.toString(), {
            headers: {
                'X-Figma-Token': process.env.FIGMA_API_KEY
            }
        })
            .then(response => {
            const diff = (0, time_1.getDiffTime)(new Date(response.data.lastModified), new Date());
            const seconds = (0, time_1.getDiffTime)(new Date(response.data.lastModified), new Date(), 'seconds').seconds || 0;
            console.log(`Connect to Figma File is success. Last modified: ${diff.days} days ${diff.hours} hours ${Math.round(diff.minutes || 0)} minutes ago`);
            return new FigmaAPI(process.env.FIGMA_API_KEY, process.env.FIGMA_FILE_UUID, seconds);
        })
            .catch(error => {
            console.error(error);
            throw new Error('Connect to Figma API error');
        });
    });
    return yield initFigmaFile();
});
exports.figmaProvider = figmaProvider;
