const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getStation, getStations, deleteStation, updateStation, addStation } = require('./station.controller')
const router = express.Router()

router.get('/', getStations);
router.get('/:id', getStation);
router.post('/', addStation);
router.put('/:id', updateStation)
router.delete('/:id', deleteStation)

module.exports = router
    // router.put('/:id', updateStation);
    // router.delete('/:id', deleteStation);