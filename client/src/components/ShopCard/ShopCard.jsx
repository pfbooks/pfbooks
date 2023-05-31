import React from 'react'
import styles from "./ShopCard.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

export const ShopCard = ({id, image, title, quantity, price}) => {
  return (
    <li key={id} className={styles.bookItem}>
    <div className={styles.bookItemContainer}>
      <div className={styles.bookImageContainer}>
        <Link to={`/addReview/${id}`}>
          <img
            src={image}
            alt={id}
            className={styles.bookImage}
          />
        </Link>
      </div>
      <div className={styles.bookInfo}>
        <p className={styles.bookTitle}>{title}</p>
        <p>{quantity}</p>
        <p className={styles.price}>$ {price}</p>
      </div>
    </div>
  </li>
  )
}