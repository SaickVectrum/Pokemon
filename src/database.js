//Se trae el modulo de mysql para poder conectarse la base de datos
const mysql = require('mysql');

//Este metodo permite que la conexion resista promesas
const { promisify } = require('util');

//Se trae la configuracion de la base de datos
const {database} = require('./keys');

//Pool permite que se realicen varias tareas o peticiones a la vez, evitando errores a gran escala.
const pool = mysql.createPool(database);

//Cuando se llame este modulo en otro para realizar peticiones, devolvera un error o una correcta conexion 
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected');
    return
});

//Convierte promesas lo que antes era callbacks
pool.query = promisify(pool.query);

module.exports = pool;

