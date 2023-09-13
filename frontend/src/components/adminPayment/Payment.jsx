import React, { useContext } from "react";
import useFetch from "../custom_hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";

const Payment = (props) => {
  const fetchData = useFetch();
  const auth = useContext(UserContext);
  const navigate = useNavigate();

  const complete = async (id) => {
    const res = await fetchData(
      "/payment/completed/" + id,
      "PATCH",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      navigate("/admin/table");
    } else {
      alert(JSON.stringify(res.data));
    }
  };
  const detail = [
    {
      item_id: 10013,
      name: "Loaded Deviled Eggs",
      quantity: "1",
      nett_amount: "12.00",
      unit_price: "12.00",
    },
    {
      item_id: 10008,
      name: "CALABRIA FAMILY WINES",
      quantity: "4",
      nett_amount: "160.00",
      unit_price: "40.00",
    },
    {
      item_id: 10007,
      name: "The Loose Moose French",
      quantity: "1",
      nett_amount: "25.00",
      unit_price: "25.00",
    },
  ];

  const paymentDetail = {
    id: "7b67b14d-aaad-47c1-ad01-cb9e6682e7d2",
    employee_id: "SEI 119",
    date: "2023-09-13T08:08:46.084Z",
    nett_amount: "221.00",
    service_charge: "2.00",
    gst: "1.76",
    total_amount: "23.76",
    is_completed: false,
    table_number: 3,
  };
  // const paymentDetail = props.paymentDetail

  //   const detail = props.tableDetail;/
  const itemlist = detail.map((item) => {
    return (
      <div key={item.id} className={styles.fnblist}>
        <p className={styles.pquantity}>{item.quantity}</p>
        <p className={styles.pname}>{item.name}</p>
        <p className={styles.pamount}>{item.nett_amount}</p>
      </div>
    );
  });

  const formattedDate = new Date(paymentDetail.date).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  paymentDetail.date = formattedDate;
  const invoice = paymentDetail.id.substring(0, 8);

  const date = paymentDetail.date.replace(" GMT+8", "");

  return (
    <>
      <div className={styles.receipt}>
        <p className={styles.p1}>SEI CAFE</p>
        <p className={styles.p2}>79 Anson Rd, Level 20, Singapore 079906</p>
        <p>TEL: 12345678</p>
        <p className={styles.p3}>GST REG NO: 1234098766</p>
        <p>*************************************************</p>
        <div className={styles.div}>
          <div className={styles.invoice}>
            <p>Staff: </p>
            <p>INVOICE</p>
            <p>Table No: </p>
            <p>Date</p>
          </div>
          <div className={styles.info}>
            <p>{paymentDetail.employee_id}</p>
            <p>{invoice}</p>
            <p>{paymentDetail.table_number}</p>
            <p>{date}</p>
          </div>
        </div>
        <p>*************************************************</p>
        <div className={styles.itemlist}>{itemlist}</div>
        <p>*************************************************</p>
        <div className={styles.paymentlist}>
          <p>10% service </p>
          <p>7% GST</p>
          <p>Total </p>
        </div>
        <div className={styles.totalpayment}>
          <p>{paymentDetail.service_charge}</p>
          <p>{paymentDetail.gst}</p>
          <p>{paymentDetail.total_amount}</p>
        </div>
        <p>THANK YOU FOR YOUR NEXT VISIT</p>
      </div>
    </>
  );
};

export default Payment;
