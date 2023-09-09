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

// retrieve individual F&B data by using ID
const singleItem = async (req, res) => {
  try {
    const result = await pool.query("select * from items where id = $1", [
      req.params.id,
    ]);
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
    await pool.query(
      `create temporary table if not exits SEI${req.custID} (item_id integer, name varchar(100), quantity smallserial, unit_price decimal(6,2), nett_amount decimal(6,2) null)`
    );

    await pool.query(
      `IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE event_object_table = SEI${erq.custID} AND trigger_name = 'nettprice') THEN CREATE TRIGGER nettprice BEFORE INSERT OR UPDATE ON SEI${erq.custID} FOR EACH ROW EXECUTE FUNCTION nettprice(); END IF;`
    );

    const res = await pool.query(
      `insert into SEI${req.custID} (item_id, quantity values (${req.body.id},${req.body.quantity})`
    );

    let price;
    for (let idx = 0; idx < req.body.id.length; idx++) {
      price = await pool.query(
        "select id, name, price from items where id = $1",
        [req.body.id[idx]]
      );
    }

    const nettprice = price.rows;

    for (let idx = 0; idx < nettprice.length; idx++) {
      const item = nettprice[idx];
      await pool.query(
        `update SEI${req.custID} set unit_price = $1, name = $2 where item_id = $3`,
        [item.price, item.name, item.id]
      );
    }

    res.json({ status: "success" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const cartOrder = async (req, res) => {
  try {
    const cartDetail = await pool.query(
      `select item_id, name, sum(quantity), sum(nett_price) from SEI${req.custID} group by item_id`
    );
    const list = cartDetail.rows;
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createNewItem,
  categoryItem,
  singleItem,
  softdelete,
  updateItem,
  addOrder,
  cartOrder,
};
