const UserService = require("../../services/user/user.service");
const controllCallBack = require("../controllerCallback");
const dataMiddleware = require("../../middlewares/auth.middleware");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {privateKey} = require("../../middlewares/auth.middleware");


async function getUsers(req, res) {
    try {
        const data = await UserService.getUsers()
        controllCallBack(res, data, null)
    }catch (error) {
        controllCallBack(res, null, error)
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        // dataMiddleware.checkRequired(username, password);
        // dataMiddleware.checkType.isString(username, password);
        let user = await UserService.login({username});

        if (!user || !bcrypt.compareSync(password, user.password)) return res.status(500).json("Nom d'utilisateur ou mot de passe incorrect.");

        const expiresIn = 3600;
        const accessToken = jwt.sign({id_user: user.id_user}, privateKey, {expiresIn: expiresIn});
        res.cookie("authorization", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === 'production',
            maxAge: expiresIn * 1000
        });

        return res.status(200).json({ ...user.toObject(), password: undefined });
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

async function signUp(req, res) {
    try {
        const data = req.body;
        console.log(data);
        if (!data.username || !data.password) {
            return res.status(400).json("Nom d'utilisateur et mot de passe requis.");
        }
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        let user = await UserService.signUp({
            ...data,
            password: hashedPassword
        });


        return res.status(200).send({...user, password: undefined});
    } catch (e) {
        return res.status(500).json(e.message);
    }
}






module.exports = {
    getUsers,
    login,
    signUp
};