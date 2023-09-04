const pool = require("../DB/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { $ } = require("pg-format");

// customer register accountc
const register = async (req, res) => {
  try {
    // check for existing user name
    const existingUsername = await pool.query(
      `select username from customers where username = $1`,
      [req.body.username]
    );
    console.log(existingUsername);
    if (existingUsername.rowCount) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash the password for security and store in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // insert the customer detail into database
    const newCustomer = await pool.query(
      `insert into customers (username, password, contact) values ($1, $2, $3)`,
      [req.body.username, hashedPassword, req.body.contact]
    );

    res.json({ status: "ok", message: "new customer created", newCustomer });

    // // display the last inserted record
    // if (newCustomer.rows.length > 0) {
    //   const lastRow = newCustomer.rows[newCustomer.rows.length - 1];
    //   res.json(lastRow);
    //   console.log(lastRow);
    // } //when only one row is returned in the result
    // else if (newCustomer.rows.length == 0) {
    //   const firstRow = newCustomer.rows[0];
    //   res.json(firstRow);
    //   console.log(firstRow);
    // } else {
    //   // when no rows inside the result will show error
    //   res.status(404).json({ error: "No rows found" });
    // }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "exit" });
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
        id: user.id,
        username: user.username,
      };

      const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
        jwtid: uuidv4(),
      });

      const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
        expiresIn: "30d",
        jwtid: uuidv4(),
      });

      res.json({ access, refresh, payload });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "invalid login" });
  }
};

// use refresh token to get new access token
const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const payload = {
      id: decoded.id,
      username: decoded.username,
    };
    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
      jwtid: uuidv4(),
    });

    res.json({ access, payload });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "token refresh error" });
  }
};

module.exports = { register, login, refresh };
