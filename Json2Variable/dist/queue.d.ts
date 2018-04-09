import * as di from './dataitem';
export interface Collection {
    push(value: di.DataItem): void;
    pop(): di.DataItem;
    peek(): di.DataItem;
    isEmpty(): boolean;
}
export declare class QNode {
    value: di.DataItem;
    constructor(value: di.DataItem);
}
export declare class Queue implements Collection {
    pointer: any;
    rear: any;
    constructor();
    push(value: di.DataItem): void;
    pop(): any;
    peek(): any;
    isEmpty(): boolean;
}
