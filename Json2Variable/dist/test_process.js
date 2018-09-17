"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var processJson = require("./processJson");
var fs = require("fs-extra");
var input_fileName = "testJsonData.json";
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var validInputs, fileContent, content, contentObj, result, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Reading JSON file to generate variables for future tasks... ");
                    validInputs = true;
                    fileContent = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!validInputs) return [3 /*break*/, 3];
                    content = fs.readFileSync(input_fileName, { encoding: 'utf8' });
                    contentObj = JSON.parse(content.toString('utf8').replace(/^\uFEFF/, ''));
                    return [4 /*yield*/, processJson.ProcessKeys(contentObj, "json", false)];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    console.log("fail");
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
Run();
//# sourceMappingURL=test_process.js.map