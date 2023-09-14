import React, { useState, useEffect, useContext } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "../fnb_item/MenuPage.module.css";
import UserContext from "../context/user";
import ItemOverlay from "../overlay_item/ItemOverlay";

const BeveragePage = (props) => {
  const auth = useContext(UserContext);
  const fetchData = useFetch();
  const [category, setCategory] = useState("COCKTAIL");
  const [bevItem, setBevItem] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [individualItem, setIndividualItem] = useState();

  const beverageCate = [
    "COCKTAIL",
    "RED WINE",
    "WHITE WINE",
    "BOTTLE BEER",
    "SPIRIT",
    "SOFT DRINK",
    "JUICE",
  ];

  // list out all beverage categories name
  const subBeverage = beverageCate.map((subBev, idx) => {
    return (
      <li
        key={idx}
        value={subBev}
        onClick={() => {
          setCategory(subBev);
          everyCateData();
        }}
      >
        {subBev}
      </li>
    );
  });


  //retrive each category data from database
  const everyCateData = async () => {
    const res = await fetchData("/item/category", "POST", {
      value: category,
    });
    if (res.ok) {
      console.log(res.data);
      setBevItem(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };


  //add order to cart
  const addOrder = async (id) => {
    const res = await fetchData(
      "/item/addorder/" + id,
      "PUT",
      {
        quantity: quantity,
      },
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.ok);
      lengthOfCart();
      props.setShowItemOverlay(false)
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  //calculate the quantity of cart 
  const lengthOfCart = async () => {
    const res = await fetchData(
      "/item/length",
      "POST",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      props.setArrayLength(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const listItem = bevItem.map((item) => {
    return (
      <div key={item.id}>
        <div className={styles.leftbox} />
        <div className={styles.rightbox} />
        <div
          id={item.id}
          onClick={() => {
            console.log("item");
            setIndividualItem(item);
            props.setShowItemOverlay(true);
          }}
        >
          <div className={styles.items}>
            <div>
              <img src={item.photo} className={styles.drink} />
            </div>
            <div className={styles.content}>
              <span>{item.name}</span>
              <span className={styles.price}>${item.price}</span>
              <p>{item.description}</p>
              <button
                onClick={(event) => {
                  console.log("add");
                  event.stopPropagation();
                  addOrder(item.id);
                  lengthOfCart();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    everyCateData();
    lengthOfCart();
  }, [category]);

  return (
    <>
      <div className={styles.subbev}>
        <ul>{subBeverage}</ul>
      </div>
      {listItem}
      {props.showItemOverlay && (
        <ItemOverlay
          individualItem={individualItem}
          setQuantity={setQuantity}
          addOrder={addOrder}
          lengthOfCart={lengthOfCart}
          setShowItemOverlay={props.setShowItemOverlay}
        ></ItemOverlay>
      )}
    </>
  );
};

export default BeveragePage;
