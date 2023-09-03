require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const pool = require("./src/DB/db");

const limit = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route to test the database connection
app.get("/book", async (req, res) => {
  try {
    console.log(process.env.USERNAME);
    var query = $`select * from public.city c where id = {req.params.id}`; 
    const book = await pool.query("select * from public.city c limit 1");
    res.json(book.rows);
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
