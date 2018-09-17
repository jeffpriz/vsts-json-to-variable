
import * as processJson from './processJson';
import fs = require('fs-extra');
 

var input_fileName = "testJsonData.json";
async function Run()
{
    console.log("Reading JSON file to generate variables for future tasks... ");
    var validInputs:boolean=true;

    var fileContent:string = "";
    try{

        if(validInputs)
        {
            //fileContent = await getFSData.OpenFile(input_fileName);
            var content = fs.readFileSync(input_fileName, { encoding: 'utf8' });
            var contentObj:any = JSON.parse(content.toString('utf8').replace(/^\uFEFF/, ''));
            //            var data:JSON = parseJson(fileContent);
            
            //var data:JSON = await processJson.ParseFileDataIntoJsonObject(content);
            var result:boolean =  await processJson.ProcessKeys(contentObj,"json", false);
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