import * as path from 'path';
import * as gfs from 'graceful-fs';
import * as tl from 'azure-pipelines-task-lib';

export async function OpenFile(filename:string):Promise<string>
{
    var completeSuccess:boolean = true;
    var filecontent:string = "";
     return new Promise<string>(async (resolve, reject) => {
        try {
             filecontent =  gfs.readFileSync(filename,"utf8");
             tl.debug("File content is: ");
             tl.debug(filecontent);
            resolve(filecontent);
        }
        catch(err)
        {
            
            reject(err);
        }
        
    });
}   