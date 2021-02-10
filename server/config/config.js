// ===========
// puerto
// ===========

process.env.PORT = process.env.PORT || 3000;


// ===========
// entorno
// ===========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============
// Base de Datos
// ===============

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://cafe-user:MeJfe4V6bApp6x7w@cluster0.wgaaf.mongodb.net/cafe?retryWrites=true&w=majority'
};

process.env.URLDB = urlDB;