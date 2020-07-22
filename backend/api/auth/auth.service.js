const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(username, password) {
    // console.log('service', username, password);
    logger.debug(`auth.service - login with email: ${username}`)
    if (!username || !password) return Promise.reject('email and password are required!')

    console.log('the password isisis:aaaa', password);
    const user = await userService.getByUsername(username)
        // console.log('useris', user);
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    console.log('macth is', match);
    if (!match) return Promise.reject('Invalid username or password')
    delete user.password;
    return user;
}

async function signup(user) {
    // console.log('auth-service', user);
    logger.debug(`auth.service - signup with email: ${user.email}, username: ${user.username}`)
    if (!user.email || !user.password || !user.username) return Promise.reject('email, username and password are required!')
    const hash = await bcrypt.hash(user.password, saltRounds)
    console.log('auth serviceeeeeeeeeeee password', user.password);
    // console.log('user is', user.email, user.password, user.username, user.fullName, user.imgUrl);
    let { email, password, username, fullName, imgUrl } = user
    return userService.add({ email, password: hash, username, fullName, imgUrl })
    return userService.add({ email, password: hash, username })
}

module.exports = {
    signup,
    login,
}