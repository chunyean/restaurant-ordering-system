import React from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "../customer/Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {
  const fetchData = useFetch();
  const navigate = useNavigate();

  const registerAccount = async () => {
    const res = await fetchData("/customer/register", "PUT", {
      username: props.username,
      password: props.password,
      contact: props.contact,
    });

    if (res.ok) {
      console.log(res);
      props.setUsername("");
      props.setPassword("");
      props.setContact("");
      navigate("/login");
    } else {
      console.log(res.data);
      alert(JSON.stringify(res.data[0]));
      alert(JSON.stringify(res.data[1]));
      alert(JSON.stringify(res.data[2]));
      alert(JSON.stringify(res.data[3]));
    }
  };

  return (
    <>
      <div className={styles.register}>
        <div className={styles.btnbox}>
          <div to="/" className={styles.signup} onClick={props.registerClick}>
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
