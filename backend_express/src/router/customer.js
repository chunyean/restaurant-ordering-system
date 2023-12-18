const express = require("express");
const { register, login } = require("../controller/customer");
const {
  validateCustRegisterData,
  validateCustLogin,
} = require("../validators/customer");
const validCheck = require("../middleware/validCheck");
const router = express.Router();

router.put("/register", validateCustRegisterData, validCheck, register);

router.post("/login", validateCustLogin, login);



module.exports = router;
