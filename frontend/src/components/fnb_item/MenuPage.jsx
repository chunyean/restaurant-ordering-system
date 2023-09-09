import React, { useEffect, useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "../fnb_item/MenuPage.module.css";

const MenuPage = (props) => {
  const fetchData = useFetch();
  const [fnbItem, setFnbItem] = useState([]);
  const [category, setCategory] = useState("APPERTIZER");
  const [individualItem, setIndividualItem] = useState();
  const [showItemOverlay, setShowItemOverLay] = useState(false);
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
    const res = await fetchData("/item/getItem" + id, "POST");
    if (res.ok) {
      console.log(res);
      if (res.ok) {
        console.log(res.data);
        setIndividualItem(res.data);
      } else {
        alert(JSON.stringify(res.data));
      }
    }
  };

  const addItemToCart = () => {
    const tempValue = [...currCart, { id }];
    setCart(tempValue);
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
            <button onClick={addItemToCart(item[idx].id)}>Add</button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={styles.header}>
        <img
          src="/sei45-cafe-high-resolution-logo-color-on-transparent-background.png"
          className={styles.logo}
        />
        <div className={styles.food}>
          <p>Food</p>
        </div>
        <div className={styles.beverage}>
          <p>Beverage</p>
        </div>
        <img src="/cart.256x256.png" className={styles.cart} />
        <p>{cart.length}</p>
        {/* make drop dropdown */}
        <button className={styles.username}>Hi, {props.user.username}!</button>
        <img src="/log-out-04.512x465.png" className={styles.logout} />
      </div>
      <div className={styles.subcat}>
        <ul>{subFoods}</ul>
      </div>
      {listItem}
    </>
  );
};

export default MenuPage;
