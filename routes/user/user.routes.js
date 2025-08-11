const getUserController = require("../../controllers/user/user.controller");

const express = require("express");
const router = express.Router();

router.get("/getUsers", getUserController.getUsers);




module.exports = router;