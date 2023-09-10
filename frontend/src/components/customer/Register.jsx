import React, { useRef, useContext, useState, useEffect } from "react";
import AuthContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import styles from "../customer/Header.module.css";

const Register = (props) => {
  const auth = useContext(AuthContext);
  const fetchData = useFetch();

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [contact, setContact] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const registerAccount = async () => {
    console.log("1");
    const res = await fetchData("/customer/register", "PUT", {
      username: props.username,
      password: props.password,
      contact: props.contact,
    });
    console.log("2");
    if (res.ok) {
      console.log(res);
      setUsername("");
      setPassword("");
      setContact("");
      props.setRegister(false);
      props.setLogin(true);
    } else {
      console.log(res.data);
      setErrorUsername(res.data);
      setErrorPassword(res.data);
    }
  };

  // const showPassword = () => {
  //   var x = document.getElementById("password");
  //   if (x.type === "password") {
  //     x.type = "text";
  //   } else {
  //     x.type = "password";
  //   }
  // };

  // const handleUsername = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handleContact = (e) => {
  //   setContact(e.target.value);
  // };

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  // useEffect(()=>{
  //   registerAccount()
  // }, [])

  //sign up and sign in change to toggle
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
          <div className={styles.contact}>
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              placeholder="Enter your contact number"
              onChange={props.handleContact}
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
            {errorPassword ? (
              <p style={{ color: "red", margin: "0" }}>{errorPassword}</p>
            ) : (
              <div style={{ height: "36px", margin: "0" }}></div>
            )}
          </div>
          <div className={styles.term}>
            <span>
              By clicking register, you agree to our Terms, Privacy Policy and
              Cookies Policy.
            </span>
            <button className={styles.registerbtn} onClick={registerAccount}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
