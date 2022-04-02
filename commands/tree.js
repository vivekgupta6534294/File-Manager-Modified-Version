let path=require('path');
let fs=require('fs');
function treeFn(directoryPath){
    // console.log("Tree Command Implemented for  ",directoryPath);
    if(directoryPath==undefined){
        treeHelper(process.cwd(), "\t");
        
        return;
    }else {
        let doesExist=fs.existsSync(directoryPath);
        if(doesExist){
            treeHelper(directoryPath, "\t");
        }else{
           console.log("Kindly Enter the Correct Path");
           return;
        }
    }
}


function treeHelper(dirpath, indent){
    //is file Or Folder // File hai print else Folder ke ander jana hoga
   let isFile = fs.lstatSync(dirpath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirpath);
        console.log(indent +"\t" +"├───"+ fileName)
    }else{
        let dirName=path.basename(dirpath)
        console.log(indent+ " └───" +dirName);
        let childrens =fs.readdirSync(dirpath);
        for(let i=0;i<childrens.length;i++){
            let childPath=path.join(dirpath ,childrens[i])
            treeHelper(childPath,"\t")
        }
        

    }
}

module.exports={
    treeKey:treeFn
}