"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiffTime = void 0;
const { DateTime } = require('luxon');
const getDiffTime = (was, now, type = null) => {
    const momentWas = DateTime.fromJSDate(was);
    const momentNow = DateTime.fromJSDate(now);
    const diff = momentNow.diff(momentWas, type === 'seconds' ? 'seconds' : ['days', 'hours', 'minutes']);
    return diff.toObject();
};
exports.getDiffTime = getDiffTime;
