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

  const handleLogin = async () => {
    const res = await fetchData("customer/login", "POST", {
      username,
      password,
    });
    if (res.ok) {
      auth.setAccessToken(res.data.access);
      //direct menu page
    } else {
      console.log(res.data);
      //check error data
    }
  };
  return <><>
  <div className={styles.register}>
    <div className={styles.btnbox}>
      <div className={styles.signup}>
        <span>Sign Up</span>
      </div>
      <div className={styles.signin}>
        <span>Sign In</span>
      </div>
      <div className={styles.username}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          onChange={() => setUsername(e.target.value)}
        ></input>
        {/* {errorUsername ? (
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
          onChange={(e) => setContact(e.target.value)}
        ></input>
      </div>
      <div className={styles.password}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={() => setPassword(e.target.value)}
        ></input>
        <label>
          <input type="checkbox" onClick="" />
          Show Password
        </label>
        {/* {errorPassword ? (
          <p style={{ color: "red", margin: "0" }}>{errorPassword}</p>
        ) : (
          <div style={{ height: "36px", margin: "0" }}></div>
        )} */}
      </div>
      <div className={styles.term}>
        <span>
          By clicking register, you agree to our Terms, Privacy Policy and
          Cookies Policy.
        </span>
        <button onClick="">Register</button>
      </div>
    </div>
  </div>
</></>;
};

export default Login;
