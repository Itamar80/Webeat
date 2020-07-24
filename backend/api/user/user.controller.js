const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}

async function getUsers(req, res) {
    const users = await userService.query(req.query)
    logger.debug(users);
    res.send(users)
}
async function signup(req, res) {
    let user = req.body
    console.log('user-controller:', user);
    await userService.signup(user)
    res.json(user)
}
async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {
    const user = req.body;
    await userService.update(user)
    res.send(user)
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    signup
}