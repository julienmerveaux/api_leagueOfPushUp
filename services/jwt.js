const crypto = require("crypto");
const jwt = crypto.randomBytes(32).toString("hex");
console.log(`JWT_SECRET_KEY=${jwt}`);
