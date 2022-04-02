let fs=require('fs');
let path=require('path');
let extension={
    Audio:[".mp3"],
    Video:[".mp4",".mkv",".gif"],
    Document:[".doc",".xlsx",".pdf",".txt"],
    Image:[".jpeg",".jpg",".png",".png"],
    Software:[".exe"]
    
}
function organizeFn(directoryPath){
    // console.log("Organize Command Implemented for  ",directoryPath);
    // 1: Input -> directory path given
    let destPath;
     if(directoryPath==undefined){
         directoryPath=process.cwd();
         destPath=path.join(process.cwd(),"organized_file");
         if(!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath);
        }
        //  organizeHelper(directoryPath,destPath);
        //   return;
     }else {
         let doesExist=fs.existsSync(directoryPath);
         if(doesExist){
               // 2. create -> Organized File->directory
                destPath=path.join(directoryPath,"organized_files");
                if(!fs.existsSync(destPath)) {
                    fs.mkdirSync(destPath);

                }
                   
         }else{
            console.log("Kindly Enter the Correct Path");
            return;
         }
     }
     organizeHelper(directoryPath,destPath);
}
// 3. Identify Category of all file present in input directory;
function organizeHelper(src,dest){
    let childNames=fs.readdirSync(src);   
    //console.log(childNames);
    for(let i=0;i<childNames.length;i++){
        let childAddress=path.join(src,childNames[i]);
        let isFile =fs.lstatSync(childAddress).isFile();//if it is a file
        if(isFile){
            // console.log(childNames[i]);
            let category=getCategory(childNames[i]);
            // console.log(childNames[i], "belong to : ",category);
            // 4. copy/cut file to that organized directory inside of any of category folder
            sendFiles(childAddress,dest,category)
        }
    }
}
function sendFiles(srcFilePath, dest, category){
    let categoryPath=path.join(dest, category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName =path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to ", category);
}

function getCategory(name){
    let ext=path.extname(name);
    // ext=ext.slice(1);
    // console.log(ext);
    for(let type in extension){
        let cTypeArray=extension[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}

module.exports={
    organizeKey:organizeFn
}