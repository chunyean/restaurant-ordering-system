const pool = require("../DB/db");

const createNewItem = async (req, res) => {
  try {
    // declare all there res.body data
    const { name, description, price, photo, type, category } = req.body;

    // insert all the data into fnb_item_list
    const result = await pool.query(
      `insert into fnb_item_list (name, description, price, photo, type, category) 
    value ($1, $2, $3, $4, $5, $6)`,
      [name, description, price, photo, type, category]
    );

    //result.rows is an array, data that we insert will return at array index of 0
    const newItem = result.rows[0];
    res.json(newItem);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};
