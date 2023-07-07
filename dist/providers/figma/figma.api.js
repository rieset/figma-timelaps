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
exports.FigmaAPI = void 0;
const axios_1 = require("axios");
const files_1 = require("../../utils/files");
class FigmaAPI {
    constructor(apiKey, FileUUID, age) {
        this.host = 'https://api.figma.com';
        this.apiKey = apiKey;
        this.fileUUID = FileUUID;
        this.fileAge = age;
        console.log('fileAge', this.fileAge);
    }
    getFileImage(fileUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(`/v1/images/${fileUUID}?format=png&ids=0-1`, this.host);
            return yield axios_1.default.get(url.toString(), {
                headers: {
                    'X-Figma-Token': this.apiKey
                },
                responseType: 'json'
            }).then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.err) {
                    return null;
                }
                if (!((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.images) || !((_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.images['0:1'])) {
                    return null;
                }
                const file = yield (0, files_1.getFileByUrl)(((_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.images['0:1']) || null);
                if (!file) {
                    return null;
                }
                return {
                    name: new Date().valueOf().toString() + '-' + fileUUID,
                    mimetype: response === null || response === void 0 ? void 0 : response.headers['content-type'],
                    data: file
                };
            })).catch((error) => {
                console.log('Error wheb get file image from Figma API', error);
                return Promise.resolve(null);
            });
        });
    }
}
exports.FigmaAPI = FigmaAPI;
