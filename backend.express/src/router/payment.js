const express = require("express");
const { newPayment, completedPayment } = require("../controller/payment");
const router = express.Router();

router.put("/create/:id", newPayment);

router.patch("/update/:id", completedPayment);

module.exports = router;
