"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gfs = require("graceful-fs");
var tl = require("azure-pipelines-task-lib");
function OpenFile(filename) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var completeSuccess, filecontent;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            completeSuccess = true;
            filecontent = "";
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        try {
                            filecontent = gfs.readFileSync(filename, "utf8");
                            tl.debug("File content is: ");
                            tl.debug(filecontent);
                            resolve(filecontent);
                        }
                        catch (err) {
                            reject(err);
                        }
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
exports.OpenFile = OpenFile;
function WriteFile(filename, fileData) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var completeSuccess, filecontent;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            completeSuccess = false;
            filecontent = "";
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        try {
                            filecontent = gfs.writeFileSync(filename, fileData);
                            completeSuccess = true;
                            tl.debug("File content is: ");
                            tl.debug(filecontent);
                            resolve(completeSuccess);
                        }
                        catch (err) {
                            reject(err);
                        }
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
exports.WriteFile = WriteFile;
//# sourceMappingURL=getFSData.js.map