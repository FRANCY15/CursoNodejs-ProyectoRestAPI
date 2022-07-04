const express = require('express');
// A continuación traermos router, nos a permitir manejar las rutas de nuestro modulo, independientemente de la aplicación.
const router = express.Router();

const { ProductsController } = require('./controller');

module.exports.ProductsAPI = (app) => {
    router
        .get('/', ProductsController.getProducts)
        .get('/report', ProductsController.generateReport)
        .get('/:id', ProductsController.getProduct)
        .post('/', ProductsController.createProduct)
        .put('/:id', ProductsController.updateProduct)
        .delete('/:id', ProductsController.deleteProduct)
    //Configura en una sola ruta todo el router
    app.use('/api/products', router)
}