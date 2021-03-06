import HttpService from './HttpService'
import { storageService } from './storage.service.js'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    setUser
}

function getById(userId) {
    return HttpService.get(`user/${userId}`)
}

function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    try {
        const user = await HttpService.post('auth/login', userCred)
        return _handleLogin(user)
    } catch (err) {
        console.log('login err', err);
    }
}
async function signup(userCred) {
    try {
        console.log('user-service', userCred);
        await HttpService.post('auth/signup', userCred)
        return _handleLogin(userCred)
    } catch (err) {
        console.log('logout error', err);
    }
}

function setUser() {
    return _handleLogin()
}

async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

function getUsers() {
    return HttpService.get('user')
}

function _handleLogin(user) {
    let guest = { _id: _makeId(), fullName: 'Guest', imgUrl: '@/assets/default-guest.jpg' }
    if (!user) {
        storageService.storeToSession('guest', guest)
    } else {
        sessionStorage.removeItem('guest')
        storageService.storeToSession('user', user)
    }
    return user;
}

function _makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}