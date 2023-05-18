import React from "react";
import {styles} from "./Card.module.css"
import { Link } from "react-router-dom";
// import { UseCart } from "../../hooks/UseCart";

const Card = (props) => {
  // const [addToCart, cart] = UseCart()
  // console.log(cart)



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
      {/* <button onClick={addToCart}>Añadir al carrito</button> */}
    </div>
  );
};

export default Card;






