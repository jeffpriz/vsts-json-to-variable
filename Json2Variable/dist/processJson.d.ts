import * as dataItem from './dataitem';
export declare function ProcessKeys(jsonData: any, prefix: string, shouldPrefix: boolean): Promise<boolean>;
export declare function processComplexObject(dataQueue: dataItem.DataItem[], thisJson: any, thisDataItem: dataItem.DataItem, shouldPrefix: boolean): Promise<boolean>;
export declare function isNodeArray(thisJSONObj: any): Promise<boolean>;
export declare function isNodeComplex(thisJSONObj: any): Promise<boolean>;
