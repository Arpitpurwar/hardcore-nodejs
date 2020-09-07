/*
**
**
***
 This file is opening file and saving data

*/

// Dependencies

var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');
//File variable
var lib = {};

//Getting the path of this directory
lib.BasePath = path.join(__dirname,'/../.data/');


// opening the file
lib.create=function(dir,file,data,callback){
    //opening the file
    fs.open(lib.BasePath+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        if(!err && fileDescriptor)
        {
            //convert jsondata to string
            var stringdata = JSON.stringify(data);
            //Writing data into file
           fs.write(fileDescriptor,stringdata,function(err){
               if(!err){
                 // close file
                 fs.close(fileDescriptor,function(err){
                     if(!err){
                         callback(false);
                     }
                     else{
                         callback("Closing errror");
                     }
                 })
               }
               else{
                   callback("Writing Data error");
               }



           })
        }
        else{
            callback("file is not opening may be it still exists");
        }


    })

};

// reading the file

lib.read = function(dir,file,callback){
  
    fs.readFile(lib.BasePath+dir+'/'+file+'.json','utf-8',function(err,data){
      
        if(!err && data){
            
            var parsedData = helpers.parseJsontoObject(data);
            callback(false,parsedData);   
        }
        else{

        callback(err,data);
        }
    })
}

// Updating the file

lib.update = function(dir,file,data,callback){
    fs.open(lib.BasePath+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err && fileDescriptor)
        {
            //convert jsondata to string
            var stringdata = JSON.stringify(data);

            fs.truncate(fileDescriptor,function(err){
                if(!err){

            //Writing data into file
           fs.write(fileDescriptor,stringdata,function(err){
               if(!err){
                 // close file
                 fs.close(fileDescriptor,function(err){
                     if(!err){
                         callback(false);
                     }
                     else{
                         callback("Closing errror");
                     }
                 })
               }
               else{
                   callback("Writing Data error");
               }
            })
        }else{
            callback("truncating error");
        }
        })
        }
        else{
            callback("file is not opening may be it still exists");
        }


    })

}

// Delete a file

lib.delete = function(dir,file,callback){
 fs.unlink(lib.BasePath+dir+'/'+file+'.json',function(err){
  if(!err){
      callback(false);
  }
else{
    callback("err in deleting file");
}
 })

}




//Export module
module.exports = lib;

