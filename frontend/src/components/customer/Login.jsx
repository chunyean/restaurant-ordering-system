import React, { useState, useContext } from "react";
import AuthContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import styles from "../customer/Header.module.css";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const fetchData = useFetch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const login = async () => {
    console.log("1");
    const res = await fetchData("/customer/login", "POST", {
      username: props.username,
      password: props.password,
    });
    console.log("2");
    if (res.ok) {
      console.log("3");
      auth.setAccessToken(res.data.access);
      props.setHeader1(false);
      props.setLogin(false);
      props.setFoodPage(true);
      props.setHeader2(true);
      props.setUser(res.data.payload);
      //direct menu page
    } else {
      console.log("4");
      console.log(res.data);
      //check error data
      setErrorUsername(res.data);
      setErrorPassword(res.data);
    }
  };
  return (
    <>
      <div className={styles.register}>
        <div className={styles.btnbox}>
          <div className={styles.signup} onClick={props.registerClick}>
            <span>Sign Up</span>
          </div>
          <div className={styles.signin} onClick={props.loginClick}>
            <span>Sign In</span>
          </div>
          <div className={styles.username}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={props.handleUsername}
            ></input>
            {errorUsername ? (
              <p style={{ color: "red", margin: "0" }}>{errorUsername}</p>
            ) : (
              <div style={{ height: "36px", margin: "0" }}></div>
            )}
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
            {errorPassword ? (
              <p style={{ color: "red", margin: "0" }}>{errorPassword}</p>
            ) : (
              <div style={{ height: "36px", margin: "0" }}></div>
            )}
          </div>
          <div>
            <button  className={styles.loginBtn} onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
