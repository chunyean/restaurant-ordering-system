// create API endpoint for order

const pool = require("../DB/db");

//create new row under table orders and fnb_order_lists
const newOrder = async (req, res) => {
  //add pax
  try {
    const {
      customer_id,
      table_number,
      fnb_item_list_id,
      quantity,
      order_type,
    } = req.body;

    // use table_number and customer_id to create new row of orders table
    // get the new generate order.id to create another new row at table fnb_order_lists
    const create = await pool.query(
      "insert into orders (table_number, customer_id) values ($1, $2) returning id",
      [table_number, customer_id]
    );
    const newID = create.rows[0].id;

    //use fnb_item_list_id to retrieve each individual price
    const list = await pool.query(
      "select price from fnb_item_lists where id = any($1)",
      [fnb_item_list_id]
    );
    const unitPrice = list.rows;

    // use for loop to loop the index of array
    // use index to get the data of unitPrice, quantity, fnb_item_list_id, each of it contain the same number of length of an array
    for (let index = 0; index < quantity.length; index++) {
      const price = unitPrice[index].price * quantity[index];
      await pool.query(
        "insert into fnb_order_lists (total_price, quantity, order_id, order_type, fnb_item_list_id) values ($1, $2, $3, $4, $5)",
        [price, quantity[index], newID, order_type, fnb_item_list_id[index]]
      );
    }

    res.json({ status: "ok", message: "Order has been created" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "wrong" });
  }
};

//delte individual ordered item when meet the condition of fnb_item_list_id and order_id
const deleteOrderedItem = async (req, res) => {
  try {
    await pool.query(
      "delete from fnb_order_lists where (fnb_item_list_id = $1 and order_id = $2)",
      [req.body.id, req.body.order_id]
    );

    res.json({ status: "ok", message: "Item has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

//update order quantity when meet the condition of fnb_item_list_id and order_id
const admendOrder = async (req, res) => {
  try {
    const result = await pool.query(
      "update fnb_order_lists set quantity = $1 where fnb_item_list_id = $2 and order_id = $3 returning *",
      [req.body.quantity, req.body.id, req.body.order_id]
    );
    console.log(result);
    const updated = result.rows[0];
    console.log(updated);
    res.json(updated);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await pool.query(
      "update orders set is_void_order = true where order_id = $1",
      [req.params.id]
    );
    res.json({ status: "ok", message: "order has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

module.exports = { newOrder, deleteOrderedItem, admendOrder, deleteOrder };
