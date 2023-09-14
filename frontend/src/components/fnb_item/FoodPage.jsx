import React, { useEffect, useState, useContext } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "./MenuPage.module.css";
import ItemOverlay from "../overlay_item/ItemOverlay";
import UserContext from "../context/user";

const FoodPage = (props) => {
  const fetchData = useFetch();
  const auth = useContext(UserContext);
  const [fnbItem, setFnbItem] = useState([]);
  const [category, setCategory] = useState("APPERTIZER");
  // const [quantity, setQuantity] = useState(1);
  const [individualItem, setIndividualItem] = useState();

  const foodCate = ["APPERTIZER", "SOUP", "MAIN COURSE", "PASTA", "DESSERT"];

  // map food categories
  const subFoods = foodCate.map((subFood, idx) => {
    return (
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

  //retrieve each categories data
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

  // add each order to cart 
  const addOrder = async (id) => {
    const res = await fetchData(
      "/item/addorder/" + id,
      "PUT",
      {
        quantity: props.quantity,
      },
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.ok);
      lengthOfCart();
      props.setShowItemOverlay(false);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  // calculate the quanitty contain inside cart 
  const lengthOfCart = async () => {
    const res = await fetchData(
      "/item/length",
      "POST",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      props.setArrayLength(res.data);
    }
  };

  //list out each category data
  const listItem = fnbItem.map((item) => {
    return (
      <div key={item.id} className={styles.box}>
        <div className={styles.leftbox} />
        <div className={styles.rightbox} />
        <div
          id={item.id}
          onClick={() => {
            console.log(item);
            setIndividualItem(item);
            props.setShowItemOverlay(true);
          }}
        >
          <div className={styles.items}>
            <div className={styles.photo}>
              <img src={item.photo} />
            </div>
            <div className={styles.content}>
              <span>{item.name}</span>
              <span className={styles.price}>${item.price}</span>
              <p>{item.description}</p>
              <button
                className={styles.button}
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
      <div className={styles.subfood}>
        <ul>{subFoods}</ul>
      </div>
      {listItem}
      {props.showItemOverlay && (
        <ItemOverlay
          individualItem={individualItem}
          setQuantity={props.setQuantity}
          addOrder={addOrder}
          lengthOfCart={lengthOfCart}
          setShowItemOverlay={props.setShowItemOverlay}
        ></ItemOverlay>
      )}
    </>
  );
};

export default FoodPage;
