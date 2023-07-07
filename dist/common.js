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
exports.common = void 0;
const timelapse_1 = require("./timelapse");
const common = (cmd, options) => __awaiter(void 0, void 0, void 0, function* () {
    const timelapse = new timelapse_1.Timelapse(options);
    yield timelapse.init();
    switch (cmd) {
        case 'snapshot':
            return yield timelapse.snapshot();
        default:
            throw new Error('Command not defined');
    }
    // if (!connect) {
    //   console.log('Не удалось подключиться к базе данных');
    //   return false;
    // }
});
exports.common = common;
