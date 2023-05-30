import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bookById } from "../../redux/actions/actions";
import styles from "./Detail.module.css";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../Reviews/ReviewForm";
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

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user && user.adminRole; // Verificar si user no es null antes de acceder a adminRole
  // const userName = user && user.username;
  // console.log("User", user)
  const containerClass = userRole ? styles.containerAdmin : styles.container;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.imageContainer}>
          <img src={detail.image} alt={id} className={styles.image} />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>{detail.title}</h2>
          <p className={styles.author}>Author: {detail.author}</p>
          <p className={styles.genre}>Genres: {detail.genre}</p>
          <div className={styles.category}>{detail.category}</div>
          <p className={styles.description}>{detail.description}</p>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.topRightContainer}>
            <div className={styles.ratingContainer}>
              <p className={styles.ratingLabel}>Rating</p>
              <Stars rating={detail.rating} />
              <span className={styles.rating}>{detail.rating}</span>
            </div>
            <p className={styles.price}>$ {detail.price}</p>
          </div>
          <button className={styles.addToCartButton} onClick={handleAddToCart}>
            ADD TO CART
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
      {/* <ReviewForm bookId={detail.id} user={user}/> */}
      </div>
    </div>
  );
};

export default Detail;