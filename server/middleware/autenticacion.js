//======================================
// jwt
//======================================

const jwt = require('jsonwebtoken');
//======================================
// Verifica Token 
//======================================
let verificaToken = (req, res, next) => {

    let token = req.get('token'); // esta esta en postman.. en header, el get me permite leer los headers"token"

    jwt.verify(token, process.env.SEED, (err, decoded) => { // en decoded esta todo el payload del token 

        if (err) {

            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        };
        req.usuario = decoded.usuario;
        next();
    })

};

//======================================
// Verifica Admin_Role
//======================================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

    //req.usuario = decoded.usuario;

};

// module.exports = { verificaToken };


module.exports = {
    verificaToken,
    verificaAdmin_Role
};