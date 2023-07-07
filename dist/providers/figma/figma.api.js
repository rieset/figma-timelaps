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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigmaAPI = void 0;
const axios_1 = require("axios");
const files_1 = require("../../utils/files");
class FigmaAPI {
    constructor(apiKey, FileUUID, options) {
        this.host = 'https://api.figma.com';
        this.enabled = false;
        this.apiKey = apiKey;
        this.fileUUID = FileUUID;
        this.options = options;
        // When file age less than 12 hours (obsolescence parameter) then enable class methods
        if (this.options.age < this.options.obsolescence) {
            console.log('Аile is too old');
            this.enabled = true;
        }
        if (this.options.age < this.options.frequency) {
            this.enabled = true;
        }
    }
    getFileImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.enabled) {
                return [];
            }
            const url = new URL(`/v1/images/${this.options.file}?format=png&ids=${this.options.nodes}`, this.host);
            return yield axios_1.default.get(url.toString(), {
                headers: {
                    'X-Figma-Token': this.apiKey
                },
                responseType: 'json'
            }).then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a, e_1, _b, _c;
                var _d, _e, _f, _g, _h;
                if ((_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.err) {
                    return [];
                }
                if (!((_e = response === null || response === void 0 ? void 0 : response.data) === null || _e === void 0 ? void 0 : _e.images) || typeof ((_f = response === null || response === void 0 ? void 0 : response.data) === null || _f === void 0 ? void 0 : _f.images) !== 'object') {
                    return [];
                }
                const result = [];
                try {
                    for (var _j = true, _k = __asyncValues(Object.keys((_g = response === null || response === void 0 ? void 0 : response.data) === null || _g === void 0 ? void 0 : _g.images)), _l; _l = yield _k.next(), _a = _l.done, !_a; _j = true) {
                        _c = _l.value;
                        _j = false;
                        const key = _c;
                        const file = yield (0, files_1.getFileByUrl)(((_h = response === null || response === void 0 ? void 0 : response.data) === null || _h === void 0 ? void 0 : _h.images['0:1']) || null);
                        if (!file) {
                            continue;
                        }
                        const node = key.replace(':', '-');
                        result.push({
                            node,
                            fileUUID: this.options.file,
                            timestamp: new Date().valueOf().toString(),
                            name: [this.options.file, node, new Date().valueOf().toString()].join('/'),
                            mimetype: file.mimetype,
                            data: file.data,
                            length: file.length
                        });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_j && !_a && (_b = _k.return)) yield _b.call(_k);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return result;
            })).catch((error) => {
                console.log('Error wheb get file image from Figma API', error);
                return [];
            });
        });
    }
}
exports.FigmaAPI = FigmaAPI;
