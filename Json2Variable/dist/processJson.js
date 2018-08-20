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
                    var data, jData;
                    return tslib_1.__generator(this, function (_a) {
                        try {
                            data = parseJson(fileData);
                            jData = JSON.parse(fileData);
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
function ProcessKeys(jsonData, prefix, shouldPrefix) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var dataQueue;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            dataQueue = [];
            dataQueue.push(new dataItem.DataItem(jsonData, prefix, shouldPrefix));
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var thisDataItem, thisJson, err_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(dataQueue.length > 0)) return [3 /*break*/, 5];
                                thisDataItem = dataQueue.pop();
                                if (!(thisDataItem != undefined)) return [3 /*break*/, 4];
                                tl.debug("Popped: " + thisDataItem.DataObj.toString() + " | " + thisDataItem.PrefixChain);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                thisJson = thisDataItem.DataObj;
                                //  tl.debug("Key Found! " + keys[ndx]);
                                return [4 /*yield*/, ProcessSingleNode(dataQueue, thisJson, 0, thisDataItem, [], shouldPrefix)];
                            case 2:
                                //  tl.debug("Key Found! " + keys[ndx]);
                                _a.sent();
                                resolve(true);
                                return [3 /*break*/, 4];
                            case 3:
                                err_1 = _a.sent();
                                tl.debug(err_1);
                                reject(err_1);
                                return [3 /*break*/, 4];
                            case 4: return [3 /*break*/, 0];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.ProcessKeys = ProcessKeys;
//Process a single Json node
function ProcessSingleNode(dataQueue, thisJson, ndx, thisDataItem, keys, shouldPrefix) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var arrayNDX, prfx, key, subObj, prfx, vName;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(thisJson != undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, isNodeArray(thisJson)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 2];
                    //var jsonArrayObj = parseJson(txt);
                    for (arrayNDX = 0; arrayNDX < thisJson.length; arrayNDX++) {
                        prfx = "";
                        prfx = thisDataItem.PrefixChain + arrayNDX.toString();
                        dataQueue.push(new dataItem.DataItem(thisJson[arrayNDX], prfx, shouldPrefix));
                        // if(await isNodeComplex(thisJson[arrayNDX]))
                        // {
                        //                            var thisprfx = prfx + (arrayNDX + 1).toString();
                        //                           var arData = JSON.stringify(thisJson[arrayNDX]);
                        //                           tl.debug("Array info: "  + arData);
                        //                           dataQueue.push(new dataItem.DataItem(arData,thisprfx, shouldPrefix));                       
                        //                   }
                        //                   else
                        //                   {
                        //doseomthing with J.
                        //                         var thisItem:string = thisJson[arrayNDX];
                        //                        var thisprfx = prfx + (arrayNDX + 1).toString();
                        //                        if(thisItem.startsWith('"') && thisItem.endsWith('"'))
                        //                        {
                        //                            thisItem = thisItem.substring(1,(thisItem.length - 1));
                        //                        }
                        //                       console.log("Creating variable : " + thisprfx + " | " + thisItem);
                        //                       tl.setVariable(thisprfx, thisItem);
                        //                }
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, isNodeComplex(thisJson)];
                case 3:
                    if (_a.sent()) {
                        for (key in thisJson) {
                            if (thisJson.hasOwnProperty(key)) {
                                subObj = thisJson[key];
                                prfx = thisDataItem.PrefixChain + "." + key;
                                dataQueue.push(new dataItem.DataItem(subObj, prfx, shouldPrefix));
                            }
                        }
                        //var prfx = thisDataItem.PrefixChain + "." + keys[ndx];
                        //dataQueue.push(new dataItem.DataItem(txt,prfx, shouldPrefix));
                    }
                    //Else if this is not a simple value but an array, we need to push each item on to the 
                    //queue to be processed
                    else //this is a normal value, we should create a variable for it
                     {
                        vName = thisDataItem.PrefixChain;
                        //if(txt.startsWith('"') && txt.endsWith('"'))
                        {
                            //    txt = txt.substring(1,(txt.length - 1));
                        }
                        //console.log("Creating variable : " + vName + " | " + txt);
                        tl.setVariable(vName, thisJson);
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Tests to see if this item's string indicates it is an array
function isNodeArray(thisJSONObj) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var isComplex;
                    return tslib_1.__generator(this, function (_a) {
                        try {
                            isComplex = false;
                            if (thisJSONObj instanceof Array) {
                                isComplex = true;
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
function isNodeComplex(thisJSONObj) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var typeArray, isComplex;
                    return tslib_1.__generator(this, function (_a) {
                        typeArray = ["string", "number", "boolean"];
                        try {
                            isComplex = false;
                            if (typeArray.indexOf(typeof thisJSONObj) > -1) {
                                isComplex = false;
                            }
                            else {
                                isComplex = true;
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