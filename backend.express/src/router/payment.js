const express = require("express");
const { newPayment, completedPayment } = require("../controller/payment");
const { validateParamsId } = require("../validators/inputValidate");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.put("/create/:id", auth, validateParamsId, newPayment);

router.patch("/update/:id", auth, validateParamsId, completedPayment);

module.exports = router;
