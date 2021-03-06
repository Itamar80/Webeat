const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(username, password) {
    logger.debug(`auth.service - login with email: ${username}`)
    if (!username || !password) return Promise.reject('email and password are required!')
    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')
    delete user.password;
    return user;
}

async function signup(user) {
    logger.debug(`auth.service - signup with email: ${user.email}, username: ${user.username}`)
    if (!user.email || !user.password || !user.username) return Promise.reject('email, username and password are required!')
    const hash = await bcrypt.hash(user.password, saltRounds)
    let { email, password, username, fullName, imgUrl } = user
    return userService.add({ email, password: hash, username, fullName, imgUrl })
    return userService.add({ email, password: hash, username })
}

module.exports = {
    signup,
    login,
}