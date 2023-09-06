//create API for payment

const pool = require("../DB/db");

const newPayment = async (req, res) => {
  try {
    const create = await pool.query(
      "insert into payments employee_id values $1 returning id",
      [req.params.id]
    );
    const paymentID = create.rows[0].id;

    const order = await pool.query(
      "select * from fnb_order_lists where (table_number=$1 and is_payment=false returning id",
      [req.body.table_number]
    );
    const orderID = order.rows;

    for (let idx = 0; idx < orderID.length; idx++) {
      await pool.query("insert into order_payments values ($1,$2)", [
        paymentID,
        orderID[idx].id,
      ]);
    }

    const price = await pool.query(
      "select total_price from order_payment where payment_id=paymentID"
    );

    const totalPrice = 0;
    for (let idx = 0; idx < price.rows; idx++) {
      totalPrice += price.rows[idx].total_price;
    }

    const serviceCharge = totalPrice * 0.1;

    const gst = (totalPrice + serviceCharge) * 0.08;

    const finalAmount = totalPrice + serviceCharge + gst;

    const finalPayment = await pool.query(
      "update payments set nett_amount=$1, gst=$2, service_charge=$3, total_amount=$4",
      [totalPrice, gst, serviceCharge, finalAmount]
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
    const update = await pool.query(
      "update payments set is_complete=true where id=$1",
      [req.params.id]
    );
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

module.exports = { newPayment, completedPayment };
