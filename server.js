console.clear()
require('dotenv').config();
require("./database/config/connection")
const authMiddleware = require("./middlewares/auth.middleware");
const express = require("express")
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");

const PORT_API = process.env.PORT_API
const ORIGIN = process.env.ORIGIN || "http://localhost:8080"


const getUserRoute = require("./routes/user/user.routes")
const getAuthRoute = require("./routes/auth.routes")


app.use(cors({
    origin: [ORIGIN],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/user",  authMiddleware.auth, getUserRoute);
app.use("/api", getAuthRoute);

app.all("*splat", (req, res) => {
    return res.status(404).send({
        status: 404,
        success: 0,
        data: 'send 404',
    })
})


app.listen(PORT_API, () => {
    console.log('http://localhost:3000/api/')
    console.log(`${ORIGIN}/ `)
})