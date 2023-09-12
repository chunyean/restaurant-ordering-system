require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const pool = require("./src/DB/db");

// define all the routes
const customer = require("./src/router/customer");
const employee = require("./src/router/employee");
const fnbList = require("./src/router/fnb_item_list");
const order = require("./src/router/order");
const payment = require("./src/router/payment");

//set limit for the number of request
// const limit = rateLimit({
//   windowMs: 15 * 60 * 1000, //15 min
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

const app = express();

app.use(cors());
app.use(helmet());
// app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use the routes
app.use("/customer", customer);
app.use("/employee", employee);
app.use("/item", fnbList);
app.use("/order", order);
app.use("/payment", payment);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
