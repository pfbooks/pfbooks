import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { RiShoppingCartLine } from "react-icons/ri";
import Stars from "../Reviews/Stars";

const Card = (props) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    props.handleAddToCart({
      image: props.image,
      id: props.id,
      title: props.title,
      unit_price: props.price,
    });
    setShowNotification(true);
  };

  return (
    <div className={styles.cardContainer}>
      <Link to={`/detail/${props.id}`}>
        <img src={props.image} alt={props.id} style={ {"width":"200px","height":"266px"}} />
      </Link>
    <hr/>
      <div className={styles.textContainer}>
        <p>{props.title}</p>
        <Stars rating={props.rating}/>
        <p className={styles.priceText}>${props.price}</p>
      </div>
      <button className={styles.AddToCartButton} onClick={handleAddToCart}>
        <span className={styles.ButtonText}>ADD TO CART </span>
        <span>&nbsp;</span>
        <RiShoppingCartLine className={styles.CartIcon} />
      </button>
      {showNotification && (
        <div className={styles.notification}>
          Product added successfully
        </div>
      )}
    </div>
  );
};

export default Card;
