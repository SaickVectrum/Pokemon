//se trae el metodo condig del dotenv para manejar variables de entorno
const {config} = require('dotenv');
//Ejecución de config
config()
//Definición de las variables de entorno
const PORT = process.env.PORT || 3000
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'vec12#mert05'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_DATABASE = process.env.DB_DATABASE || 'database_pruebausers'
//Se exportan para configurar las conexiones al puerto y base de datos
module.exports = {PORT,DB_USER,DB_PASSWORD,DB_HOST,DB_DATABASE}
