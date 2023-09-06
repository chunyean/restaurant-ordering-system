const pool = require("../DB/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// customer register accountc
const register = async (req, res) => {
  try {
    // check for existing user name
    const existingUsername = await pool.query(
      "select username from customers where username = $1",
      [req.body.username]
    );

    // if rowCount is not 0, then username already exists
    if (existingUsername.rowCount) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash the password for security and store in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // insert the customer detail into database
    await pool.query(
      "insert into customers (username, password, contact) values ($1, $2, $3)",
      [req.body.username, hashedPassword, req.body.contact]
    );

    res.json({ status: "ok", message: "new customer created" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

//customer login
const login = async (req, res) => {
  try {
    // retrieve customer detail by using username
    const result = await pool.query(
      "select * from customers where username = $1",
      [req.body.username]
    );

    if (!result) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const user = result.rows[0];
    // compare req.body.password with db password
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
