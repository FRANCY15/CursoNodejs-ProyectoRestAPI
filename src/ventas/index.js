const express = require('express');
// A continuación traermos router, nos a permitir manejar las rutas de nuestro modulo, independientemente de la aplicación.
const router = express.Router();

const { VentasController } = require('./controller');

module.exports.ventasAPI = (app) => {
    router
        .get('/', VentasController.getVentas)
        .get('/:id', VentasController.getVenta)
        .post('/', VentasController.createVenta)
        .put('/:id', VentasController.updateVenta)
        .delete('/:id', VentasController.deleteVenta)
    //Configura en una sola ruta todo el router
    app.use('/api/ventas', router)
}