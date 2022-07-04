// Este archivo nos a permitir exportar una fn que nos devuela la conexión a la base de datos y a partir de allí nosotros poder trabajar en cada uno de los servicios del módulo

// Cliente que nos ayuda a conectarnos con el servidor de mongo Atlas
const { MongoClient } = require('mongodb');
//imprimir salidas en la terminal
const debug = require('debug')('app:module-database')

//mongodb: es una base de datos no relacional, es bd documental, colecciones de datos con documentos. La infomación se almacena como Json.

const { Config } = require('../config')

let connection = null;

module.exports.Database = (collection) => new Promise (async(resolve, reject) => {
    try {
        if(!connection){
            const client = new MongoClient(Config.mongoUri);
            connection = await client.connect();
            debug('Nueva conexión realizada con MongoDB Atlas')
        }
        //le doy la indicación que debo conectarme a una bd mediante esta conexión
        debug('Reutilizando conexión')
        const db = connection.db(Config.mongoDbname);
        resolve(db.collection(collection))
    } catch (error) {
        reject(error);
    }
})