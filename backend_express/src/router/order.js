const express = require("express");
const {
  newOrder,
  admendOrder,
  deleteOrderedItem,
  cancelOrder,
  allOrder,
} = require("../controller/order");
const {
  validateSubmitOrder,
  validateParamsId,
  validateId,
} = require("../validators/inputValidate");
const { auth } = require("../middleware/auth");
const validCheck = require("../middleware/validCheck");
const router = express.Router();

router.put("/create", auth, validateSubmitOrder, validCheck, newOrder);

router.delete(
  "/delete/:id",
  auth,
  validateParamsId,
  validateId,
  deleteOrderedItem
);

router.patch("/update/:id", auth, validateParamsId, admendOrder);

router.delete("/voidorder", auth, validateParamsId, cancelOrder);

router.post("/allorder/:id", validateParamsId, allOrder);

module.exports = router;
