const express = require('express');
const expressFile = require('express-fileupload');
const S3Route = express.Router();
////. para directorio actual .. para regresar
const control = require("../controladores/controlador.js");
let controller = new control();

S3Route.use(expressFile());


S3Route.route('/').get(function (req, res){
    controller.list().then(function (data){
        res.send(data);
    }).catch(function (err){
        res.send({});
    })
})

.post(function(req, res){
    controller.CreateBuck(req.body).then(function(data){
        res.send(data);
    }).catch(function(err){
        res.send(err);
    })
   
})

S3Route.route('/:bucketName/:objKey').get(function(req, res){
    res.send(req.params.bucketName + '/' + req.params.objkey);
})

S3Route.route('/:bucketName').get(function(req, res){
    controller.listObj(req.params.bucketName).then(function (data){
        res.send(data);
    }).catch(function (err){
        res.send({});
    })
})
.post(function(req,res){
    console.log(req.body)
    controller.AgregarFile({
        Bucket: req.params.bucketName,
        Body: req.files.Body.data,
        ContentType: req.files.Body.mimetype,
        ...req.body
        }).then(function(data){
        res.send(data);
    }).catch(function(err){
        res.send("No se agregó tu archivo")


    })
})


module.exports = S3Route;