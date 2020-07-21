const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
        query,
        getById,
        remove,
        update,
        add
    }
    // filterBy = {},
    //add filterBy
async function query(filterBy = {}) {
    // console.log('query service... ', filterBy);
    const criteria = _buildCriteria(filterBy.name_like, filterBy.genre_like)
    const collection = await dbService.getCollection('station')
        // console.log('criteriaaaa', criteria);
    try {
        const stations = await collection.find(criteria).toArray();
        return stations
    } catch (err) {
        console.log('ERROR: cannot find stations')
        throw err;
    }
}

async function getById(stationId) {
    const collection = await dbService.getCollection('station')
    try {
        const station = await collection.findOne({ "_id": ObjectId(stationId) })
            // station.givenReviews = await reviewService.query({bystationId: ObjectId(station._id) })
            // station.givenReviews = station.givenReviews.map(review => {
            //     delete review.bystation
            //     return review
            // })
        return station
    } catch (err) {
        console.log(`ERROR: while finding station ${stationId}`)
        throw err;
    }
}

async function remove(stationId) {
    const collection = await dbService.getCollection('station')
    try {
        await collection.deleteOne({ "_id": ObjectId(stationId) })
    } catch (err) {
        console.log(`ERROR: cannot remove station ${stationId}`)
        throw err;
    }
}

async function update(station) {
    const collection = await dbService.getCollection('station')
    const strId = station._id
    const _id = ObjectId(strId)
    delete station._id
        // station._id = ObjectId(station._id);
    try {
        await collection.replaceOne({ _id }, { $set: station })
        return station
    } catch (err) {
        console.log(`ERROR: cannot update station ${ _id}`)
        throw err;
    }
}

async function add(station) {
    const collection = await dbService.getCollection('station')
    try {
        await collection.insertOne(station);
        return station;
    } catch (err) {
        console.log(`ERROR: cannot insert station`)
        throw err;
    }
}

function _buildCriteria(filterByName, genre) {
    const criteria = {};
    if (genre) {
        criteria.genre = genre
    }
    if (filterByName) {
        criteria.name = { $regex: new RegExp(filterByName, 'i') }
            // criteria.name = filterByName
    }
    console.log('station.service criteria:', criteria)
    return criteria;
}