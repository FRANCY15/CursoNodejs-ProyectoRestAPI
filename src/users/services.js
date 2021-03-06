const { ObjectId } = require('mongodb')

const { Database } = require('../database');


const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
}

const create = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId
}

const update = async (id, user) => {
    const collection = await Database(COLLECTION);
    let updateUser = await collection.updateOne({_id: ObjectId(id)}, {$set: {...user}}, { upsert : true});
    return updateUser
}

const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    let delUser = await collection.deleteOne({ _id : ObjectId(id)});
    return delUser
}


module.exports.UsersService = {
    getAll,
    getById,
    create, 
    update,
    deleteUser,
}