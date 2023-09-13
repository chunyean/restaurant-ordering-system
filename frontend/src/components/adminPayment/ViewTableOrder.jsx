import React, { useContext, useEffect, useState } from "react";
import styles from "./Payment.module.css";
import useFetch from "../custom_hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

const ViewTableOrder = (props) => {
  const fetchData = useFetch();
  const auth = useContext(UserContext);
  const navigate = useNavigate();

  console.log(props.tableDetail);
  const detail = props.tableDetail;

  const plus = async (order_id, id, name, quantity) => {
    const res = await fetchData(
      "/order/update/" + id,
      "PATCH",
      {
        order_id: order_id,
        quantity: quantity + 1,
        name: name,
      },
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      handleViewOrder(detail[0].table_number);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const minus = async (order_id, id, name, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 1) {
      return;
    }
    const res = await fetchData(
      "/order/update/" + id,
      "PATCH",
      {
        order_id: order_id,
        quantity: newQuantity,
        name: name,
      },
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      handleViewOrder(detail[0].table_number);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const handleViewOrder = async (id) => {
    const res = await fetchData("/order/allorder/" + id, "POST");
    if (res.ok) {
      props.setTableDetail(res.data);
      console.log(res.data);
      // setShowTableOrder(true);
      // navigate("/admin/viewtable");
      props.setTest("");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const deleteItem = async (id, order_id) => {
    const res = await fetchData(
      "/order/delete/" + id,
      "DELETE",
      { order_id: order_id },
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      handleViewOrder(detail[0].table_number);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const voidOrder = async (table_number) => {
    const res = await fetchData(
      "/order/voidorder",
      "DELETE",
      { table_number: table_number },
      auth.accessToken
    );
    if (res.ok) {
      navigate("/food");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const submitOrder = async (table_number) => {
    console.log(props.user.StaffID);
    const res = await fetchData(
      "/payment/create",
      "PUT",
      { table_number: table_number },
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      props.setPaymentDetail(res.data)
      props.setTableDetail(detail)
      navigate("/admin/payment");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const listDetail = detail.map((item) => {
    return (
      <div key={item.id} className={styles.individual}>
        <p className={styles.name}>{item.name}</p>
        <button
          type="submit"
          className={styles.update}
          onClick={() => {
            minus(item.id, item.item_id, item.name, item.quantity);
          }}
        >
          -
        </button>
        <p className={styles.quantity}>{item.quantity}</p>
        <button
          type="submit"
          className={styles.update}
          onClick={() => {
            plus(item.id, item.item_id, item.name, item.quantity);
          }}
        >
          +
        </button>
        <p className={styles.totalprice}>{item.total_price}</p>

        <button
          type="submit"
          className={styles.delete}
          onClick={() => deleteItem(item.item_id, item.id)}
        >
          Cancel
        </button>
      </div>
    );
  });

  // let id = [];
  // for (let idx = 0; idx < detail.length; idx++) {
  //   const result = detail[idx].id;
  //   id.push(result);
  // }
  // console.log(id);

  // useEffect(()=>{
  //   auth.handleViewOrder(newQuantity)
  // }, [])

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
            <p>{detail[0]?.table_number}</p>
            <p>{detail[0]?.username}</p>
            <p>{detail[0]?.pax}</p>
          </div>
        </div>
        <div className={styles.list}>
          <p className={styles.name}>Name</p>
          <p className={styles.update}></p>
          <p className={styles.quantity}>Quantity</p>
          <p className={styles.update}></p>
          <p className={styles.totalprice}>Total Price</p>

          <p className={styles.delete}></p>
        </div>
        <div>{listDetail}</div>
        <div className={styles.voidpay}>
          <button
            className={styles.voidorder}
            onClick={() => {
              voidOrder(detail[0].table_number);
            }}
          >
            Void Order
          </button>
          <button
            className={styles.payment}
            onClick={() => {
              submitOrder(detail[0].table_number);
            }}
          >
            Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewTableOrder;
