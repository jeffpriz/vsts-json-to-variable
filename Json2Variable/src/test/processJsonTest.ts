import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import * as mch from 'mocha';
import * as ch from 'chai';
import * as DataItem from '../dataitem';
import * as processJson from '../processJson';
import * as getFSData from '../getFSData';


describe('processJson', async function(){

    //var input_fileName = "../testJsonData.json";
    var complexJSON = '{"result":true, "count":42, "complex1":{"key1":123, "value1":"akeyvalue"}}';

    
    var complexObj = JSON.parse(complexJSON);    
    var simpleString = "SimpleString";

    it('isNodeComplex should determine this node is complex', async function(){
        var result:boolean = await processJson.isNodeComplex(complexObj);

        assert.equal(result, true);
    });

    it('isNodeComplex should determine this string is simple', async function(){
        var result:boolean = await processJson.isNodeComplex(simpleString);

        assert.equal(result, false);
    });

    it('isNodeComplex should determine this number is simple', async function(){
        var result:boolean = await processJson.isNodeComplex(12345);

        assert.equal(result, false);
    });
    it('isNodeComplex should determine this boolean is simple', async function(){
        var result:boolean = await processJson.isNodeComplex(true);

        assert.equal(result, false);
    });

    it('isNodeArray should determine this string is not an Array', async function(){
        var result:boolean = await processJson.isNodeArray(simpleString);

        assert.equal(result, false);
    });

    it('isNodeArray should determine this is an Array', async function(){
        var result:boolean = await processJson.isNodeArray([simpleString, simpleString]);

        assert.equal(result, true);
    });


    it('processComplexObject should put 3 items in the Queue', async function(){

        var queue:DataItem.DataItem[] =[];
        var newDataItem:DataItem.DataItem = { DataObj:complexObj, PrefixChain:"FirstPrefix"};

        var success:boolean = await processJson.processComplexObject(queue, complexObj, newDataItem,false);

        assert.equal(queue.length,3);

    });

    it('processComplexObject should prefix names for items in the Queue', async function(){

        var queue:DataItem.DataItem[] =[];
        var newDataItem:DataItem.DataItem = { DataObj:complexObj, PrefixChain:"FirstPrefix"};

        var success:boolean = await processJson.processComplexObject(queue, complexObj, newDataItem,true);

        assert.equal(queue.length,3);
        assert.equal(queue[0].PrefixChain, "FirstPrefix.result");

    });

    it('processComplexObject should not prefix names for items in the Queue', async function(){

        var queue:DataItem.DataItem[] =[];
        var newDataItem:DataItem.DataItem = { DataObj:complexObj, PrefixChain:""};

        var success:boolean = await processJson.processComplexObject(queue, complexObj, newDataItem,false);

        assert.equal(queue.length,3);
        assert.equal(queue[0].PrefixChain, "result");

    });

});