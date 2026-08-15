const { pool } = require('../config/db');

const InyectDb = (req, res, next) => {
    req.db  = pool;
    next();
}

module.exports = { 
    InyectDb,
};