import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookById } from "../../redux/actions/actions";
import styles from './Detail.module.css';
import Reviews from "../Reviews/Reviews";
import Stars from "../Reviews/Stars";
import { useCart } from "../../hooks/useCart";
import { RiShoppingCartLine } from "react-icons/ri";

const Detail = () => {
  const { id } = useParams();
  const detail = useSelector(state => state.detail);
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
      }, 3000); // Duración de la animación o tiempo que deseas mostrar el cartelito
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showNotification]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user && user.adminRole; // Verificar si user no es null antes de acceder a adminRole
  const containerClass = userRole ? styles.containerAdmin : styles.container;

  return (
    <div>
      <div className={containerClass}>
        <img src={detail.image} alt={id} className={styles.image} />
        <div className={styles.details}>
          <h2 className={styles.title}>{detail.title}</h2>
          <p className={styles.author}>Author: {detail.author}</p>
          <hr />
          <p className={styles.genre}>Genres: {detail.genre}</p>
          <hr />

          <p className={styles.description}>Description: {detail.description}</p>

          <Stars rating={detail.rating} />
          <span> Rating: {detail.rating}</span>
          <br />

          <p className={styles.price}>$ {detail.price}</p>
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
      </div>
      <div>
        <Reviews Reviews={detail.Reviews} />
      </div>
    </div>
  );
};

export default Detail;