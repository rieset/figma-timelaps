"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const core = require('@actions/core');
const cmd = core.getInput('cmd');
(0, common_1.common)(cmd, {
    obsolescence: 100,
    frequency: 100,
    nodes: '0-1',
    file: ''
}).then((report) => {
    if (!report) {
        throw new Error('Action complete with error');
    }
    core.setOutput('Report', report);
}).catch((error) => {
    throw new Error('Unexpected error: \n' + error.message);
});
