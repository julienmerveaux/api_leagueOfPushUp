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
    const data2 = {
        ...data,
        puuid : "v5_J1K8FgL9I0B7cWfH2DqRtXzyQWErTYuiOpLkjhGFdsAzXcvBNm12345qwertyuiop"
    }
    const newUser = await User.insertOne(data2)
    console.log(newUser)
    return newUser;
}

module.exports = {
    getUsers,
    login,
    signUp
}
