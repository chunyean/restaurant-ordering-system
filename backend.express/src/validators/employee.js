const { body } = require("express-validator");

const validateStaffRegister = [
  body("name", "Name is required.").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 20,
    }),
  body("contact", "contact number is required").not().isEmpty(),
];

const validateStaffLogin = [
  body("id", "ID is required.").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 20,
    }),
];

module.exports = { validateStaffLogin, validateStaffRegister };
