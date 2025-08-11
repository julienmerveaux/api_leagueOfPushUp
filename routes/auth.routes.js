const getUserController = require("../controllers/user/user.controller");

const express = require("express");
const router = express.Router();


router.post("/login", getUserController.login);
router.post("/register", getUserController.signUp);



module.exports = router;