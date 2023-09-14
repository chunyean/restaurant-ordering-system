import React, { useState, useContext, useEffect } from "react";
import styles from "../orderCart/OrderCart.module.css";
import UserContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import { useNavigate } from "react-router-dom";

const OrderCart = (props) => {
  const auth = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();

  const [table_number, setTable_Number] = useState();
  const [pax, setPax] = useState();
  const [order_type, setOrder_Type] = useState("DINE_IN");
  const [value, setValue] = useState();

  const handleTblNo = (e) => {
    setTable_Number(e.target.value);
  };

  const handlePax = (e) => {
    setPax(e.target.value);
  };

  const handleOrderType = (e) => {
    setOrder_Type(e.target.value);
  };

  const handleClose = () => {
    // props.setArrayLength(0);
    navigate("/food");
  };

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  // delete item from cart
  const deleteCartItem = async (id) => {
    const res = await fetchData(
      "/item/deletecartiem/" + id,
      "DELETE",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      lengthOfCart();
      props.setTest(1);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  //change quantity
  const changeQuantity = async (id, name, price) => {
    const res = await fetchData(
      "/item/updatecartitem/" + id,
      "PATCH",
      {
        quantity: value,
        name: name,
        unit_price: price,
      },
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      lengthOfCart();
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  //calculate total quanitty inside the cart
  const lengthOfCart = async () => {
    const res = await fetchData(
      "/item/length",
      "POST",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      props.setArrayLength(res.data);
      props.setTest("");
    }
  };

  // list down all the item has been order
  const orderDetail = props.cartDetail.map((item) => {
    return (
      <div key={item.item_id}>
        <div className={styles.name1}>{item.name}</div>

        <select className={styles.quantity1} onClick={handleValue}>
          <option value={item.quantity}>{item.quantity}</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <button
          className={styles.check}
          onClick={() => {
            console.log(item.unit_price);
            console.log(item.name);
            changeQuantity(item.item_id, item.name, item.unit_price);
            lengthOfCart();
          }}
          type="submit"
        >
          ok
        </button>
        <div className={styles.price1}>${item.nett_amount}</div>
        <button
          className={styles.button}
          onClick={() => deleteCartItem(item.item_id)}
        >
          delete
        </button>
      </div>
    );
  });

  //submit order to database
  const submitOrder = async () => {
    const res = await fetchData(
      "/order/create",
      "PUT",
      {
        table_number,
        pax,
        order_type,
      },
      auth.accessToken
    );
    if (res.ok) {
      props.setCart(false);
      props.setFoodPage(true);
      props.setArrayLength(0);
      console.log(props.user);
      navigate("/food");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    lengthOfCart();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.close}>
          <p onClick={handleClose}>x</p>
        </div>

        <label>Order Cart</label>
        <div className={styles.table}>
          <label htmlFor="table">Table Number:</label>
          <select id="table" className={styles.select} onClick={handleTblNo}>
            <option></option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
          </select>
        </div>
        <div className={styles.table}>
          <label htmlFor="pax">Pax:</label>
          <input
            className={styles.select}
            type="number"
            id="pax"
            onChange={handlePax}
          ></input>
        </div>
        <div className={styles.table}>
          <label htmlFor="type"> Order Types:</label>
          <select id="type" className={styles.select} onClick={handleOrderType}>
            <option value={"DINE_IN"}>DINE IN</option>
            <option value={"TAKE_AWAY"}>TAKE AWAY</option>
            <option value={"DELIVERY"}>DELIVERY</option>
          </select>
        </div>
        <div className={styles.detail}>
          <span className={styles.name}>Name </span>
          <span className={styles.space}></span>
          <span className={styles.quantity}>Quantity</span>
          <span className={styles.price}>Price</span>
          <span className={styles.space}></span>
          {orderDetail}
        </div>
        {/* <p>Please click botton when quantity confirm to change</p> */}
        <button
          className={styles.btn}
          onClick={() => {
            submitOrder();
            lengthOfCart();
          }}
        >
          Submit Button
        </button>
      </div>
    </>
  );
};

export default OrderCart;
