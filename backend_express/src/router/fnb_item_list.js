const express = require("express");
const {
  createNewItem,
  categoryItem,
  singleItem,
  softdelete,
  updateItem,
  addOrder,
  cartOrder,
  lengthOfCart,
  deleteCartItem,
  updateQuantity,
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

router.delete("/delete/:id", auth, validateParamsId, softdelete);

router.put("/addorder/:id", auth, addOrder);

router.get("/cart",auth, cartOrder);

router.post("/length", auth, lengthOfCart);

router.delete("/deletecartiem/:id", auth, deleteCartItem);

router.patch("/updatecartitem/:id", auth, updateQuantity);

router.patch(
  "/update/:id",
  auth,
  validateParamsId,
  validCheck,
  validateDataInput,
  updateItem
);

module.exports = router;
