"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var parseJson = require("parse-json");
var tl = require("vsts-task-lib");
var dataItem = require("./dataitem");
function ParseFileDataIntoJsonObject(fileData) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var data;
                    return tslib_1.__generator(this, function (_a) {
                        try {
                            data = parseJson(fileData);
                            resolve(data);
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
exports.ParseFileDataIntoJsonObject = ParseFileDataIntoJsonObject;
//Function to process through the keys in the JSON.. This will run recursivly through a queue
function ProcessKeys(jsonData, prefix) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        var dataQueue;
        return tslib_1.__generator(this, function (_a) {
            dataQueue = [];
            dataQueue.push(new dataItem.DataItem(jsonData, prefix));
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var thisDataItem, thisJson, keys, ndx, err_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(dataQueue.length > 0)) return [3 /*break*/, 8];
                                thisDataItem = dataQueue.pop();
                                if (!(thisDataItem != undefined)) return [3 /*break*/, 7];
                                tl.debug("Popped: " + thisDataItem.DataText + " | " + thisDataItem.PrefixChain);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 6, , 7]);
                                thisJson = parseJson(thisDataItem.DataText);
                                keys = Object.keys(thisJson);
                                ndx = 0;
                                _a.label = 2;
                            case 2:
                                if (!(ndx < keys.length)) return [3 /*break*/, 5];
                                tl.debug("Key Found! " + keys[ndx]);
                                return [4 /*yield*/, ProcessSingleNode(dataQueue, thisJson, ndx, thisDataItem, keys)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                ndx++;
                                return [3 /*break*/, 2];
                            case 5:
                                resolve(true);
                                return [3 /*break*/, 7];
                            case 6:
                                err_1 = _a.sent();
                                tl.debug(err_1);
                                reject(err_1);
                                return [3 /*break*/, 7];
                            case 7: return [3 /*break*/, 0];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.ProcessKeys = ProcessKeys;
//Process a single Json node
function ProcessSingleNode(dataQueue, thisJson, ndx, thisDataItem, keys) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var txt, prfx, prfx, arx, thisprfx, arData, vName;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(thisJson[keys[ndx]] != undefined)) return [3 /*break*/, 4];
                    tl.debug(thisJson[keys[ndx]]);
                    txt = JSON.stringify(thisJson[keys[ndx]]);
                    return [4 /*yield*/, isNodeComplex(txt)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 2];
                    prfx = thisDataItem.PrefixChain + "." + keys[ndx];
                    dataQueue.push(new dataItem.DataItem(txt, prfx));
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, isNodeArray(txt)];
                case 3:
                    if (_a.sent()) {
                        prfx = thisDataItem.PrefixChain + "." + keys[ndx];
                        for (arx = 0; arx < thisJson[keys[ndx]].length; arx++) {
                            thisprfx = prfx + (arx + 1).toString();
                            arData = JSON.stringify(thisJson[keys[ndx]][arx]);
                            tl.debug("Array info: " + arData);
                            dataQueue.push(new dataItem.DataItem(arData, thisprfx));
                        }
                    }
                    else {
                        vName = thisDataItem.PrefixChain + "." + keys[ndx];
                        console.log("Creating variable : " + vName + " | " + txt);
                        tl.setVariable(vName, txt);
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Tests to see if this item's string indicates it is an array
function isNodeArray(nodeText) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var isComplex;
                    return tslib_1.__generator(this, function (_a) {
                        try {
                            isComplex = false;
                            if (nodeText.length > 1) {
                                if (nodeText.startsWith("[") && nodeText.endsWith("]")) {
                                    isComplex = true;
                                }
                            }
                            resolve(isComplex);
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
//Tests to see if this items text indicates that it is a complex object
function isNodeComplex(nodeText) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var isComplex;
                    return tslib_1.__generator(this, function (_a) {
                        try {
                            isComplex = false;
                            if (nodeText.length > 1) {
                                if (nodeText.startsWith("{") && nodeText.endsWith("}")) {
                                    isComplex = true;
                                }
                            }
                            resolve(isComplex);
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
//# sourceMappingURL=processJson.js.map