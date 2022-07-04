require('dotenv').config();
//Configuración de las variables de entorno. Aquí almacenamos todas las variables que necesitemos en nuestro proyecto.

//Nos permite exportar este archivo para posteriormente importarlo encualquier otro.
module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME
}