import React, { useEffect, useState } from "react";
import styles from "../admin/Admin.module.css";
import useFetch from "../custom_hooks/useFetch";
import { useNavigate } from "react-router-dom";

const AdminRegister = (props) => {
  const fetchData = useFetch();
  const navigate = useNavigate();
  console.log(props.availableId);
  const registerAccount = async () => {
    console.log(props.availableId);
    const res = await fetchData("/employee/register", "PUT", {
      name: props.username,
      password: props.password,
      contact: props.contact,
    });
    if (res.ok) {
      console.log(res);
      props.setUsername("");
      props.setPassword("");
      props.setContact("");
      navigate("/admin");
    } else {
      console.log(res.data);
      alert(JSON.stringify(res.data[0]));
      alert(JSON.stringify(res.data[1]));
      alert(JSON.stringify(res.data[2]));
      alert(JSON.stringify(res.data[3]));
    }
  };

  const handleHeader = () => {
    props.setHeader1(false);
    props.setHeader3(true);
    props.setHeader4(false);
  };

  useEffect(() => {
    handleHeader();
  }, []);

  return (
    <>
      <div className={styles.register2}>
        <div className={styles.employee}>
          <label>Employee ID: </label>
          <p>{props.availableId}</p>
        </div>
        <div className={styles.name}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={props.handleUsername}
          ></input>
        </div>
        <div className={styles.contact}>
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            placeholder="Enter your contact number"
            onChange={props.handleContact}
          ></input>
        </div>
        <div className={styles.password1}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={props.handlePassword}
          ></input>
          <div className={styles.check}>
            <label>
              <input type="checkbox" onClick={props.showPassword} />
              Show Password
            </label>
          </div>
        </div>
        <div className={styles.term}>
          <span></span>
          <button className={styles.registerbtn} onClick={registerAccount}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
