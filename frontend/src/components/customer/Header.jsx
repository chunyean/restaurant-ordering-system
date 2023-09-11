import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import styles from "../customer/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";

const Header = (props) => {
  const navigate = useNavigate();
  const fetchData = useFetch();
  const auth = useContext(UserContext);

  const handleFoodPage = () => {
    props.setBeveragePage(false);
    props.setCart(false);
    props.setFoodPage(true);
  };

  const handleBeveragePage = () => {
    props.setFoodPage(false);
    props.setCart(false);
    props.setBeveragePage(true);
  };

  const cartOrder = async () => {
    const res = await fetchData(
      "/item/cart",
      "GET",
      undefined,
      auth.accesstoken
    );
    if (res.ok) {
      console.log(res.data);
      props.setCartDetail(res.data);
      props.setFoodPage(false);
      props.setBeveragePage(false);
      props.setCart(true);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const returnFoodPage = () => {
    props.setCart(false);
    props.setBeveragePage(false);
    props.setFoodPage(true);
  };

  const returnRegisterPage = () => {
    props.setLogin(false);
    props.setRegister(true);
  };

  return (
    <>
      {props.header1 && (
        <div className={styles.header}>
          <Link to="/">
            <img
              src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
              className={styles.logo}
              onClick={returnRegisterPage}
            />
          </Link>
        </div>
      )}
      {props.header2 && (
        <div id="landing" className={styles.header}>
          <Link to="/">
            <img
              src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
              className={styles.logo}
              onClick={returnFoodPage}
            />
          </Link>
          <div className={styles.food} onClick={handleFoodPage}>
            <Link to="/food" className={styles.customLink1}>
              <p>Food</p>
            </Link>
          </div>
          <div className={styles.beverage} onClick={handleBeveragePage}>
            <Link to="/beverge" className={styles.customLink2}>
              <p>Beverage</p>
            </Link>
          </div>
          <Link to="/cart">
            <img
              src="/cart.256x256.png"
              className={styles.cart}
              onClick={cartOrder}
            />
          </Link>
          <p className={styles.p} onClick={cartOrder}>
            {props.arrayLength}
          </p>
          <button className={styles.displayname}>
            Hi, {props.user.username}!
          </button>
          <img src="/log-out-04.512x465.png" className={styles.logout} />
        </div>
      )}
      {props.header3 && (
        <div id="landing" className={styles.header3}>
          <Link to="/admin">
            <img
              src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
              className={styles.logo}
              onClick={returnFoodPage}
            />
          </Link>
        </div>
      )}
      {props.header4 && (
        <div id="landing" className={styles.header3}>
          <Link to="/admin">
            <img
              src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
              className={styles.logo}
            />
          </Link>
          <div className={styles.food1}>
            <Link to="/admin/food" className={styles.customLink1}>
              <p>Food</p>
            </Link>
          </div>
          <div className={styles.beverage1}>
            <Link to="/admin/beverage" className={styles.customLink2}>
              <p>Beverage</p>
            </Link>
          </div>
          <div className={styles.table}>
            <p>Table</p>
          </div>
          <Link to="/admin/cart">
            <img
              src="/cart.256x256.png"
              className={styles.cart}
              onClick={cartOrder}
            />
          </Link>
          <p className={styles.p} onClick={cartOrder}>
            {props.arrayLength}
          </p>
          <button className={styles.displayname}>
            Hi, {props.user.username}!
          </button>
          <img src="/log-out-04.512x465.png" className={styles.logout} />
        </div>
      )}
    </>
  );
};

export default Header;
