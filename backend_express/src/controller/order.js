// create controller for order

const pool = require("../DB/db");

//create new row under table orders and order_lists
const newOrder = async (req, res) => {
  try {
    const { table_number, order_type, pax } = req.body;
    console.log(req.staffID);
    // use table_number and customer_id to create new row under orders table
    // get the new generate order.id to create another new row under table order_lists
    let create;
    console.log("1");
    if (String(req.staffID).includes("SEI")) {
      create = await pool.query(
        "insert into orders (table_number,employee_id, customer_id, pax) values ($1, $2, $3, $4) returning id",
        [table_number, req.staffID, req.custID, pax]
      );
    } else {
      create = await pool.query(
        "insert into orders (table_number,customer_id, pax) values ($1, $2, $3) returning id",
        [table_number, req.custID, pax]
      );
    }
    const newID = create.rows[0].id;
    console.log("2");
    //use item_id to retrieve each individual unit price
    const list = await pool.query(
      `select item_id, name, sum(quantity) as quantity, sum(nett_amount ) as nett_amount, unit_price from cart where customer_id= $1 group by item_id, name, unit_price`,
      [req.custID]
    );
    const unitPrice = list.rows;
    console.log(unitPrice);
    // use for loop for array of quantity
    // use index to get the data of unitPrice, quantity, item_id, each of it contain the same number of length of an array
    // after that insert all into tableorder_lists
    for (let idx = 0; idx < unitPrice.length; idx++) {
      await pool.query(
        "insert into order_lists (total_price, quantity, order_id, order_type, item_id, unit_price) values ($1, $2, $3, $4, $5, $6)",
        [
          unitPrice[idx].nett_amount,
          unitPrice[idx].quantity,
          newID,
          order_type,
          unitPrice[idx].item_id,
          unitPrice[idx].unit_price,
        ]
      );
    }
    console.log("4");
    await pool.query("delete from cart where customer_id = $1", [req.custID]);
    console.log("5");
    res.json({ status: "ok", message: "Order has been created" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

//delete individual ordered item when meet the condition of item_id and order_id
const deleteOrderedItem = async (req, res) => {
  console.log(req.params.id, req.body.order_id);
  try {
    await pool.query(
      "delete from order_lists where (item_id = $1 and order_id = $2)",
      [req.params.id, req.body.order_id]
    );

    res.json({ status: "ok", message: "Item has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

//update order quantity when meet the condition of item_id and order_id
const admendOrder = async (req, res) => {
  try {
    console.log("hi");
    // await pool.query(
    //   "delete from order_lists where item_id = $1 and order_id=$2",
    //   [req.params.id, req.body.order_id]
    // );
    // console.log("2");
    // // await pool.query("delete order_list where ");
    console.log(req.body.quantity);
    const abc = await pool.query(
      "update order_lists set quantity = $1 where item_id = $2 and order_id = $3 returning *",
      [req.body.quantity, req.params.id, req.body.order_id]
    );
    console.log("he");
    console.log(abc.rows[0]);
    res.json({ status: "ok", message: "updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

// cancel order is soft delete change status is_voidorder to true
const cancelOrder = async (req, res) => {
  try {
    //     console.log(req.body.id)
    //     const listID = req.body.id;
    //     console.log(listID)

    // for (let idx = 0; idx < listID.length; idx++) {
    //   await pool.query(
    //     "update orders set is_voidorder = true where id = $1",
    //     [listID[idx]]
    //   );
    // }
    await pool.query(
      "update orders set is_voidorder = true where table_number = $1",
      [req.body.table_number]
    );

    console.log("2");
    res.json({ status: "ok", message: "order has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

//retrieve all the order detail order by that table
const allOrder = async (req, res) => {
  try {
    console.log(req.params.id);
    const list = await pool.query(
      "select table_number, pax, username, name, quantity, total_price, item_id, orders.id from orders join order_lists on order_lists.order_id = orders.id join items on items.id = order_lists.item_id join customers on customers.id = orders.customer_id where (table_number = $1 and is_payment = false and is_voidorder = false)",
      [req.params.id]
    );

    const result = list.rows;
    console.log(result)
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

module.exports = {
  newOrder,
  deleteOrderedItem,
  admendOrder,
  cancelOrder,
  allOrder,
};
