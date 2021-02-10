const express = require('express');

const bcrypt = require('bcrypt');

// const _ = require('underscore');

// toma el modelo delschema de models

const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', (req, res) => {

    // req.query -- parametros opcionales. cant pag

    let desde = req.query.desde || 0; // desde numero 5 o cero
    desde = Number(desde);

    let limite = req.query.limite || 5;

    limite = Number(limite);
    let condicion = {
        estado: true
    }
    Usuario.find(condicion, 'nombre email role estado img') // {condic:true} .. entre comillas los campos a devolver
        .skip(desde) // salta los proximos 5 reg
        .limit(limite) // cantidad de registros
        .exec((err, usuarios) => {
            if (err) {

                // al poner return corta el if
                return res.status(400).json({
                    ok: false,
                    err
                })
            };

            // Usuario.count({ estado: false }, (err, conteo) => {
            Usuario.count(condicion, (err, conteo) => {
                if (err) {

                    // al poner return corta el if
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                };
                res.json({
                    ok: true,
                    usuarios,
                    tot_registros: conteo
                });

            }); // entre llves va la condicion.. la misma del Usuario.find


        })
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    // let usuario=new Usuario();  crea una nueva instancia del schema usuario


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        // password: body.password,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {

            // al poner return corta el if
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // usuarioDB.password = null;
        // ok
        return res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

    // if (body.nombre === undefined) {

    //     res.status(400).json({
    //         ok: false,
    //         mensaje: "El nombre es necesario"
    //     })
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

});


// app.put('/usuario', (req, res) => {
//     res.json('puttt usuario');
// });


app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let body = req.body;
    // con el underscore solo selecciono los campos a actualizar

    // let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    // Usuario.findById(id, (err, usuarioDB) => {
    //     usuarioDB.save;
    // });

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    // ------- fin borrado fisico

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     // SI NO DA ERROr pero no existe el id enviado para borrar

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'El id del usuario es inexistente'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });

    // ------- fin borrado fisico

    // cambio de estado

    let cambiaEstado = {
            estado: false
        }
        // Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioDB) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    })


});


module.exports = app;