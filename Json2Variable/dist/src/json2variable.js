"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tl = require("azure-pipelines-task-lib");
var processJson = require("./processJson");
var getFSData = require("./getFSData");
var validInputs = false;
var input_fileName = "";
var input_variablePrefix = "";
var input_shouldPrefixVariables;
//=----------------------------------------------------------
//=  Validate that the inputs were provided as expected
//=----------------------------------------------------------
function validateInputs() {
    //File name input
    tl.debug("validating inputs...");
    validInputs = true;
    try {
        input_fileName = tl.getInput('jsonFile', true);
    }
    catch (ex) {
        tl.error("a filename is a required input to this task, but was not supplied");
        validInputs = false;
    }
    //Variable Prefix
    try {
        input_shouldPrefixVariables = tl.getBoolInput('shouldPrefixVariables', true);
        tl.debug("the should prefix variables is set to " + input_shouldPrefixVariables.toString());
    }
    catch (ex) {
        tl.debug("There was an error setting the value of the shouldPrefixVariables input, defaulting to true");
        input_shouldPrefixVariables = true;
    }
    validInputs = true;
    try {
        input_variablePrefix = tl.getInput('variablePrefix', true);
        tl.debug("The Variable preix is set to " + input_variablePrefix);
    }
    catch (ex) {
        tl.debug("A Variable name Prefix was not supplied, defaulting to 'json'");
        input_variablePrefix = "json";
    }
}
///Run function to handle the async running process of the task
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileContent, contentObj, result, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Reading JSON file to generate variables for future tasks... ");
                    validateInputs();
                    fileContent = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!validInputs) return [3 /*break*/, 4];
                    return [4 /*yield*/, getFileJSONData()];
                case 2:
                    contentObj = _a.sent();
                    return [4 /*yield*/, processJson.ProcessKeys(contentObj, input_variablePrefix, input_shouldPrefixVariables)];
                case 3:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    tl.setResult(tl.TaskResult.Failed, "Invalid Inputs");
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    tl.error(err_1);
                    tl.setResult(tl.TaskResult.Failed, "processing JSON failed");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function getFileJSONData() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var retryCount, success, jsonErr, contentObj, _a, _b, err_2, outsideError_1;
                    return tslib_1.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 7, , 8]);
                                retryCount = 0;
                                success = false;
                                _c.label = 1;
                            case 1:
                                if (!!((retryCount >= 4) || success)) return [3 /*break*/, 6];
                                _c.label = 2;
                            case 2:
                                _c.trys.push([2, 4, , 5]);
                                _b = (_a = JSON).parse;
                                return [4 /*yield*/, getFSData.OpenFile(input_fileName)];
                            case 3:
                                contentObj = _b.apply(_a, [_c.sent()]);
                                //contentObj = JSON.parse(content.toString('utf8').replace(/^\uFEFF/, ''));
                                success = true;
                                return [3 /*break*/, 5];
                            case 4:
                                err_2 = _c.sent();
                                jsonErr = err_2;
                                retryCount++;
                                tl.debug("error reading json: " + err_2.toString());
                                tl.debug("retry count: " + retryCount.toString());
                                return [3 /*break*/, 5];
                            case 5: return [3 /*break*/, 1];
                            case 6:
                                if (success) {
                                    resolve(contentObj);
                                }
                                else {
                                    reject(jsonErr);
                                }
                                return [3 /*break*/, 8];
                            case 7:
                                outsideError_1 = _c.sent();
                                tl.debug("error in JSON read process " + outsideError_1.toString());
                                reject(outsideError_1);
                                return [3 /*break*/, 8];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
//main
try {
    Run();
}
catch (err) {
    tl.setResult(tl.TaskResult.Failed, "Unable to process JSON successfully for variables.");
}
//# sourceMappingURL=json2variable.js.map