// end point created relate with all food and beverage item

const pool = require("../DB/db");

// create new F&B item
const createNewItem = async (req, res) => {
  try {
    // declare all the res.body data
    const { name, description, price, photo, type, category } = req.body;

    // insert all the data into item
    const result = await pool.query(
      "insert into items (name, description, price, photo, type, category) values ($1, $2, $3, $4, $5, $6) returning *",
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
    const result = await pool.query("select * from items where category = $1", [
      req.body.value,
    ]);
    const list = result.rows;
    res.json(list);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

//soft delete for each item
const softdelete = async (req, res) => {
  try {
    await pool.query("update items set isdeleted = true where id = $1", [
      req.params.id,
    ]);
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
      "update items set name=$2, description=$3, price=$4, photo=$5 where id = $1 returning *",
      [req.params.id, name, description, price, photo]
    );
    const update = result.rows[0];
    res.json(update);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

//place order to cart
const addOrder = async (req, res) => {
  try {
    //insert data into table carts
    await pool.query(
      "insert into carts (item_id, quantity, customer_id) values ($1, $2, $3)",
      [req.params.id, req.body.quantity, req.custID]
    );

    //take out data from table items
    const price = await pool.query(
      "select name, price from items where id = $1",
      [req.params.id]
    );
    const list = price.rows[0];

    //update cart
    await pool.query(
      "update carts set unit_price = $1, name = $2 where item_id = $3",
      [list.price, list.name, req.params.id]
    );

    res.json({ status: "success", message: "add successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

//retrieve data from cart plus sum up quantity and nett_amount
const cartOrder = async (req, res) => {
  try {
    const cartDetail = await pool.query(
      "select item_id, name, unit_price, sum(quantity) as quantity, sum(nett_amount) as nett_amount from carts where customer_id = $1 group by item_id, name, unit_price",
      [req.custID]
    );
    const list = cartDetail.rows;

    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

//check the total quantity of cart
const lengthOfCart = async (req, res) => {
  try {
    console.log("hi");
    const cart = await pool.query(
      "select sum(quantity) as quantity from carts where customer_id=$1",
      [req.custID]
    );
    console.log("hi2");
    const number = cart.rows[0].quantity;
    console.log("hi3");
    res.json(number);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

//delete each item inside the card
const deleteCartItem = async (req, res) => {
  console.log("Delete carts item called");
  console.log(req.params.id);
  try {
    await pool.query(
      "delete from carts where (item_id = $1 and customer_id=$2)",
      [req.params.id, req.custID]
    );
    res.json({ status: "okay", message: "item has been deleted from carts " });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// update each item quantity at cart
// delete first then re-create
const updateQuantity = async (req, res) => {
  try {
    await pool.query("delete from carts where item_id = $1", [req.params.id]);

    await pool.query(
      "insert into carts (item_id, quantity, unit_price, name, customer_id) values ($1,$2,$3, $4, $5)",
      [
        req.params.id,
        req.body.quantity,
        req.body.unit_price,
        req.body.name,
        req.custID,
      ]
    );
    res.json({ status: "okay", message: "item has been updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createNewItem,
  categoryItem,
  // singleItem,
  softdelete,
  updateItem,
  addOrder,
  cartOrder,
  lengthOfCart,
  updateQuantity,
  deleteCartItem,
};
