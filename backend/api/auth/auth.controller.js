const authService = require('./auth.service')
const logger = require('../../services/logger.service')
const session = require('express-session')
const userService = require('../user/user.service')


async function login(req, res) {
    console.log(req.body);
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
    try {
        const { email, password, username } = req.body
        const userCred = req.body
        console.log(req.body);
        logger.debug(userCred.email + ", " + userCred.username + ', ' + userCred.password)
        const account = await authService.signup(userCred)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(userCred.email, userCred.password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout,
}