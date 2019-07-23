
import * as processJson from './processJson';
import * as getFSData from './getFSData';

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
            //var content = fs.readFileSync(input_fileName, { encoding: 'utf8' });
            var obCont:any = JSON.parse(await getFSData.OpenFile(input_fileName));
            //var contentObj:any = JSON.parse(content.toString('utf8').replace(/^\uFEFF/, ''));
            //            var data:JSON = parseJson(fileContent);
            
            //var data:JSON = await processJson.ParseFileDataIntoJsonObject(content);
            var result:boolean =  await processJson.ProcessKeys(obCont,"json", false);
            var what:string = "what";
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


var complexJSON = '{"result":true, "count":42, "complex1":{"key1":123, "value1":"akeyvalue"}}';


var complexObj = JSON.parse(complexJSON);    
var simpleObj = "simpleJSON";


var tp = typeof(simpleObj);

console.log("tp:" + tp);
//Run();