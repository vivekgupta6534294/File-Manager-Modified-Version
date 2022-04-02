#!/usr/bin/env node
//Main Code
//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help

let inputArr=process.argv.slice(2);
console.log(inputArr);
let fs=require('fs');
let path=require("path");
let helpObject=require("../commands/help");
let treeObject=require("../commands/tree");
let organizeObject=require("../commands/organize");

let command=inputArr[0];
switch(command){
    case "tree":
        treeObject.treeKey(inputArr[1]);
        // treeFn(inputArr[1]);
        break;
    case "organize":
        organizeObject.organizeKey(inputArr[1]);
        // organizeFn(inputArr[1])
        break;
    case "help":
        helpObject.helpKey();
        break;
    default:
        console.log("Please Input Right Command ");
}

