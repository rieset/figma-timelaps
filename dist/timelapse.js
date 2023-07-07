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
exports.Timelapse = void 0;
require('dotenv').config();
class Timelapse {
    constructor() { }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.s3 = yield require(__dirname + '/providers/s3/s3').s3Provider();
            this.figma = yield require(__dirname + '/providers/figma/figma.provider').figmaProvider();
        });
    }
    snapshot() {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.figma.getFileImage(process.env.TIMELAPSE_FIGMA_FILE_UUID);
            if (!file) {
                console.error('Error when get buffer from file');
                return null;
            }
            return yield this.s3.upload(file)
                .then((path) => {
                return `Snapshot stored by link: ${[path]}`;
            })
                .catch((error) => {
                console.log('Error when upload file to S3', error);
                return Promise.resolve(null);
            });
        });
    }
}
exports.Timelapse = Timelapse;
