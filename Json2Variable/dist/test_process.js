"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var processJson = require("./processJson");
var getFSData = require("./getFSData");
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
                    _a.trys.push([1, 6, , 7]);
                    if (!validInputs) return [3 /*break*/, 4];
                    return [4 /*yield*/, getFSData.OpenFile(input_fileName)];
                case 2:
                    fileContent = _a.sent();
                    content = fs.readFileSync(input_fileName, { encoding: 'utf8' });
                    contentObj = JSON.parse(content);
                    return [4 /*yield*/, processJson.ProcessKeys(contentObj, "json", true)];
                case 3:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    console.log("fail");
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
Run();
//# sourceMappingURL=test_process.js.map