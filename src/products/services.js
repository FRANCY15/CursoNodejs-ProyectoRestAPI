const { ObjectId } = require('mongodb')

const { Database } = require('../database');

const { ProductsUtils } = require('./utils')

const COLLECTION = 'products';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId
}

const update = async (id, product) => {
    const collection = await Database(COLLECTION);
    let updateProduct = await collection.updateOne({_id: ObjectId(id)}, {$set: {...product}}, { upsert : true});
    return updateProduct
}

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    let delProduct = await collection.deleteOne({ _id : ObjectId(id)});
    return delProduct
}

const generateReport = async(name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res)

}

module.exports.ProductsService = {
    getAll,
    getById,
    create, 
    update,
    deleteProduct,
    generateReport
}