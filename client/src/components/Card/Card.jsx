import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css';
import { RiShoppingCartLine } from 'react-icons/ri';

const Card = (props) => {


  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= props.rating) {
      stars.push(
        <div
          key={i}
          className={styles.fullStar}
        />
      );
    } else {
      stars.push(
        <div
          key={i}
          className={styles.star}
        />
      );
    }
  }

  return (
    <div className={styles.cardContainer}>
      <Link to={`/detail/${props.id}`}>
        <img src={props.image} alt={props.id} />
      </Link>
      <div className={styles.textContainer}>
        <p>{props.title}</p>
        <div className={styles.ratingContainer}>
          <div className={styles.starContainer}>{stars}</div>
        </div>
        <p className={styles.priceText}>${props.price}</p>
      </div>
      <br />
      <div className={styles.cardContainer2}>
      <div className={styles.cardContainer2}>
        <button
          className={styles.AddToCartButton}
          onClick={() =>
            props.handleAddToCart({
              image: props.image,
              id: props.id,
              title: props.title,
              unit_price: props.price,
            })
          }
        >
          <span className={styles.ButtonText}>Agregar al carrito </span>
          <span>&nbsp;</span>
          <RiShoppingCartLine className={styles.CartIcon} />
        </button>
        {props.showNotification && (
          <div className={styles.notification}>
            Producto agregado al carrito
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Card;






