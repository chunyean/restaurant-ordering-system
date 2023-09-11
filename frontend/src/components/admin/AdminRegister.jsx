import React from "react";
import styles from "../admin/Admin.module.css";

const AdminRegister = (props) => {
  const handleHeader = () => {
    props.setHeader1(false);
    props.setHeader2(false);
    props.setRegister(false);
    props.setHeader3(true);
  };

  handleHeader();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.register}>
          <div className={styles.title}>
            <label>LOGIN</label>
          </div>
          <div className={styles.id}>
            <label htmlFor="id">Employee ID:</label>
            <input id="id" placeholder="Enter employee ID" type="text"></input>
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Enter password"
              type="password"
            ></input>
          </div>
          <button className={styles.loginbtn}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
