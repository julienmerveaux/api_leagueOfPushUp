const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_SECRET_KEY;

function authMiddleware(req, res, next) {
    let token = trySwaggerAuth(req)

    if (token === null) {
        token = req.cookies.authorization;
    }

    if (token == null) {
        return res.status(401).send("Unauthorized: Token has expired")
    }
    jwt.verify(token, privateKey, (err, payload) => {
        if (err) {
            return res.status(401).send("Unauthorized: Invalid token");
        }
        req.user = payload;
        next();
    })
}

function trySwaggerAuth(req) {
    const authHeader = req.headers["authorization"];
    if(authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }
    return null;
}

module.exports = {
    auth: authMiddleware,
    privateKey
}