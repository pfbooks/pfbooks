import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookById } from "../../redux/actions/actions";
import styles from "./Detail.module.css";
import Reviews from "../Reviews/Reviews";
import Stars from "../Reviews/Stars";
import { useCart } from "../../hooks/useCart";
import { RiShoppingCartLine } from "react-icons/ri";

const Detail = () => {
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookById(id));
  }, [dispatch, id]);

  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      image: detail.image,
      id: detail.id,
      title: detail.title,
      unit_price: detail.price,
    });
    setShowNotification(true);
  };

  useEffect(() => {
    let timeoutId;

    if (showNotification) {
      timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showNotification]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={detail.image} alt={id} className={styles.image} />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{detail.title}</div>
        <div className={styles.author}>Author: {detail.author}</div>
        <div className={styles.genre}>Genres: {detail.genre}</div>
        <div className={styles.description}>Description: {detail.description}</div>
        <Reviews className="reviews-container" Reviews={detail.Reviews} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.rating}>
          <Stars rating={detail.rating} />
          <span>Rating: {detail.rating}</span>
          
        </div>
        <div className={styles.price}>$ {detail.price}</div>
        <div className={styles.line}></div>
        <button className={styles.AddToCartButton} onClick={handleAddToCart}>
          <span className={styles.ButtonText}>ADD TO CART</span>
          <span>&nbsp;</span>
          <RiShoppingCartLine className={styles.CartIcon} />
        </button>
        {showNotification && <div className={styles.notification}>Product added successfully</div>}

      </div>
    
      

      
    </div>
  );
};

export default Detail;
