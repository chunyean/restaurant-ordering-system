const express = require("express");
const {
  createNewItem,
  categoryItem,
  singleItem,
  softdelete,
  updateItem,
} = require("../controller/fnb_item_list");
const router = express.Router();

router.put("/create", createNewItem);

router.get("/category", categoryItem);

router.post("/getItem/:id", singleItem);

router.delete("/delete/:id", softdelete);

router.patch("/update/:id", updateItem);

module.exports = router;
