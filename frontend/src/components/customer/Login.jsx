import React, { useState, useContext } from "react";
import AuthContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import styles from "../customer/Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const fetchData = useFetch();
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetchData("/customer/login", "POST", {
      username: props.username,
      password: props.password,
    });
    if (res.ok) {
      console.log(res.data.access);
      auth.setAccessToken(res.data.access);
      props.setHeader1(false);
      props.setHeader2(true);
      props.setUser(res.data.payload);
      navigate("/food");
    } else {
      console.log(res.data);
      if (res.data === "invalid login") {
        return alert(JSON.stringify("Invalid Login"));
      } else {
        alert(JSON.stringify(res.data));
      }
    }
  };
  
  return (
    <>
      <div className={styles.register}>
        <div className={styles.btnbox}>
          <div className={styles.signup} onClick={props.registerClick}>
            <Link to="/" className={styles.customLink}>
              Sign Up
            </Link>
          </div>
          <div className={styles.signin} onClick={props.loginClick}>
            <Link to="/login" className={styles.customLink}>
              Sign In
            </Link>
          </div>
          <div className={styles.username}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={props.handleUsername}
            ></input>
          </div>
          <div className={styles.password}>
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
          <div>
            <button className={styles.loginBtn} onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
