import React, { useContext, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../custom_hooks/useFetch";
import styles from "../customer/Header.module.css";
import Register from "./Register";

const Header = (props) => {
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

const returnRegisterPage = () =>{
  props.setLogin(false)
  props.setRegister(true)
}

  return (
    <>
      {props.showLanding && (
        <div className={styles.header}>
          <img
            src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
            className={styles.logo}
            onClick={returnRegisterPage}
          />
        </div>
      )}
      {!props.showLanding && (
        <div className={styles.header}>
          <img
            src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
            className={styles.logo}
            onClick={returnFoodPage}
          />
          <div className={styles.food} onClick={handleFoodPage}>
            <p>Food</p>
          </div>
          <div className={styles.beverage} onClick={handleBeveragePage}>
            <p>Beverage</p>
          </div>
          <img
            src="/cart.256x256.png"
            className={styles.cart}
            onClick={cartOrder}
          />
          <p className={styles.p} onClick={cartOrder}>{props.arrayLength}</p>
          {/* make drop dropdown */}
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
