"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tl = require("vsts-task-lib");
var processJson = require("./processJson");
var fs = require("fs-extra");
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
        var fileContent, content, contentObj, result, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Reading JSON file to generate variables for future tasks... ");
                    validateInputs();
                    fileContent = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!validInputs) return [3 /*break*/, 3];
                    content = fs.readFileSync(input_fileName, { encoding: 'utf8' });
                    tl.debug("File Contents: ");
                    tl.debug(content);
                    contentObj = JSON.parse(content);
                    return [4 /*yield*/, processJson.ProcessKeys(contentObj, input_variablePrefix, input_shouldPrefixVariables)];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    tl.setResult(tl.TaskResult.Failed, "Invalid Inputs");
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    tl.error(err_1);
                    tl.setResult(tl.TaskResult.Failed, "processing JSON failed");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
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