require('./config/config');

const express = require('express');

const mongoose = require('mongoose');



const app = express();
// body parser para parametros del post ... app.use midleware codigo que si o si se dispara

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


// configutacion global de rutas /usuario /login en get..put..etc
app.use(require('./routes/index'));


// conexion a la base de datos
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {

        if (err) { throw err };
        console.log('Base de datos ONLINE');
    });


app.listen((process.env.PORT), () => {
    console.log('escuchando en el puerto 3000')
});