import React, { useEffect, useState } from "react";
import styles from "./ShopList.module.css";
import { orderByIdUser } from "../../redux/actions/actions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
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
      <br />
        <br />
      
      {order.length === 0 ? (
        <p className={styles.pCompras}>No purchases made.</p>
      ) : (
      <div>
        <span className={styles.spanSelect}>
          Select a book and leave us a review
        </span>
        <div className={styles.cardContainer}>
          {order.map((o) => {return (
              <ShopContainer
                order={o}
                key={o.id}
              />
          )})}
        </div>

      </div>
      )}

    </div>
  );
};

export default ShopList;
