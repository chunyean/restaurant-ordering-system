import React, { useContext, useEffect, useState } from "react";
import styles from "./Table.module.css";
import useFetch from "../custom_hooks/useFetch";
import { useNavigate } from "react-router-dom";


const Table = (props) => {
  const fetchData = useFetch();
  const navigate = useNavigate();

  const row = [1, 2, 3, 4];
  const row2 = [5, 6, 7, 8];
  const row3 = [9, 10, 11, 12];


  const table = row.map((item) => {
    return (
      <div
        className={styles.number}
        key={item}
        id={item}
        value={item}
        onClick={(e) => {
          console.log(e.target.id);
          handleViewOrder(e.target.id);
        }}
      >
        {item}
      </div>
    );
  });

  const table2 = row2.map((item) => {
    return (
      <div
        className={styles.number}
        key={item}
        id={item}
        onClick={(e) => {
          console.log(e.target.id);
          handleViewOrder(e.target.id);
        }}
      >
        {item}
      </div>
    );
  });

  const table3 = row3.map((item) => {
    return (
      <div
        className={styles.number}
        key={item}
        id={item}
        value={item}
        onClick={(e) => {
          console.log(e.target.id);
          handleViewOrder(e.target.id);
        }}
      >
        {item}
      </div>
    );
  });

  // view individual table order
  const handleViewOrder = async (id) => {
    const res = await fetchData("/order/allorder/" + id, "POST");
    if (res.ok) {
      props.setTableDetail(res.data);
      console.log(res.data);
      // setShowTableOrder(true);
      navigate('/admin/viewtable')
      props.setTest('')
    } else {
      alert(JSON.stringify(res.data));
    }
  };
  
  const handleHeader = () => {
    props.setHeader1(false);
    props.setHeader4(true);
  };

  useEffect(() => {
    handleHeader();
  }, []);

  return (
    <>
      <div className={styles.tblcontainer}>
        <div className={styles.table}>{table}</div>
      </div>
      <div className={styles.tblcontainer2}>
        <div className={styles.table}>{table2}</div>
      </div>
      <div className={styles.tblcontainer2}>
        <div className={styles.table}>{table3}</div>
      </div>
    </>
  );
};

export default Table;
