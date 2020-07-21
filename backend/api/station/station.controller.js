const stationService = require('./station.service')
const logger = require('../../services/logger.service')

async function getStation(req, res) {
    const station = await stationService.getById(req.params.id)
    res.json(station)
}

// async function getStations(req, res) {
//     const stations = await stationService.query(req.query)
//     logger.debug(stations);
//     res.json(stations)
// }

async function getStations(req, res) {
    try {
        const stations = await stationService.query(req.query)
        logger.debug(stations);
        res.send(stations)

    } catch (err) {
        throw err;
    }
}

async function deleteStation(req, res) {
    await stationService.remove(req.params.id)
    res.end()
}

async function updateStation(req, res) {
    const station = req.body;
    await stationService.update(station)
    res.json(station)
}

async function addStation(req, res) {
    const station = req.body;
    await stationService.add(station)
    res.json(station)
}

module.exports = {
    getStation,
    getStations,
    deleteStation,
    updateStation,
    addStation
}