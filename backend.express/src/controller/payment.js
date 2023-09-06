//create conteoller for payment

const pool = require("../DB/db");

// create new payment
// 1st: insert employee id to create new row under table payments and get the new payment id
// 2nd: use table number to retrieve all order id from table orders which haven't pay
// 3rd: use for loop to insert payment id and all order id into table order_payment
// 4th: retrieve total_price from table order_payment and calculate the nett amount
// 5th: calculate all the gst, service charge and total amount and insert back into payments
const newPayment = async (req, res) => {
  try {
    //1st
    const create = await pool.query(
      "insert into payments (employee_id) values ($1) returning id",
      [req.userID]
    );
    const paymentID = create.rows[0].id;

    //2nd
    const order = await pool.query(
      "select id from orders where table_number=$1 and is_payment=false",
      [req.body.table_number]
    );
    const orderID = order.rows;

    //3rd
    for (let idx = 0; idx < orderID.length; idx++) {
      await pool.query(
        "insert into order_payment (payment_id, order_id) values ($1,$2)",
        [paymentID, orderID[idx].id]
      );
    }

    //4th
    const price = await pool.query(
      "select total_price from order_payment join orders on orders.id = order_payment.order_id join order_lists on order_lists.order_id = orders.id where payment_id=$1",
      [paymentID]
    );

    let nettAmount = 0;
    for (let idx = 0; idx < price.rows.length; idx++) {
      nettAmount += Number(price.rows[idx].total_price);
    }

    const serviceCharge = nettAmount * 0.1;

    const gst = (nettAmount + serviceCharge) * 0.08;

    const finalAmount = nettAmount + serviceCharge + gst;

    //5th
    const finalPayment = await pool.query(
      "update payments set nett_amount=$1, gst=$2, service_charge=$3, total_amount=$4 returning *",
      [
        totalPrice.toFixed(2),
        gst.toFixed(2),
        serviceCharge.toFixed(2),
        finalAmount.toFixed(2),
      ]
    );
    const paymentDetail = finalPayment.rows[0];

    res.json(paymentDetail);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

// completed payment will change status unsed table payments is_completed to true and table order is_payemnt to true
const completedPayment = async (req, res) => {
  try {
    await pool.query("update payments set is_completed=true where id=$1", [
      req.params.id,
    ]);

    const order = await pool.query(
      "select order_id from order_payment where payment_id=$1",
      [req.params.id]
    );

    const orderID = order.rows;

    for (let idx = 0; idx < order.rows.length; idx++) {
      await pool.query("update orders set is_payment=true where id=$1", [
        orderID[idx].order_id,
      ]);
    }

    await pool.query("insert into order_histories (history) value ($1)", [
      req.params.id,
    ]);
    
    res.json({ status: "ok", message: "Payment has been completed" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

module.exports = { newPayment, completedPayment };
