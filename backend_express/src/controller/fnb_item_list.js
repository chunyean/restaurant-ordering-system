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

// // retrieve individual F&B data by using ID
// const singleItem = async (req, res) => {
//   try {
//     const result = await pool.query("select * from items where id = $1", [
//       req.params.id,
//     ]);
//     const item = result.rows[0];
//     res.json(item);
//   } catch (error) {
//     console.log(error.message);
//     res.json({ status: "error", message: error.message });
//   }
// };

// all the information is linked with another so cannot hard delete
// here's the soft delete created
// change isDeleted status to true
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

const addOrder = async (req, res) => {
  try {
    console.log("11");
    await pool.query(
      `do $$ begin create table if not exists "SEI${req.custID}" (item_id integer, name varchar(100), quantity smallserial, unit_price decimal(6,2), nett_amount decimal(6,2) null); end$$;`
    );
    console.log("12");
    await pool.query(
      `do $$ begin IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE event_object_table = 'SEI${req.custID}' AND trigger_name = 'nettprice') THEN CREATE TRIGGER nettprice BEFORE INSERT OR UPDATE ON "SEI${req.custID}" FOR EACH ROW EXECUTE FUNCTION nettprice(); END IF;end$$;`
    );
    console.log("13");
    await pool.query(
      `insert into "SEI${req.custID}" (item_id, quantity) values (${req.params.id}, ${req.body.quantity}) `
    );

    // let price;
    // for (let idx = 0; idx < req.body.id.length; idx++) {
    //   price = await pool.query(
    //     "select id, name, price from items where id = $1",
    //     [req.body.id[idx]]
    //   );
    // }
    console.log("14");
    const price = await pool.query(
      "select name, price from items where id = $1",
      [req.params.id]
    );

    const list = price.rows[0];
    console.log("15");
    await pool.query(
      `update "SEI${req.custID}" set unit_price = $1, name = $2 where item_id = $3`,
      [list.price, list.name, req.params.id]
    );

    // for (let idx = 0; idx < nettprice.length; idx++) {
    //   const item = nettprice[idx];
    //   await pool.query(
    //     `update SEI${req.custID} set unit_price = $1, name = $2 where item_id = $3`,
    //     [item.price, item.name, item.id]
    //   );
    // }
    console.log("16");
    res.json({ status: "success", message: "add successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const cartOrder = async (req, res) => {
  try {
    const cartDetail = await pool.query(
      `select item_id, name, unit_price, sum(quantity) as quantity, sum(nett_amount) as nett_amount from "SEI${req.custID}" group by item_id, name, unit_price`
    );
    const list = cartDetail.rows;
    console.log(cartDetail);
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const lengthOfCart = async (req, res) => {
  try {
    const cart = await pool.query(
      `select sum(quantity) as quantity from "SEI${req.custID}"`
    );

    const number = cart.rows[0].quantity;
    console.log(number);
    res.json(number);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  console.log("Delete cart item called");
  console.log(req.params.id);
  try {
    await pool.query(`delete from "SEI${req.custID}" where item_id = $1`, [
      req.params.id,
    ]);
    res.json({ status: "okay", message: "item has been deleted from cart " });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    await pool.query(`delete from "SEI${req.custID}" where item_id = $1`, [
      req.params.id,
    ]);

    await pool.query(
      `insert into "SEI${req.custID}"  (item_id, quantity, unit_price, name) values ($1,$2,$3, $4)`,
      [
        req.params.id,
        req.body.quantity,
        req.body.unit_price,
        req.body.name,
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
