//Se configura la conexion a la base de datos, luego de haberla creado
const {DB_USER,DB_PASSWORD,DB_HOST,DB_DATABASE} = require('./config')
module.exports = {
    database: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    }
};