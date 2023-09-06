const express = require("express");
const {
  newOrder,
  admendOrder,
  deleteOrderedItem,
  deleteOrder,
  allOrder,
} = require("../controller/order");
const router = express.Router();

router.put("/create", newOrder);

router.delete("/delete/:id", deleteOrderedItem);

router.patch("/update/:id", admendOrder);

router.delete("/voidorder/:id", deleteOrder);

router.get("/allorder/:id", allOrder);

module.exports = router;
