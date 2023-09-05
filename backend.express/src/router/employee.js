const express = require("express");
const {
  register,
  login,
  nextAvaiId,
  refresh,
} = require("../controller/employee");
const router = express.Router();

router.put("/register", register);

router.post("/login", login);

router.get("/nextAvaiId", nextAvaiId);

router.post("/refresh", refresh);

module.exports = router;
