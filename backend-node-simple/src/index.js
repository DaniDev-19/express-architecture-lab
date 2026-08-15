require('dotenv').config();
const app = require('./app');
const { conexDB } = require('./config/db');

const PORT = process.env.PORT || 4000

const startServer = async () => {
    try{

        await conexDB();
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en http://localhost:${PORT}`);
    });
    }catch(error){
        console.error('Hay un error al levantar el servicio', error);
    }
}

startServer();

