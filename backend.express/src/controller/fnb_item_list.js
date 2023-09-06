// end point created relate with all food and beverage item

const pool = require("../DB/db");

// create new F&B item
const createNewItem = async (req, res) => {
  try {
    // declare all the res.body data
    const { name, description, price, photo, type, category } = req.body;

    // insert all the data into fnb_item_list
    const result = await pool.query(
      "insert into fnb_item_lists (name, description, price, photo, type, category) values ($1, $2, $3, $4, $5, $6) returning *",
      [
        name,
        description,
        price,
        photo,
        type.toUpperCase(),
        category.toUpperCase(),
      ]
    );

    //result.rows is an array, data that we insert will return at array index of 0
    const newItem = result.rows;
    res.json(newItem);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

// retrieve all the data filter by different categories, using req.body.value
const categoryItem = async (req, res) => {
  try {
    const result = await pool.query(
      "select * from fnb_item_lists where category = $1",
      [req.body.value.toUpperCase()]
    );
    const list = result.rows;
    console.log(result);
    res.json(list);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

// retrieve individual F&B data by using ID
const singleItem = async (req, res) => {
  try {
    const result = await pool.query(
      "select * from fnb_item_lists where id = $1",
      [req.params.id]
    );
    const item = result.rows[0];
    res.json(item);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

// all the information is linked with another so cannot hard delete
// here's the soft delete created
// change isDeleted status to true
const softdelete = async (req, res) => {
  try {
    await pool.query(
      "update fnb_item_lists set is_deleted = true where id = $1",
      [req.params.id]
    );
    res.json({ status: "ok", message: "item has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

// update all the F&B item information
const updateItem = async (req, res) => {
  try {
    const { name, description, price, photo } = req.body;
    const result = await pool.query(
      "update fnb_item_lists set name=$2, description=$3, price=$4, photo=$5 where id = $1 returning *",
      [req.params.id, name, description, price, photo]
    );
    const update = result.rows[0];
    res.json(update);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

module.exports = {
  createNewItem,
  categoryItem,
  singleItem,
  softdelete,
  updateItem,
};
