
import * as path from 'path';
import * as gfs from 'graceful-fs';
import * as stripBom from 'strip-bom';
import * as parseJson from 'parse-json';
import * as pify from 'pify';
import * as processJson from './processJson';
import * as getFSData from './getFSData';
 

var input_fileName = "vss-extension.json";
async function Run()
{
    console.log("Reading JSON file to generate variables for future tasks... ");
    var validInputs:boolean=true;

    var fileContent:string = "";
    try{

        if(validInputs)
        {
            fileContent = await getFSData.OpenFile(input_fileName);


            //            var data:JSON = parseJson(fileContent);
            
            var data:JSON = await processJson.ParseFileDataIntoJsonObject(fileContent);
            var result:boolean =  await processJson.ProcessKeys(fileContent,"json");
        }
        else{
            console.log("fail");
           
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

Run();