// ===========
// puerto
// ===========

process.env.PORT = process.env.PORT || 3000;


// ===========
// entorno
// ===========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =======================
// Vencimiento del token
// =======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =================
// SEED del token
// =================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
// ===============
// Base de Datos
// ===============

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;

};

process.env.URLDB = urlDB;

// ===============
// Google Client ID
// ===============

process.env.CLIENT_ID = process.env.CLIENT_ID || '657805105699-45p8dvb63pqessnagri7a81av9vf7u7p.apps.googleusercontent.com';