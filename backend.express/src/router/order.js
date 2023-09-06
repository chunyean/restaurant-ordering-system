const express = require("express");
const {
  newOrder,
  admendOrder,
  deleteOrderedItem,
  deleteOrder,
} = require("../controller/order");
const router = express.Router();

router.put("/create", newOrder);

router.delete("/delete", deleteOrderedItem);

router.patch("/update", admendOrder);

router.delete("/voidOrder/:id", deleteOrder);

module.exports = router;
