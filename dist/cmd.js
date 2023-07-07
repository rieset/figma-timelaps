"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const [node, script, command] = process.argv;
(0, common_1.common)(command)
    .then((result) => {
    if (result) {
        console.log(result);
    }
    process.exit(0);
})
    .catch((error) => {
    console.error('Unexpected error', error);
    process.exit(1);
});
