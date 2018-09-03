////////////////////////////////////////PAQUETES
const express = require('express');
const bodyParser = require('body-parser');

const S3Route = require('./src/rutas/Acceso.js');
////////////////////////////////////////ARCHIVOS LOCALES

const app = express();
const port =process.env.port || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', S3Route);



/////////////////////////////////////////EJECUCIÓN 
app.listen(port, function(err){
    console.log("está corriendo");
});

