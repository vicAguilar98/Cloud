
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var bucket = '';

class lista{
    list(){
        return s3.listBuckets({}).promise();
    }
    listObj(bucket){
        var params = {
            Bucket: 'victorag-oregon' 
           };
         console.log(params);
        return s3.listObjects(params).promise();
    }
    CreateBuck(bucketName){
        var params = {
            Bucket: bucket,
            CreateBucketConfiguration:{
             LocationConstraint: 'us-west-2'
            }
        };
        
        return new promise(function(fulfill, reject){

        s3.createBucket(params, function(err, data){
            
            if(err){
                if(err.code == 'BucketAlreadyOwnedByYou'){
                    console.log("El Bucket ya existe");
                }else{
                    console.log(err, err.stack);
                    reject(500);
                }
            }else{
                fulfill(data);
            }
            
        })
        })
    }


    AgregarFile(bucket){
           
            return new Promise(function(fulfill,reject){
               
                s3.putObject(bucket, function(err, data){
                    if(err){
                        console.log(err, err.stack);
                        reject(err);
                    }else{
                        fulfill(data);
                        console.log('Archivo agregado... ETag:'+data.ETag);
                    }
                })
            })

            
        }

}

module.exports = lista;