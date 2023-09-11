import React, { useState, useContext, useEffect } from "react";
import styles from "../orderCart/OrderCart.module.css";
import UserContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";

const OrderCart = (props) => {
  const [table_number, setTable_Number] = useState();
  const [pax, setPax] = useState();
  const [order_type, setOrder_Type] = useState();
  const auth = useContext(UserContext);
  const [value, setValue] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [dishName, setDishName] = useState();
  const fetchData = useFetch();

  const handleTblNo = (e) => {
    setTable_Number(e.target.value);
  };

  const handlePax = (e) => {
    setPax(e.target.value);
  };

  const handleOrderType = (e) => {
    setOrder_Type(e.target.value);
  };

  const handleClose = (e) => {
    props.setCart(false);
    props.setFoodPage(true);
  };

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const deleteCartItem = async (id) => {
    const res = await fetchData(
      "/item/deletecartiem/" + id,
      "DELETE",
      undefined,
      auth.accesstoken
    );
    if (res.ok) {
      console.log(res.data);
      props.setAbc(1);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const changeQuantity = async (id, name, price) => {
    const res = await fetchData(
      "/item/updatecartitem/" + id,
      "PATCH",
      {
        quantity: value,
        name: name,
        unit_price: price,
      },
      auth.accesstoken
    );
    if (res.ok) {
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

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
        <input
          onClick={() => {
            console.log(item.unit_price);
            console.log(item.name);
            // setUnitPrice(item.unit_price);
            // setDishName(item.name);
            changeQuantity(item.item_id, item.name, item.unit_price);
          }}
          type="checkbox"
        ></input>
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

  const submitOrder = async () => {
    const res = await fetchData("/order/create", "PUT", {
      table_number,
      pax,
      order_type,
    });
    if (res.ok) {
      props.setCart(false);
      props.setFoodPage(true);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.close}>
          <p onClick={handleClose}>x</p>
        </div>
        <label>Order Detail</label>
        <div className={styles.table}>
          <label>Table Number:</label>
          <select className={styles.select} onClick={handleTblNo}>
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        </div>
        <div className={styles.table}>
          <label>Pax:</label>
          <input
            className={styles.select}
            type="number"
            onChange={handlePax}
          ></input>
        </div>
        <div className={styles.table}>
          <label>Order Types:</label>
          <select className={styles.select} onClick={handleOrderType}>
            <option>DINE IN</option>
            <option>TAKE AWAY</option>
            <option>DELIVERY</option>
          </select>
        </div>
        <div className={styles.detail}>
          <span className={styles.name}>Name </span>
          <span className={styles.quantity}>Quantity</span>
          <span className={styles.price}>Price</span>
          {orderDetail}
        </div>
        <button className={styles.btn} onClick={submitOrder}>
          Submit Button
        </button>
      </div>
    </>
  );
};

export default OrderCart;
