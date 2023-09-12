import React, { useContext, useEffect, useState } from "react";
import styles from "./Payment.module.css";
import useFetch from "../custom_hooks/useFetch";
import UserContext from "../context/user";

const ViewTableOrder = (props) => {
  const fetchData = useFetch();
  const auth = useContext(UserContext);
  const [value, setValue] = useState();

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
    {
      table_number: 2,
      pax: 2,
      username: "pikachu1",
      name: "Egg salad",
      quantity: 1,
      total_price: null,
    },
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

  const updateOrder = async () => {
    const res = await fetchData(
      "/order/admend" + id,
      "PATCH",
      {
        quantity: value + 1,
      },
      auth.accessToken
    );
    if (res.ok) {
    }
  };

  const listDetail = detail.map((item) => {
    return (
      <div className={styles.individual}>
        <p>{item.name}</p>
        <p>{item.quantity}</p>
        <p>{item.total_price}</p>
        <button type="submit" className={styles.admend}>
          Admend
        </button>
        <button type="submit" className={styles.delete}>
          Cancel
        </button>
      </div>
    );
  });

  // const handleHeader = () => {
  //   {
  //     props.setHeader1(false);
  //     props.setHeader4(true);
  //   }
  // };

  // handleHeader();

  return (
    <>
      <div className={styles.listDetail}>
        <p>Order Review</p>
        <div className={styles.box}>
          <div className={styles.tableinfo}>
            <p>Table No. </p>
            <p>Customer Name </p>
            <p>Number of Pax </p>
          </div>
          <div className={styles.colon}>
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className={styles.result}>
            <p>{detail[0].table_number}</p>
            <p>{detail[0].username}</p>
            <p>{detail[0].pax}</p>
          </div>
        </div>
        <div className={styles.list}>
          <p>Name</p>
          <p>Quantity</p>
          <p>Total Price</p>
          <p></p>
          <p></p>
        </div>
        <div className={styles.abc}>{listDetail}</div>
        <button className={styles.payment}>Payment</button>
      </div>
    </>
  );
};

export default ViewTableOrder;
