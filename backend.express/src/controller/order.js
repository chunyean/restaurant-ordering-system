// create API endpoint for order

const pool = require("../DB/db");

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

    // use for loop to get index of array
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

const deleteOrderedItem = async (req, res) => {
  try {
    const result = await pool.query(
      "delete from fnb_order_lists join orders where orders.id = order_id and fnb_item_list_id = $1 and table_number = $2",
      [[req.body.id, req.body.table_number]]
    );

    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

const admendOrder = async (req, res) => {
  try {
    const result = await pool.query(
      "update fnb_order_lists set quantity = $1 where id = req.params.id returning *",
      [req.body, quntity]
    );

    const updated = result.rows[0];
    res.json(updated);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await pool.query("update orders set is_void_order = true where id = $1", [
      req.params.id,
    ]);
    res.json({ status: "ok", message: "order has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

module.exports = { newOrder, deleteOrderedItem, admendOrder, deleteOrder };
