const pool = require("../DB/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// customer register accountc
const register = async (req, res) => {
  try {
    // check for existing user name
    const existingUsername = await pool.query(
      `select username from customers where username = $1`,
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
      `insert into customers (username, password, contact) values ($1, $2, $3)`,
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
    const user = await pool.query(
      `select * from customers where username = $1`,
      [req.body.username]
    );

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const result = user.rows[0];
    // compare req.body.password with db password
    const correctPassword = await bcrypt.compare(
      req.body.password,
      result.password
    );

    if (correctPassword) {
      const payload = {
        id: result.id,
        username: result.username,
      };

      const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
        jwtid: uuidv4(),
      });

      const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
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
    // decoded refresh token
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
