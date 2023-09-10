import React, { useEffect, useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "../fnb_item/MenuPage.module.css";

const FoodPage = (props) => {
  const fetchData = useFetch();
  const [fnbItem, setFnbItem] = useState([]);
  const [category, setCategory] = useState("APPERTIZER");
  const [quantity, setQuantity] = useState(1);
  const [individualItem, setIndividualItem] = useState();
  const [showItemOverlay, setShowItemOverLay] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const foodCate = ["APPERTIZER", "SOUP", "MAIN COURSE", "PASTA", "DESSERT"];

  const everyCateData = async () => {
    const res = await fetchData("/item/category", "POST", {
      value: category,
    });
    if (res.ok) {
      console.log(res.data);
      setFnbItem(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const subFoods = foodCate.map((subFood, idx) => {
    return (
      // if not work need to change value to button there
      <li
        key={idx}
        value={subFood}
        onClick={() => {
          setCategory(subFood);
          everyCateData();
        }}
      >
        {subFood}
      </li>
    );
  });

  const itemOverlay = async () => {
    const res = await fetchData("/item/getItem/" + id, "POST");
    if (res.ok) {
      console.log(res.data);
      setIndividualItem(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const addOrder = async () => {
    const res = await fetchData("/item/addorder/" + id, "PUT", {
      quantity: quantity,
    });
    if (res.ok) {
      console.log(res.ok);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const lengthOfCart = async () => {
    const res = await fetchData("/length");
    if (res.ok) {
      props.setArrayLength(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const listItem = fnbItem.map((item, idx) => {
    return (
      <div
        key={item[idx].id}
        id={item[idx].id}
        onClick={() => {
          setShowItemOverLay(true);
          itemOverlay(item[idx].id);
        }}
      >
        <div className={styles.items}>
          <div className={styles.photo}>
            <img src={item[idx].photo} />
          </div>
          <div className={styles.content}>
            <span>{item[idx].name}</span>
            <span className={styles.price}>${item[idx].price}</span>
            <p>{item[idx].description}</p>
            <button
              onClick={() => {
                addOrder(item[idx].id);
                lengthOfCart();
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* <div className={styles.header}>
        <img
          src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
          className={styles.logo}
        />
        <div className={styles.food} onClick={props.handleFoodPage}>
          <p>Food</p>
        </div>
        <div className={styles.beverage} onClick={props.handleBeveragePage}>
          <p>Beverage</p>
        </div>
        <img
          src="/cart.256x256.png"
          className={styles.cart}
          onClick={cartOrder}
        />
        <p className={styles.p}>{props.arrayLength}</p>
        make drop dropdown
        <button className={styles.username}>Hi, {props.user.username}!</button>
        <img src="/log-out-04.512x465.png" className={styles.logout} />
      </div> */}
      <div className={styles.subcat}>
        <ul>{subFoods}</ul>
      </div>
      <div>{listItem}</div>
    </>
  );
};

export default FoodPage;
