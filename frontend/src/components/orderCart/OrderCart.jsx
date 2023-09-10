import React, { useState } from "react";
import styles from "../orderCart/OrderCart.module.css";

const OrderCart = (props) => {
  const [table_number, setTable_Number] = useState();
  const [pax, setPax] = useState();
  const [order_type, setOrder_Type] = useState();

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

  console.log(props.cartDetail);
  const orderDetail = props.cartDetail.map((item) => {
    return (
      <div key={item.id}>
        <div className={styles.name1}>{item.name}</div>
        <div className={styles.quantity1}>{item.quantity}</div>
        <div className={styles.price1}>${item.nett_amount}</div>
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
