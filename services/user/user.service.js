const User = require("../../queries/user/user.queries");

async function getUsers() {
    return await User.getUsers()
}

async function login(data) {
    const {username} = data;
    return await User.login({username});
}

async function signUp(data) {
    return await User.signUp(data);
}

module.exports = {
    getUsers,
    login,
    signUp
}