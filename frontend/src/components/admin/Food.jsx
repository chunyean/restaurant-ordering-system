import React, { useEffect, useState, useContext } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "../fnb_item/MenuPage.module.css";
import ItemOverlay from "../overlay_item/ItemOverlay";
import style from '../admin/Admin.module.css'
import UserContext from "../context/user";

const Food = (props) => {
  const handleHeader = () => {
    props.setHeader1(false);
    props.setHeader2(false);
    props.setRegister(false);
    props.setHeader4(true);
  };

  handleHeader();
  const fetchData = useFetch();
  const [fnbItem, setFnbItem] = useState([]);
  const [category, setCategory] = useState("APPERTIZER");
  const [quantity, setQuantity] = useState(1);
  const [individualItem, setIndividualItem] = useState();
  const [showItemOverlay, setShowItemOverlay] = useState(false);
  const auth = useContext(UserContext);

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

  const addOrder = async (id) => {
    const res = await fetchData("/item/addorder/" + id, "PUT", {
      quantity: props.quantity,
    });
    if (res.ok) {
      console.log(res.ok);
      lengthOfCart();
    } else {
      alert(JSON.stringify(res.data));
    }
  };

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
            setShowItemOverlay(true);
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
    <div className={style.background}>
      <div className={styles.subfood}>
        <ul>{subFoods}</ul>
      </div>
      {listItem}
      {showItemOverlay && (
        <ItemOverlay
          individualItem={individualItem}
          setQuantity={props.setQuantity}
          addOrder={addOrder}
          lengthOfCart={lengthOfCart}
          setShowItemOverlay={setShowItemOverlay}
        ></ItemOverlay>
      )}
    </div>
  );
};

export default Food;
