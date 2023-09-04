const pool = require("../DB/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// const { $ } = require("pg-format");

const register = async (req, res) => {
  try {
    // check for existing user anme
    const existingUsername = await pool.query(
      $`select * from customers where username = ${req.body.username}`
    );
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash the password for security and store in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // insert the customer detail into database
    const newCustomer = await pool.query(
      $`insert into customers (username, password, contact) values (${req.body.username}, ${hashedPassword}, ${req.body.contact})`
    );

    // display the last inserted record
    if (newCustomer.rows.length > 0) {
      const lastRow = newCustomer.rows[newCustomer.rows.length - 1];
      res.json(lastRow);
    } //when only one row is returned in the result
    else if (newCustomer.rows.length == 0) {
      const firstRow = newCustomer.rows[0];
      res.json(firstRow);
    } else {
      // when no rows inside the result will show error
      res.status(404).json({ error: "No rows found" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

//customer login
const login = async (req, res) => {
  try {
    const user = await pool.query(
      $`select * from customers where username = req.body.username`
    );

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (correctPassword) {
      const payload = {
        username: user.username,
        contact: user.contact,
      };

      const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
        jwtid: uuidv4(),
      });

      res.json({ access, payload });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "invalid login" });
  }
};

module.exports = { register, login };
