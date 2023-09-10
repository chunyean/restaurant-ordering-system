import React from "react";
import styles from "../overlay_item/Overlay.module.css";

const ItemOverlay = (props) => {
  const handleQuantity = (e) => {
    props.setQuantity(e.target.value);
    console.log(e.target.value);
  };

  const closeOverlay = () => {
    props.setShowItemOverlay(false);
  };
  console.log(props.individualItem.id);
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <p onClick={closeOverlay}>x</p>
          <div className={styles.photo}>
            <img src={props.individualItem.photo} />
          </div>
          <div className={styles.content}>
            <div className={styles.column1}>
              <div className={styles.name}>{props.individualItem.name}</div>
              <div className={styles.description}>
                {props.individualItem.description}
              </div>
            </div>
            <div className={styles.column2}>
              <div className={styles.price}>${props.individualItem.price}</div>
              <select className={styles.select} onClick={handleQuantity}>
                <option></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <button
                className={styles.btn}
                onClick={() => {
                  console.log("add");
                  props.addOrder(props.individualItem.id);
                  props.lengthOfCart;
                  props.setShowOverlay;
                  props.setShowItemOverLay(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemOverlay;
