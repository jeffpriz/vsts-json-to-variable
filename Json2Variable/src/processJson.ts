import * as tl from 'azure-pipelines-task-lib';
import * as dataItem from './dataitem';
import { DataItem } from './dataitem';


//Function to process through the keys in the JSON.. This will run recursivly through a queue
export async function ProcessKeys(jsonData:any, prefix:string, shouldPrefix:boolean):Promise<boolean>
{    
    var dataQueue:dataItem.DataItem[] = [];
    if(!shouldPrefix)
    {
        prefix = "";
    }
    dataQueue.push(new dataItem.DataItem(jsonData ,prefix)); 
    
    return new Promise<boolean>(async (resolve, reject) => {

        //Recurse through using the queue
        while(dataQueue.length > 0)
        {
            //pop the first item off the queue
            let thisDataItem:dataItem.DataItem = dataQueue.pop() as dataItem.DataItem;
            if(thisDataItem != undefined)
            {

                if(thisDataItem.DataObj != undefined)
                {
                    tl.debug("Popped: " + thisDataItem.DataObj.toString() + " | " + thisDataItem.PrefixChain);

                    try
                    {
                        let thisJson:any = thisDataItem.DataObj;                  
                        await ProcessSingleNode(dataQueue, thisJson,  thisDataItem,  shouldPrefix);
                        
                        resolve(true);
                    }
                    catch(err)
                    {
                        tl.debug(err);
                        reject(err);
                    }
                }
            }   
        }
    });

}



//Process a single Json node
async function ProcessSingleNode(dataQueue:dataItem.DataItem[],thisJson:any, thisDataItem:dataItem.DataItem, shouldPrefix:boolean)
{
            
        if(thisJson != undefined)
        {
            //If this is not a simple value, but a complex JSON object or an array, we need to push it
            //on to the queue to be processed
            let isArray:boolean = await processArrayNode(dataQueue, thisJson, thisDataItem, shouldPrefix);
            let isComplexObject:boolean = false;
            if(!isArray)
            {
                isComplexObject = await processComplexObject(dataQueue, thisJson, thisDataItem, shouldPrefix);
            }
           
            //Else if this is not a simple value but an array, we need to push each item on to the 
            //queue to be processed            
            if(!(isArray || isComplexObject))
            {
                const vName:string = thisDataItem.PrefixChain;
                const vValue = thisJson ? thisJson.toString() : "";
                console.log(`Creating variable : ${vName} (value:${vValue})`);
                tl.setVariable(vName, vValue);
            }
            
        }
}



//Checks if the current JSON Node is an Array, and will loop through and process that array.  Pushing objects on the queue to be recursed through
async function processArrayNode(dataQueue:dataItem.DataItem[],thisJson:any, thisDataItem:dataItem.DataItem, shouldPrefix:boolean):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            let isArray:boolean = await isNodeArray(thisJson);
            if(isArray)
            {
                
                for(let arrayNDX = 0; arrayNDX < thisJson.length; arrayNDX++)
                {
                    var prfx:string = "";
                    prfx = thisDataItem.PrefixChain + (arrayNDX + 1).toString();
                    dataQueue.push(new dataItem.DataItem(thisJson[arrayNDX],prfx))
                    
                }
                
            }
            resolve(isArray);
        }
        catch(err)
        {
            reject(err);
        }
    });
}


//Checks to see if the current JSON Node is a complex JSON Object (not a simple string, bool, or number) and will go through each key in the object and push items
//on to the Queue to be recursed through
export async function processComplexObject(dataQueue:dataItem.DataItem[],thisJson:any, thisDataItem:dataItem.DataItem, shouldPrefix:boolean):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            var isComplexObject:boolean = await isNodeComplex(thisJson);
            if(isComplexObject)
            {
                for(var key in thisJson)
                {
                    if(thisJson.hasOwnProperty(key))
                    {
                        var subObj = thisJson[key];
                        var prfx:string;
                        if(shouldPrefix || thisDataItem.PrefixChain.length > 0)
                        {
                            prfx = thisDataItem.PrefixChain + "." + key;
                        }
                        else
                        {
                            prfx = key;
                        }

                        dataQueue.push(new dataItem.DataItem(subObj,prfx));
                    }
                }
            }
            resolve(isComplexObject);
        }
        catch(err)
        {
            reject(err);
        }
    });
}

//Tests to see if this item's string indicates it is an array
export async function isNodeArray(thisJSONObj:any):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            var isComplex:boolean = false;
            if(thisJSONObj instanceof Array)
            {
                isComplex = true;
            }
            
            
            resolve(isComplex);
        }
        catch(err)
        {
            reject(err);
        }
    });
}



//Tests to see if this items text indicates that it is a complex object
export async function isNodeComplex(thisJSONObj:any):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => {
        var typeArray: string[] =["string", "number", "boolean"];
        try{

            var isComplex:boolean = false;
            if(typeArray.indexOf(typeof thisJSONObj) > -1)
            {
                isComplex = false
            }
            else            
            {
                isComplex = true;
            }
            

            resolve(isComplex);
        }
        catch(err)
        {
            reject(err);
        }
    });
}
