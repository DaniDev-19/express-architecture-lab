const { Pool } = require("pg");
const db = require("./config");

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database
});

const conexDB = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    if (result.rowCount > 0) {
      console.log("Conexión exitosa", result.rows[0].now);
    } else {
      console.error("Conexión exitosa, sin filas en la base de datos");
    }
  } catch(error) {
    console.error("No se puedo conectar al servicio de PostgreSQL", error);
    process.exit(1);
  }
};

module.exports = {
  pool,
  conexDB,
};
