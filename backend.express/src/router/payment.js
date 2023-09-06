const express = require("express");
const { newPayment, completedPayment } = require("../controller/payment");
const router = express.Router();

router.put("/create", newPayment);

router.patch("/update", completedPayment);

module.exports = router;
