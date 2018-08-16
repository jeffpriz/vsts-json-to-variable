
    export class DataItem
    {
        DataObj:any;
        PrefixChain:string;
        IncludePrefix:boolean;

        constructor(dataText:any, prefixChain:string, includePrefix:boolean)
        {
            
            this.DataObj = dataText;
            this.PrefixChain = prefixChain;
            this.IncludePrefix = includePrefix;
        }


    }
