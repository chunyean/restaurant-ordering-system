const { body, param } = require("express-validator");

const validateId = [
  body("id", "id is required").not().isEmpty(),
  body("id", "id is invalid").isLength({
    min: 36,
    max: 36,
  }),
];

const validateParamsId = [
  param("id", "id is invalid").isLength({ min: 5, max: 7 }),
];

const validateSubmitOrder = [
  body("table_number", "Table number is required").not().isEmpty(),
  body("table_number", "Table number shouldn't over 12").isLength({
    min: 1,
    max: 12,
  }),
  body("pax", "Number of pax is required").not().isEmpty(),
  body("pax", "Number of pax shouldn't over 10pax").isLength({
    min: 1,
    max: 10,
  }),
];

const validateDataInput = [
  body("name", "Name of food or beverage is required").not().isEmpty(),
  body("name", "Character cannot over then 100").isLength({
    max: 100,
  }),
  body("description", "Descrition is required").not().isEmpty(),
  body("price", "price is required").not().isEmpty(),
  body("price", "price cannot over $9999.99").isFloat({ max: 9999.99 }),
];

module.exports = {
  validateDataInput,
  validateId,
  validateParamsId,
  validateSubmitOrder,
};
