const User = require("../../models/User");

async function getUsers() {
    const users = await  User.find()
    return users;
}

async function login({username}) {
    const user = await  User.findOne({username})
    return user;
}

async function signUp(data) {
    const newUser = await User.insertOne(data)
    console.log(newUser)
    return newUser;
}

module.exports = {
    getUsers,
    login,
    signUp
}
