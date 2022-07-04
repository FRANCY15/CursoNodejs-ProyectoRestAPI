const createError = require('http-errors')
const debug = require('debug')('app:module-ventas-controller');

const { VentasService } = require('./services')
const { Response } = require('../common/response');

module.exports.VentasController = {
    getVentas: async (req, res) => {
        try {
            let ventas = await VentasService.getAll()
            Response.success(res, 200, 'Lista de ventas', ventas)
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    getVenta: async (req, res) => {
        try {
            const { params : {id} } = req;
            let venta = await VentasService.getById(id);
            if(!venta){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200, `Venta ${id}`, venta)
            }
        } catch (error) {
            Response.error(res)
        }
    },
    createVenta: async (req, res) => {
        try {
            const { body } = req;
            console.log(body)
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else {
                const insertedId = await VentasService.create(body);
                Response.success(res, 201, 'Venta agregada correctamente', insertedId)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    updateVenta: async (req, res) => {
        try {
            const { body } = req;
            const { params: {id} } = req;
            let updateVenta = await VentasService.update(id, body)
            if(!updateVenta){
                Response.error(res, new createError.NotFound())
            }else {
                Response.success(res, 200, 'Venta actualizado correctamente', Object(body));
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    deleteVenta: async (req, res) => {
        try {
            const { params: {id} } = req;
            let deleteVenta = await VentasService.deleteVenta(id);
            if(!deleteVenta){
                Response.error(res, new createError.NotFound())
            }else {
                Response.success(res, 200, 'Venta eliminado correctamente', Object(id));
            }

        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
};