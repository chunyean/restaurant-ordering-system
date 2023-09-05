// create API endpoint for order

const pool = require("../DB/db");

const newOrder = async (req, res) => {
  try {
    const {
      customer_id,
      table_number,
      fnb_item_list_id,
      quantity,
      order_type,
      pax,
      id,
    } = req.body;

    // console.log(customer_id);
    // console.log(table_number);
    // console.log(fnb_item_list_id);
    // console.log(quantity);
    // console.log(order_type);
    // console.log(pax);

    // const price = await pool.query(
    //   "select price from fnb_item_lists where id = $1",
    //   [fnb_item_list_id]
    // );
    // console.log("ok");

    // const totalPrice = price * quantity;
    // console.log("ok3");
    const create = await pool.query(
      "insert into orders (table_number, customer_id) values ($1, $2) returning id",
      [table_number, customer_id]
    );
    console.log("ok2");
    const result = await pool.query(
      "insert into fnb_order_lists (order_id, pax, fnb_item_list_id, quantity, total_price, order_type) values ($1, $2, $3, $4, $5, $6) returning *",
      [
        create,
        pax,
        fnb_item_list_id,
        quantity,
        totalPrice,
        order_type.toUpperCase(),
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

const deleteOrderedItem = async (req, res) => {
  try {
    await pool.query("delete from fnb_order_lists where id = $1", [
      req.body.id,
    ]);
    res.json({ status: "ok", message: "item has been deleted" });
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
