const express = require("express");
const { register, login, refresh } = require("../controller/customer");
const router = express.Router();

router.put("/register", register);

router.post("/login", login);

router.post("/refresh", refresh);

module.exports = router;
