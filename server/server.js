require('./config/config');

const express = require('express')
const app = express()

// body parser para parametros del post ... app.use midleware codigo que si o si se dispara

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/usuario', (req, res) => {
    res.json('Getttt usuario');
});

app.post('/usuario', (req, res) => {

    let body = req.body;
    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        })
    } else {
        res.json({
            persona: body
        });
    }

});


app.put('/usuario', (req, res) => {
    res.json('puttt usuario');
});


app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    res.json({ id })

});

app.listen((process.env.PORT), () => {
    console.log('escuchando en el puerto 3000')
});