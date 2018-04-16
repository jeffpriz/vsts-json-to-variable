import * as parseJson from 'parse-json';
import * as tl from 'vsts-task-lib';
import * as dataItem from './dataitem';
import { DataItem } from './dataitem';


export async function ParseFileDataIntoJsonObject(fileData:string):Promise<JSON>
{
    return new Promise<JSON>(async (resolve,reject) => 
    { 
        try {
            var data:JSON = parseJson(fileData);

            resolve(data);
        }
        catch(err)
        {
            reject(err);
        }

    });
}

//Function to process through the keys in the JSON.. This will run recursivly through a queue
export async function ProcessKeys(jsonData:string, prefix:string):Promise<boolean>
{    
    var dataQueue:dataItem.DataItem[] = [];
    dataQueue.push(new dataItem.DataItem(jsonData ,prefix)); 
    
    return new Promise<boolean>(async (resolve, reject) => {

        //Recurse through using the queue
        while(dataQueue.length > 0)
        {
            //pop the first item off the queue
            var thisDataItem:dataItem.DataItem = dataQueue.pop() as dataItem.DataItem;
            if(thisDataItem != undefined)
            {
            tl.debug("Popped: " + thisDataItem.DataText + " | " + thisDataItem.PrefixChain);

            try{

                var thisJson:JSON = parseJson(thisDataItem.DataText);
                var keys:string[] = Object.keys(thisJson);

                //For Each node in the JSON
                for(var ndx = 0; ndx < keys.length; ndx++)
                {
                    tl.debug("Key Found! " + keys[ndx]);
                    await ProcessSingleNode(dataQueue, thisJson, ndx, thisDataItem, keys);
                    

                }
                resolve(true);
            }
            catch(err)
            {
                tl.debug(err);
                reject(err);
            }
        }   
        }
    });

}



//Process a single Json node
async function ProcessSingleNode(dataQueue:dataItem.DataItem[],thisJson:JSON,ndx:number, thisDataItem:dataItem.DataItem,keys:string[])
{
            
        if(thisJson[keys[ndx]] != undefined)
        {
            tl.debug(thisJson[keys[ndx]]);
            var txt:string = JSON.stringify(thisJson[keys[ndx]]);

            //If this is not a simple value, but a complex JSON object, we need to push it
            //on to the queue to be processed
            if(await isNodeComplex(txt))
            {
                var prfx = thisDataItem.PrefixChain + "." + keys[ndx];
                dataQueue.push(new dataItem.DataItem(txt,prfx));
            }
            //Else if this is not a simple value but an array, we need to push each item on to the 
            //queue to be processed
            else if(await isNodeArray(txt))
            {
                var jsonArrayObj = parseJson(txt);
                for(var arrayNDX = 0; arrayNDX < jsonArrayObj.length; arrayNDX++)
                {
                    var prfx = thisDataItem.PrefixChain + "." + keys[ndx];
                    
                    if(await isNodeComplex(JSON.stringify(jsonArrayObj[arrayNDX])))
                    {

                            var thisprfx = prfx + (arrayNDX + 1).toString();
                            var arData = JSON.stringify(jsonArrayObj[arrayNDX]);
                            tl.debug("Array info: "  + arData);
                            dataQueue.push(new dataItem.DataItem(arData,thisprfx));                       
                    
                    }
                    else
                    {
                        //doseomthing with J.
                        
                        
                            var thisItem:string = jsonArrayObj[arrayNDX];
                            var thisprfx = prfx + (arrayNDX + 1).toString();
                            if(thisItem.startsWith('"') && thisItem.endsWith('"'))
                            {
                                thisItem = thisItem.substring(1,(thisItem.length - 1));
                            }
                            console.log("Creating variable : " + thisprfx + " | " + thisItem);
                            tl.setVariable(thisprfx, thisItem);
                        
                    }
            }
                
            }
            else //this is a normal value, we should create a variable for it
            {
                var vName:string = thisDataItem.PrefixChain + "." + keys[ndx];
                
                if(txt.startsWith('"') && txt.endsWith('"'))
                {
                    txt = txt.substring(1,(txt.length - 1));
                }
                console.log("Creating variable : " + vName + " | " + txt);
                tl.setVariable(vName, txt);
            }
        }
}

//Tests to see if this item's string indicates it is an array
async function isNodeArray(nodeText:string):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            var isComplex:boolean = false;
            if(nodeText.length > 1)
            {
                if(nodeText.startsWith("[") && nodeText.endsWith("]"))
                {
                    isComplex = true;
                }

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
async function isNodeComplex(nodeText:string):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            var isComplex:boolean = false;
            if(nodeText.length > 1)
            {
                if(nodeText.startsWith("{") && nodeText.endsWith("}"))
                {
                    isComplex = true;
                }

            }

            resolve(isComplex);
        }
        catch(err)
        {
            reject(err);
        }
    });
}