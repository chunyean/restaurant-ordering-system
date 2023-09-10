const express = require("express");
const {
  createNewItem,
  categoryItem,
  singleItem,
  softdelete,
  updateItem,
  addOrder,
  cartOrder,
  lengthOfCart
} = require("../controller/fnb_item_list");
const {
  validateDataInput,
  validateParamsId,
} = require("../validators/inputValidate");
const validCheck = require("../middleware/validCheck");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.put("/create", auth, validateDataInput, validCheck, createNewItem);

router.post("/category", categoryItem);

router.post("/getItem/:id", validateParamsId, singleItem);

router.delete("/delete/:id", auth, validateParamsId, softdelete);

router.put('/addorder/:id', addOrder)

router.get('/cart', cartOrder)

router.get('/length', lengthOfCart)

router.patch(
  "/update/:id",
  auth,
  validateParamsId,
  validCheck,
  validateDataInput,
  updateItem
);

module.exports = router;
