const express = require('express');

const app = express();


app.use(require('./usuario')); // con esto habilitamos las rutas /usuario en get..put..etc
app.use(require('./login'));

module.exports = app;