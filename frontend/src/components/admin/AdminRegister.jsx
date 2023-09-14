import React, { useEffect, useState } from "react";
import styles from "../admin/Admin.module.css";
import useFetch from "../custom_hooks/useFetch";
import { useNavigate } from "react-router-dom";

const AdminRegister = (props) => {
  const fetchData = useFetch();
  const [errorId, setErrorId] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorUsername, setErrorUsername] = useState();
  // const [availableId, setAvailableId] = useState();
  const navigate = useNavigate();

  const handleHeader = () => {
    props.setHeader1(false);
    props.setHeader4(true);
  };

  const registerAccount = async () => {
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
      setErrorId(res.data);
      setErrorPassword(res.data);
    }
  };

  // const nextEmployeeID = async () => {
  //   const res = await fetchData("/employee/nextAvaiId");
  //   if (res.ok) {
  //     setAvailableId(res.data);
  //   } else {
  //     console.log(res.data);
  //     setErrorUsername(res.data);
  //     setErrorPassword(res.data);
  //   }
  // };

  useEffect(() => {
    handleHeader();
  }, []);
  console.log(props.username);
  console.log(props.password);
  console.log(props.contact);
  return (
    <>
      <div className={styles.register2}>
        <div className={styles.employee}>
          <label>Employee ID: </label>
          <p>{props.availableId}</p>
          {/* {errorId ? (
            <p style={{ color: "red", margin: "0" }}>{errorUsername}</p>
          ) : (
            <div style={{ height: "36px", margin: "0" }}></div>
          )} */}
        </div>
        <div className={styles.name}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={props.handleUsername}
          ></input>
          {/* {errorId ? (
            <p style={{ color: "red", margin: "0" }}>{errorUsername}</p>
          ) : (
            <div style={{ height: "36px", margin: "0" }}></div>
          )} */}
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
          {/* {errorPassword ? (
            <p style={{ color: "red", margin: "0" }}>{errorPassword}</p>
          ) : (
            <div style={{ height: "36px", margin: "0" }}></div>
          )} */}
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
