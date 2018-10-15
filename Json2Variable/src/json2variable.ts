import * as tl from 'vsts-task-lib';
import * as processJson from './processJson';
import * as getFSData from './getFSData';

var validInputs:boolean = false;
var input_fileName:string = "";
var input_variablePrefix:string="";
var input_shouldPrefixVariables:boolean;


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

    try
    {
        input_shouldPrefixVariables = tl.getBoolInput('shouldPrefixVariables', true);
        tl.debug("the should prefix variables is set to " + input_shouldPrefixVariables.toString());
    }
    catch(ex)
    {
        tl.debug("There was an error setting the value of the shouldPrefixVariables input, defaulting to true");
        input_shouldPrefixVariables = true;
    }
    

    validInputs = true;
    try {
        input_variablePrefix = tl.getInput('variablePrefix',true);
        tl.debug("The Variable preix is set to " + input_variablePrefix);

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


            var contentObj:any = await getFileJSONData();
            var result:boolean =  await processJson.ProcessKeys(contentObj, input_variablePrefix, input_shouldPrefixVariables);
        
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

async function getFileJSONData():Promise<any>
{


return new Promise<any>(async (resolve, reject) => {
    try{
            var retryCount:number =0;
            var success:boolean = false;
            var jsonErr:any;
            var contentObj:any;
            while(!((retryCount >= 4) || success))
            {
                try {

                    contentObj = JSON.parse(await getFSData.OpenFile(input_fileName));
                    //contentObj = JSON.parse(content.toString('utf8').replace(/^\uFEFF/, ''));
                    success = true;
                }
                catch(err){
                    jsonErr = err;
                    retryCount++;
                    tl.debug("error reading json: " + err.toString());
                    tl.debug("retry count: " + retryCount.toString());
                }

            }
            if(success)
            {
                resolve(contentObj)
            }
            else
            {
                reject(jsonErr);
            }
        }
        catch(outsideError)
        {
            tl.debug("error in JSON read process " + outsideError.toString());
            reject(outsideError);
        }
});


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
   

