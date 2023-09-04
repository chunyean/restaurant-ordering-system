const express = require("express");
const { register, login, nextAvaiId } = require("../controller/employee");
const router = express.Router();

router.put("/register", register);

router.post("/login", login);

router.get("/nextAvaiId", nextAvaiId);

module.exports = router;
