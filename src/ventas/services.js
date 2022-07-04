const { ObjectId } = require('mongodb')

const { Database } = require('../database');


const COLLECTION = 'ventas';
const COLLECTIONUSERS = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
}

const create = async (venta) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(venta);
    return result.insertedId
}

const update = async (id, venta) => {
    const collection = await Database(COLLECTION);
    let updateVenta = await collection.updateOne({_id: ObjectId(id)}, {$set: {...venta}}, { upsert : true});
    return updateVenta
}

const deleteVenta = async (id) => {
    const collection = await Database(COLLECTION);
    let delVenta = await collection.deleteOne({ _id : ObjectId(id)});
    return delVenta
}


module.exports.VentasService = {
    getAll,
    getById,
    create, 
    update,
    deleteVenta,
}