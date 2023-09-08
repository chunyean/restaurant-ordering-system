import React, { useContext } from "react";
import AuthContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import styles from "../customer/Header.module.css";
import Register from "./Register";

const Header = (props) => {
  const auth = useContext(AuthContext);
  const fetchData = useFetch();

  const handleRegister = () => {
    props.setRegister(true), props.setLogin(false);
  };

  const handleLogin = () => {
    props.setLogin(true), props.setRegister(false);
  };

  return (
    <>
      <div className={styles.header}>
        <img
          src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
          className={styles.logo}
        />
        <button className={styles.ellipse} onClick={handleRegister}>
          Sign Up
        </button>
        <button className={styles.signin1} onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </>
  );
};

export default Header;
