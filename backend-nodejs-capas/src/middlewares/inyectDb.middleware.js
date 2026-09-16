const pool = require('../db/pool');

const inyectDb = async (req, res, next) => {
    req.db = pool;

    if (!req.db) {
        console.log('No se logro conectar el pool');
    } else {
        console.log('Inyectado el pool conexion');
    }

    next();
};


module.exports = inyectDb;