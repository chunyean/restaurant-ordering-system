const pool = require("../DB/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// employee register account
const register = async (req, res) => {
  try {
    // hash the password for security and store in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // insert the customer detail into database
    const newEmployee = await pool.query(
      $`insert into employees (name, password, contact) values (${req.body.name}, ${hashedPassword}, ${req.body.contact})`
    );

    // display the last inserted record
    if (newEmployee.rows.length > 0) {
      const lastRow = newEmployee.rows[newEmployee.rows.length - 1];
      res.json(lastRow);
    } //when only one row is returned in the result
    else if (newEmployee.rows.length == 0) {
      const firstRow = newEmployee.rows[0];
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

// get next available employee id for registration
const nextAvaiId = async (req, res) => {
    try {
        //increase the sequence by 1
        await pool.query("SELECT nextval('employee_id_seq')");
        
        // retrieve the next available id
        const result = await pool.query("SELECT 'SEI' || currval('employee_id_seq') AS next_id");
        res.json(result.rows[0].next_id);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ status: "error", message: error.message });
    }
}

// employee login
const login = async (req, res) => {
  try {
    const employee = await pool.query(
      $`select * from employees where id = req.body.employee_id`
    );

    if (!employee) {
      return res.status(400).json({ message: "ID does not exist" });
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      employee.password
    );

    if (correctPassword) {
      const payload = {
        id: employee.id,
        name: employee.name
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
            name: decoded.name
        };
        const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: "1d",
            jwtid: uuidv4()
        })

        res.json({access, payload})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ status: "error", message: "token refresh error" });
        
    }
}

module.exports = { register, nextAvaiId, login, refresh };