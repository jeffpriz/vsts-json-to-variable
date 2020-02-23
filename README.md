# JSON to Variable

TFS and Azure DevOps build and release pipeline task that will read a JSON file (not JSON data from an api) and generate build and release variables to be used by other tasks in the build or release process.

This gives you the ability to read JSON files available at build or release time, the files can be something located on the File system available to build or release agents, or can be something read in from the Build source code, or in the build Artifact at release time. 

This means you can create some specific logic in your builds or releases based on the conditions based on JSON that is in Source control. 

Some uses might be to
* Release to a specific development sub-environment, giving developers some control at coding time
* Handling some versioning process through variables
* Extending agent specific conditions to your release process

##UPDATE 1.0.19 Update Note:  
I apologize for the issue that was introduced with the update 1.0.19. It means you now have two Instances of the task installed on your server.  This is a result of a change made to the task ID for this extension.  I was trying to make an update to the task when the Marketplace was rejecting my udpate with the error:

```Contribution Microsoft.VisualStudio.Services.TaskId.VSTS-JSON-TO-VARIABLE is re-using task ID of some other contribution from earlier version. To publish the extension, change the task ID.```

I could only publish this update by changing the task ID, which has the unfortunate side-effect of messing up the installation for those who had it previously installed.  I've sent a query into the Marketplace team to see why this is happening.

NOTE -- with great power comes great responsibility, think through the implications of using this for what you are doing, just because you "Can" do something, doesn't always mean it's the "Right" choice.

[![Build Status](https://oneluckidev.visualstudio.com/OneLuckiDev/_apis/build/status/vsts-json-to-variable)](https://oneluckidev.visualstudio.com/OneLuckiDev/_build/latest?definitionId=16)


## Azure Dev Ops YAML
steps: --

` - task:OneLuckiDev.json2variable.vsts-release-web-test.oneLuckiDevJson2Variable@1`
`  displayName: 'JSON to Variable'`
`  inputs:`
`    jsonFile: '-- your json file here --'`
`    shouldPrefixVariables: true `
`    variablePrefix: prefixNameHere`

## Functionality
This task reads a JSON file, parses through it an set variable values based on the structure of the JSON that was read in. Variable will be created or updated if the exist already. 

## Input Value usage
**JSON File**
 The Path to the JSON file to be read in and processed into variables


**Variable Name Prefix**
The initial prefix of the Variable names.  This lets you specify the root prefix, so you can utilize this task multiple times for multiple files and still organize them accordingly.

![input preview](images/taskSetup.PNG)
     

## Images
![json text](images/jsontext.png)
![task output](images/taskOutput.PNG)

## Source
[GitHub](https://github.com/jeffpriz/vsts-json-to-variable)

## Issues
[File an issue](https://github.com/jeffpriz/vsts-json-to-variable/issues)

## Credits
[Jeff Przylucki](http://www.oneluckidev.com)
