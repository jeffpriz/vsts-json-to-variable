"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var processJson = require("./processJson");
var getFSData = require("./getFSData");
var input_fileName = "testJsonData.json";
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var validInputs, fileContent, obCont, _a, _b, result, what, err_1;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Reading JSON file to generate variables for future tasks... ");
                    validInputs = true;
                    fileContent = "";
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    if (!validInputs) return [3 /*break*/, 4];
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, getFSData.OpenFile(input_fileName)];
                case 2:
                    obCont = _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, processJson.ProcessKeys(obCont, "json", false)];
                case 3:
                    result = _c.sent();
                    what = "what";
                    return [3 /*break*/, 5];
                case 4:
                    console.log("fail");
                    _c.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _c.sent();
                    console.log(err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
Run();
//# sourceMappingURL=test_process.js.map