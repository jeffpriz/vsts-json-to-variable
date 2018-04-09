"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var processJson = require("./processJson");
var getFSData = require("./getFSData");
var input_fileName = "testJsonData.json";
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var validInputs, fileContent, data, result, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Reading JSON file to generate variables for future tasks... ");
                    validInputs = true;
                    fileContent = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (!validInputs) return [3 /*break*/, 5];
                    return [4 /*yield*/, getFSData.OpenFile(input_fileName)];
                case 2:
                    fileContent = _a.sent();
                    return [4 /*yield*/, processJson.ParseFileDataIntoJsonObject(fileContent)];
                case 3:
                    data = _a.sent();
                    return [4 /*yield*/, processJson.ProcessKeys(fileContent, "json")];
                case 4:
                    result = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    console.log("fail");
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
Run();
//# sourceMappingURL=testProcess.js.map