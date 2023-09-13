import React, { useEffect, useContext, useState } from "react";
import styles from "../admin/Admin.module.css";
import AuthContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = (props) => {
  const auth = useContext(AuthContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const [errorUsername, setErrorUsername] = useState();

  const [errorId, setErrorId] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const handleHeader = () => {
    props.setHeader1(false);
    props.setHeader3(true);
    props.setHeader4(false);
  };

  const login = async () => {
    console.log("1");
    const res = await fetchData("/employee/login", "POST", {
      id: props.employeeId,
      password: props.password,
    });
    if (res.ok) {
      auth.setAccessToken(res.data.access);
      props.setHeader3(false);
      props.setHeader4(true);
      props.setUser(res.data.payload);
      console.log(res.data.payload);
      navigate("/food");
    } else {
      console.log(res.data);
      //check error data
      setErrorId(res.data);
      setErrorPassword(res.data);
    }
  };

  useEffect(() => {
    handleHeader();
  }, []);

  return (
    <>
      <div className={styles.register}>
        <div className={styles.title}>
          <label>Login </label>
        </div>
        <div className={styles.name}>
          <label htmlFor="id">Employee ID:</label>
          <input
            type="text"
            id="id"
            placeholder="Enter your Employee Id"
            onChange={props.handleEmployeeId}
          ></input>
          {errorId ? (
            <p style={{ color: "red", margin: "0" }}>{errorUsername}</p>
          ) : (
            <div style={{ height: "36px", margin: "0" }}></div>
          )}
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
          {errorPassword ? (
            <p style={{ color: "red", margin: "0" }}>{errorPassword}</p>
          ) : (
            <div style={{ height: "36px", margin: "0" }}></div>
          )}
        </div>
        <div className={styles.term}>
          <span></span>
          <button className={styles.loginbtn} onClick={login}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
