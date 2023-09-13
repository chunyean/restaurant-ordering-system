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
    await pool.query(
      "insert into employees (name, password, contact) values ($1, $2, $3)",
      [req.body.name, hashedPassword, req.body.contact]
    );

    res.json({ status: "ok", message: "new employee created" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

// get next available employee id for registration
const nextAvaiId = async (req, res) => {
  try {
    //increase the sequence by 1
    await pool.query("select nextval('employee_id_seq')");

    // retrieve the next available id
    // as next_id is give a name to the result column 
    const result = await pool.query(
      "select 'SEI' || currval('employee_id_seq') as next_id"
    );
    console.log(result)
    res.json(result.rows[0].next_id);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// employee login
const login = async (req, res) => {
  try {
    const result = await pool.query("select * from employees where id = $1", [
      req.body.id,
    ]);

    if (!result) {
      return res.status(400).json({ message: "ID does not exist" });
    }
    console.log(result);
    const employee = result.rows[0];
    const correctPassword = await bcrypt.compare(
      req.body.password,
      employee.password
    );

    if (correctPassword) {
      const payload = {
        staffID: employee.id,
        username: employee.name,
        custID: 99999
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

const deleteEmployee = async (req, res) => {
  try {
    await pool.query("update employees set is_resigned = true where id = $1", [
      req.params.id,
    ]);
    res.json({ status: "ok", message: "This employee has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "invalid login" });
  }
};

module.exports = { register, nextAvaiId, login, deleteEmployee };
