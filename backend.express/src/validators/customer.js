const { body } = require("express-validator");

const validateCustRegisterData = [
  body("username", "Username is required.").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 20,
    }),
  body("contact", "contact number is required").not().isEmpty(),
];

const validateCustLogin = [
  body("username", "Username is required.").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 20,
    }),
];

module.exports = { validateCustLogin, validateCustRegisterData };
