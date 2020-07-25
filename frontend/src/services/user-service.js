import HttpService from './HttpService'

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
        console.log('user-service user is', user);
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
    let guest = { _id: _makeId(), fullName: 'Guest' }
    if (!user) sessionStorage.setItem('guest', JSON.stringify(guest))
    else {
        sessionStorage.removeItem('guest')
        sessionStorage.setItem('user', JSON.stringify(user))
    }
    return user;
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}