import React, { useContext, useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";

const Payment = (props) => {
  const fetchData = useFetch();
  const auth = useContext(UserContext);
  const navigate = useNavigate();
  const [number, setNumber] = useState();

  const paymentInfo = props.paymentDetail;
  console.log(paymentInfo);
  const odrDetail = props.tableDetail;

  const complete = async (id) => {
    const res = await fetchData(
      "/payment/completed/" + id,
      "PATCH",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      // props.setPaymentDetail(paymentInfo);
      // props.setTableDetail(odrDetail);
      navigate("/admin/receipt");
    } else {
      alert(JSON.stringify(res.data));
    }
  };
  

  const list = odrDetail.map((item) => {
    return (
      <div key={item.item_id} className={styles.child5}>
        <p className={styles.pN}>{item.name}</p>
        <p className={styles.pQ}>{item.quantity}</p>
        <p className={styles.pP}>{item.total_price}</p>
      </div>
    );
  });

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  let balance;

  if (!isNaN(number)) {
    const result = number - paymentInfo.total_amount;
    balance = Math.round(result);
  }

  return (
    <>
      <div className={styles.parents}>
        <p>Payment View</p>
        <div className={styles.child1}>
          <div className={styles.child2}>
            <p>Table No</p>
            <p>Staff No</p>
            <p>Customer Name:</p>
            <p>Pax</p>
          </div>
          <div className={styles.child3}>
            <p>: {odrDetail[0]?.table_number}</p>
            <p>: {paymentInfo.employee_id}</p>
            <p>: {odrDetail[0]?.username}</p>
            <p>: {odrDetail[0]?.pax}</p>
          </div>
        </div>
        <div className={styles.child4}>
          <p className={styles.pN}>Name</p>
          <p className={styles.pQ}>Quantity</p>
          <p className={styles.pP}>Price</p>
        </div>
        <div className={styles.child6}>
          <div>{list}</div>
        </div>
        <div className={styles.child7}>
          <div className={styles.child8}>
            <p>Total price :</p>
            <p>Service Charge 10% :</p>
            <p>GST 8% :</p>
            <p>Total Amount :</p>
          </div>
          <div className={styles.child9}>
            <p>{paymentInfo.nett_amount}</p>
            <p>{paymentInfo.service_charge}</p>
            <p>{paymentInfo.gst}</p>
            <p>{paymentInfo.total_amount}</p>
          </div>
        </div>
        <div className={styles.child14}>Payment Method</div>
        <div className={styles.child10}>
          <div className={styles.child11}>
            <label htmlFor="cash">Cash: $</label>
          </div>
          <div className={styles.child12}>
            <input
              type="text"
              id="cash"
              placeholder="Cash Amount"
              onChange={handleNumber}
            ></input>
          </div>
        </div>
        <div className={styles.child13}>
          <p>Balance: ${balance}</p>
        </div>
        <button
          onClick={() => {
            complete(paymentInfo.id);
          }}
          className={styles.child15}
        >
          Completed
        </button>
      </div>
    </>
  );
};

export default Payment;
