import * as tl from 'vsts-task-lib';
import * as parseJson from 'parse-json';
import * as pify from 'pify';
import * as processJson from './processJson';
import * as getFSData from './getFSData';

var validInputs:boolean = false;
var input_fileName:string = "";
var input_variablePrefix:string="";


//=----------------------------------------------------------
//=  Validate that the inputs were provided as expected
//=----------------------------------------------------------
function validateInputs()
{
    //File name input
    tl.debug("validating inputs...");
    
    validInputs = true;
    try {
        input_fileName = tl.getInput('jsonFile',true);
        

    }
    catch(ex)
    {
        tl.error("a filename is a required input to this task, but was not supplied");
        validInputs = false;
    }

    //Variable Prefix
    

    validInputs = true;
    try {
        input_variablePrefix = tl.getInput('variablePrefix',true);
        

    }
    catch(ex)
    {
    
       tl.debug("A Variable name Prefix was not supplied, defaulting to 'json'");
        input_variablePrefix = "json";
    }
}




    ///Run function to handle the async running process of the task
async function Run()
{
    console.log("Reading JSON file to generate variables for future tasks... ");
    validateInputs();

    var fileContent:string = "";
    try{

        if(validInputs)
        {
            fileContent = await getFSData.OpenFile(input_fileName);
            tl.debug("File Contents: ")
            tl.debug(fileContent);

            //            var data:JSON = parseJson(fileContent);
            
            var data:JSON = await processJson.ParseFileDataIntoJsonObject(fileContent);
            var result:boolean =  await processJson.ProcessKeys(fileContent, input_variablePrefix);
        
        }
        else{
            tl.setResult(tl.TaskResult.Failed, "Invalid Inputs");
        }
    }
    catch(err)
    {
        tl.error(err);
        
        tl.setResult(tl.TaskResult.Failed, "processing JSON failed");
    }
}

//main
try
{
    Run();
}
catch(err)
{
    
    tl.setResult(tl.TaskResult.Failed, "Unable to process JSON successfully for variables.");
}
   

