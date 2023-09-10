import React, { useState, useEffect, useContext } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "../fnb_item/MenuPage.module.css";
import UserContext from "../context/user";
import ItemOverlay from "../overlay_item/ItemOverlay";

const BeveragePage = (props) => {
  const fetchData = useFetch();
  const [category, setCategory] = useState("COCKTAIL");
  const [bevItem, setBevItem] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const auth = useContext(UserContext);
  const [individualItem, setIndividualItem] = useState();
  const [showItemOverlay, setShowItemOverlay] = useState(false);

  console.log();

  const beverageCate = [
    "COCKTAIL",
    "RED WINE",
    "WHITE WINE",
    "BOTTLE BEER",
    "SPIRIT",
    "SOFT DRINK",
    "JUICE",
  ];

  const subBeverage = beverageCate.map((subBev, idx) => {
    return (
      // if not work need to change value to button there
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
            setShowItemOverlay(true);
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
                  lengthOfCart;
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
  }, [category]);

  return (
    <>
      <div className={styles.subbev}>
        <ul>{subBeverage}</ul>
      </div>
      {listItem}
      {showItemOverlay && (
        <ItemOverlay
          individualItem={individualItem}
          setQuantity={setQuantity}
          addOrder={addOrder}
          lengthOfCart={lengthOfCart}
          setShowItemOverlay={setShowItemOverlay}
        ></ItemOverlay>
      )}
    </>
  );
};

export default BeveragePage;
