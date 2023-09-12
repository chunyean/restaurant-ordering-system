import React, { useEffect } from "react";
import styles from "./Payment.module.css";

const ViewTableOrder = (props) => {
  console.log(props.tableDetail);
  // const detail = props.tableDetail;
  const detail = [
    {
      table_number: 2,
      pax: 3,
      username: "pikachu1",
      name: "Roasted Broccoli Soup",
      quantity: 3,
      total_price: "30.00",
    },
    {
      table_number: 2,
      pax: 3,
      username: "pikachu1",
      name: "Pasta alla Trapanese",
      quantity: 3,
      total_price: "54.00",
    },
    {
      table_number: 2,
      pax: 3,
      username: "pikachu1",
      name: "The Loose Moose French",
      quantity: 2,
      total_price: "50.00",
    },
    {
      table_number: 2,
      pax: 3,
      username: "pikachu1",
      name: "Dalmore King Alexander III",
      quantity: 2,
      total_price: "800.00",
    },
    {
      table_number: 2,
      pax: 2,
      username: "pikachu1",
      name: "Loaded Deviled Eggs",
      quantity: 2,
      total_price: null,
    },
    {
      table_number: 2,
      pax: 2,
      username: "pikachu1",
      name: "Egg salad",
      quantity: 1,
      total_price: null,
    },
  ];
  const listDetail = detail.map((item) => {
    return (
      <div className={styles.individual}>
        <div className={styles.itemName}>{item.name}</div>
        <div className={styles.quantity}>{item.quantity}</div>
        <div className={styles.total_prie}>{item.total_price}</div>
        <div className={styles.admend}></div>
        <div className={styles.delete}></div>
      </div>
    );
  });

  const handleHeader = () => {
    props.setHeader1(false);
    props.setHeader4(true);
  };

  useEffect(() => {
    handleHeader();
  }, []);
  return (
    <>
      <div className={styles.listDetail}>
        <p>Order Review</p>
        <div className={styles.box}>
          <div className={styles.space1}></div>
          <div className={styles.tableinfo}>
            <p className={styles.tbl}>Table No. </p>
            <p className={styles.tbl}>Customer Name </p>
            <p className={styles.tbl}>Number of Pax </p>
          </div>
          <div className={styles.colon}>
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className={styles.result}>
            <p className={styles.name}>{detail[0].table_number}</p>
            <p className={styles.name}>{detail[0].username}</p>
            <p className={styles.name}>{detail[0].pax}</p>
          </div>
          <div className={styles.space2}></div>
        </div>
        <div className={styles.list}>
          <div className={styles.itemName}>Name</div>
          <div className={styles.quantity}>Quantity</div>
          <div className={styles.total_prie}>Total Price</div>
          <div className={styles.admend}></div>
          <div className={styles.delete}></div>
        </div>
        {listDetail}
      </div>
    </>
  );
};

export default ViewTableOrder;
