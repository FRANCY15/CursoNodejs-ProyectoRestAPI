const express = require('express');
const debug = require('debug')('app:server');

const { Config } = require('./src/config');
const { ProductsAPI } = require('./src/products');
const { UsersAPI } = require('./src/users')
const { ventasAPI } = require('./src/ventas')
const { IndexAPI, NotFoundAPI } = require('./src/index/index')
const app = express();

//le damos la capacidad de recibir datos en el cuerpo de la petición.
app.use(express.json());

IndexAPI(app);
ProductsAPI(app);
UsersAPI(app);
ventasAPI(app);
NotFoundAPI(app);

//modulos
app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
})
