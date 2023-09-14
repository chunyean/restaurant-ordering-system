import React, { useContext } from "react";
import useFetch from "../custom_hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";

const Receipt = (props) => {
  const navigate = useNavigate();
  const fetchData = useFetch();

  const paymentDetail = props.paymentDetail;
  console.log(paymentDetail);
  const detail = props.tableDetail;
  console.log(detail);
  const itemlist = detail?.map((item) => {
    return (
      <div key={item.id} className={styles.fnblist}>
        <p className={styles.pquantity}>{item.quantity}</p>
        <p className={styles.pname}>{item.name}</p>
        <p className={styles.pamount}>{item.total_price}</p>
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

  paymentDetail.date = formattedDate;
  const invoice = paymentDetail?.id.substring(0, 8);

  const date = paymentDetail.date.replace(" GMT+8", "");

  return (
    <>
      <div className={styles.receipt}>
        <p className={styles.p1}>SEI CAFE</p>
        <p className={styles.p2}>79 Anson Rd, Level 20, Singapore 079906</p>
        <p>TEL: 12345678</p>
        <p className={styles.p3}>GST REG NO: 1234098766</p>
        <p>***************************************************</p>
        <div className={styles.div}>
          <div className={styles.invoice}>
            <p>Staff </p>
            <p>INVOICE No.</p>
            <p>Table No </p>
            <p>Date</p>
          </div>
          <div className={styles.info}>
            <p>: {paymentDetail.employee_id}</p>
            <p>: {invoice}</p>
            <p>: {paymentDetail.table_number}</p>
            <p>: {date}</p>
          </div>
        </div>
        <p>***************************************************</p>
        <div className={styles.itemlist}>{itemlist}</div>
        <p>***************************************************</p>
        <div className={styles.chargeinfo}>
          <div className={styles.paymentlist}>
            <p>Service Charge 10%</p>
            <p>GST 8%</p>
            <p>Total Amount</p>
          </div>
          <div className={styles.empty}></div>
          <div className={styles.totalpayment}>
            <p>: {paymentDetail.service_charge}</p>
            <p>: {paymentDetail.gst}</p>
            <p>: {paymentDetail.total_amount}</p>
          </div>
        </div>
        <p className={styles.end}>THANK YOU FOR YOUR NEXT VISIT</p>
      </div>
    </>
  );
};

export default Receipt;
