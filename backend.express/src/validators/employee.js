const { body } = require("express-validator");

const validateStaffRegister = [
  body("name", "Name is required.").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 20,
    })
    .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric"),
  body("contact", "contact number is required").not().isEmpty(),
];

const validateStaffLogin = [
  body("username", "Username is required.").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 20,
    })
    .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric"),
];

module.exports = { validateStaffLogin, validateStaffRegister };
