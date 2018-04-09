import * as path from 'path';
import * as gfs from 'graceful-fs';

export async function OpenFile(filename:string):Promise<string>
{
    var completeSuccess:boolean = true;
    var filecontent:string = "";

    return new Promise<string>(async (resolve, reject) => {
        try {

            filecontent =  gfs.readFileSync(filename,"utf8");
            resolve(filecontent);
        }
        catch(err)
        {
            
            reject(err);
        }
        
    });
}