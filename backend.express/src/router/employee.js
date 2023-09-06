const express = require("express");
const {
  register,
  login,
  nextAvaiId,
  deleteEmployee,
} = require("../controller/employee");
const {
  validateStaffRegister,
  validateStaffLogin,
} = require("../validators/employee");
const { validateParamsId } = require("../validators/inputValidate");
const router = express.Router();
const validCheck = require("../middleware/validCheck");

router.put("/register", validateStaffRegister, validCheck, register);

router.post("/login", validateStaffLogin, validCheck, login);

router.get("/nextAvaiId", nextAvaiId);

router.delete("/delete/:id", validateParamsId, deleteEmployee);

module.exports = router;
