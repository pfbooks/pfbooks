import React, { useEffect, useState } from "react";
import styles from "./ShopList.module.css";
import { orderByIdUser } from "../../redux/actions/actions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Paginado from "../Paginado/Paginado";
import { ShopContainer } from "../ShopCard/ShopContainer";

const ShopList = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    dispatch(orderByIdUser(userId));
  }, [dispatch, userId]);

  const order = useSelector((state) => state.orderByUser);
  // const arrayBooks = order.map((o) => o.Books);
  // const arrBooks = arrayBooks.flat(2);

  // const handler = (id) => {
  //   setBookId(id);
  // };

  return (
    <div>
      <h1 className={styles.titleHeading}>
        {/* <FontAwesomeIcon icon={FaShoppingCart} className={styles.icon} /> */}
        My Shopping
      </h1>
      {order.length === 0 ? (
        <p>No hay compras realizadas.</p>
      ) : (
        <div className={styles.cardContainer}>
          {order.map((o) => {return (
              <ShopContainer
                order={o}
              />
          )})}
        </div>
      )}
      <div>
        <span className={styles.spanSelect}>
          {/* <FontAwesomeIcon icon={FaCalendarAlt} className={styles.icon} /> */}
          Select a book and leave us a review
        </span>
        {/* <select className={styles.select} onChange={(event) => handler(event)}>
          <option value="">Books</option>
          {arrBooks.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select> */}
      </div>

      {/* <ReviewForm user={user} bookId={bookId} setBookId={setBookId} /> */}
    </div>
  );
};

export default ShopList;
