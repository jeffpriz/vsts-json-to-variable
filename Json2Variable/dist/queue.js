"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QNode = /** @class */ (function () {
    function QNode(value) {
        this.value = value;
    }
    return QNode;
}());
exports.QNode = QNode;
var Queue = /** @class */ (function () {
    function Queue() {
        this.pointer = null;
        this.rear = null;
    }
    Queue.prototype.push = function (value) {
        var pushedNode = new QNode(value);
        var previousRear = this.rear;
        if (!this.rear) {
            this.pointer = pushedNode;
            this.rear = pushedNode;
        }
        else {
            this.rear = pushedNode;
            previousRear.pointer = pushedNode;
        }
    };
    Queue.prototype.pop = function () {
        var poppedValue = this.pointer.value;
        this.pointer = this.pointer.pointer;
        if (!this.pointer) {
            this.rear = null;
        }
        return poppedValue;
    };
    Queue.prototype.peek = function () {
        if (this.pointer) {
            return this.pointer.value;
        }
        else {
            return undefined;
        }
    };
    Queue.prototype.isEmpty = function () {
        return this.rear === null;
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map