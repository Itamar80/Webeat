import userService from '../services/user-service.js'

var localLoggedinUser = null;
(sessionStorage.user) ? localLoggedinUser = JSON.stringify(sessionStorage.user): localLoggedinUser = JSON.stringify(sessionStorage.guest)
    // console.log(localLoggedinUser);


export const userStore = {
    strict: true,
    state: {
        loggedinUser: localLoggedinUser,
        users: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            console.log('store', state.loggedinUser);
            return JSON.parse(state.loggedinUser)
        }
    },
    mutations: {
        setUser(state, { user }) {
            console.log(user);
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login(context, { userCred }) {
            console.log(userCred);
            const user = await userService.login(userCred);
            context.commit({ type: 'setUser', user })
            return user;
        },
        async signup(context, { userCred }) {
            // console.log('user-store', userCred);
            const user = await userService.signup(userCred)
            context.commit({ type: 'setUser', user })
            return user;

        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setUsers', users: [] })
            context.commit({ type: 'setUser', user: null })
        },
        // async loadUsers(context) {
        //     const users = await userService.getUsers();
        //     context.commit({ type: 'setUsers', users })
        // },
        // async removeUser(context, { userId }) {
        //     await userService.remove(userId);
        //     context.commit({ type: 'removeUser', userId })
        // },
        // async updateUser(context, { user }) {
        //     user = await userService.update(user);
        //     context.commit({ type: 'setUser', user })
        // }
    }
}