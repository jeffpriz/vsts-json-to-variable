"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var processJson = require("../processJson");
describe('processJson', function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var complexJSON, complexObj, simpleString;
        return tslib_1.__generator(this, function (_a) {
            complexJSON = '{"result":true, "count":42, "complex1":{"key1":123, "value1":"akeyvalue"}}';
            complexObj = JSON.parse(complexJSON);
            simpleString = "SimpleString";
            it('isNodeComplex should determine this node is complex', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var result;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, processJson.isNodeComplex(complexObj)];
                            case 1:
                                result = _a.sent();
                                assert.equal(result, true);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('isNodeComplex should determine this string is simple', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var result;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, processJson.isNodeComplex(simpleString)];
                            case 1:
                                result = _a.sent();
                                assert.equal(result, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('isNodeComplex should determine this number is simple', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var result;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, processJson.isNodeComplex(12345)];
                            case 1:
                                result = _a.sent();
                                assert.equal(result, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('isNodeComplex should determine this boolean is simple', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var result;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, processJson.isNodeComplex(true)];
                            case 1:
                                result = _a.sent();
                                assert.equal(result, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('isNodeArray should determine this string is not an Array', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var result;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, processJson.isNodeArray(simpleString)];
                            case 1:
                                result = _a.sent();
                                assert.equal(result, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('isNodeArray should determine this is an Array', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var result;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, processJson.isNodeArray([simpleString, simpleString])];
                            case 1:
                                result = _a.sent();
                                assert.equal(result, true);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('processComplexObject should put 3 items in the Queue', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var queue, newDataItem, success;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                queue = [];
                                newDataItem = { DataObj: complexObj, PrefixChain: "FirstPrefix" };
                                return [4 /*yield*/, processJson.processComplexObject(queue, complexObj, newDataItem, false)];
                            case 1:
                                success = _a.sent();
                                assert.equal(queue.length, 3);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('processComplexObject should prefix names for items in the Queue', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var queue, newDataItem, success;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                queue = [];
                                newDataItem = { DataObj: complexObj, PrefixChain: "FirstPrefix" };
                                return [4 /*yield*/, processJson.processComplexObject(queue, complexObj, newDataItem, true)];
                            case 1:
                                success = _a.sent();
                                assert.equal(queue.length, 3);
                                assert.equal(queue[0].PrefixChain, "FirstPrefix.result");
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('processComplexObject should not prefix names for items in the Queue', function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var queue, newDataItem, success;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                queue = [];
                                newDataItem = { DataObj: complexObj, PrefixChain: "" };
                                return [4 /*yield*/, processJson.processComplexObject(queue, complexObj, newDataItem, false)];
                            case 1:
                                success = _a.sent();
                                assert.equal(queue.length, 3);
                                assert.equal(queue[0].PrefixChain, "result");
                                return [2 /*return*/];
                        }
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
//# sourceMappingURL=processJsonTest.js.map