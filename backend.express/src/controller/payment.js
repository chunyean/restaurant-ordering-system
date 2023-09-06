//create API for payment

const pool = require("../DB/db");

const newPayment = async (req, res) => {
  try {
    const create = await pool.query(
      "insert into payments (employee_id) values ($1) returning id",
      [req.params.id]
    );

    const paymentID = create.rows[0].id;

    const order = await pool.query(
      "select id from orders where table_number=$1 and is_payment=false",
      [req.body.table_number]
    );

    const orderID = order.rows;

    for (let idx = 0; idx < orderID.length; idx++) {
      await pool.query(
        "insert into order_payment (payment_id, order_id) values ($1,$2)",
        [paymentID, orderID[idx].id]
      );
    }

    const price = await pool.query(
      "select total_price from order_payment join orders on orders.id = order_payment.order_id join fnb_order_lists on fnb_order_lists.order_id = orders.id where payment_id=$1",
      [paymentID]
    );

    let totalPrice = 0;
    for (let idx = 0; idx < price.rows.length; idx++) {
      totalPrice += Number(price.rows[idx].total_price);
    }

    const serviceCharge = totalPrice * 0.1;

    const gst = (totalPrice + serviceCharge) * 0.08;

    const finalAmount = totalPrice + serviceCharge + gst;

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
    res.json({ status: "ok", message: "Payment has been completed" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

module.exports = { newPayment, completedPayment };
