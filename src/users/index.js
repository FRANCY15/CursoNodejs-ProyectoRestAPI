const express = require('express');
// A continuación traermos router, nos a permitir manejar las rutas de nuestro modulo, independientemente de la aplicación.
const router = express.Router();

const { UsersController } = require('./controller');

module.exports.UsersAPI = (app) => {
    router
        .get('/', UsersController.getUsers)
        .get('/:id', UsersController.getUser)
        .post('/', UsersController.createUser)
        .put('/:id', UsersController.updateUser)
        .delete('/:id', UsersController.deleteUser)
    //Configura en una sola ruta todo el router
    app.use('/api/users', router)
}