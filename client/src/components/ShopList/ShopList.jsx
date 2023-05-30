import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaMoneyBill, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./ShopList.module.css";
import { orderByIdUser } from "../../redux/actions/actions";
import usePagination from "@mui/material/usePagination/usePagination";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../Reviews/ReviewForm";

const ShopList = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [bookId, setBookId] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(orderByIdUser(userId));
  }, [dispatch, userId]);

  const order = useSelector((state) => state.orderByUser);
  const arrayBooks = order.map((o) => o.Books);
  const arrBooks = arrayBooks.flat(2);

  const handler = (event) => {
    setBookId(event.target.value);
  };

  return (
    <div>
      <h1 className={styles.titleHeading}> My shopping </h1>
      {order.length === 0 ? (
        <p>No hay compras realizadas.</p>
      ) : (
        <div className={styles.cardContainer}>
          {order.map((o) => (
            <div key={o.id} className={styles.userCard}>
              {/* <h1>Usuario: {o.User.name}</h1> */}
              <div className={styles.bookList}>
                {o.Books.map((b) => {
                  return (
                    <div key={b.id} className={styles.bookCard}>
                      <img src={b.image} alt={b.id} className={styles.bookImage} />
                      <div className={styles.bookInfo}>
                        <p>{b.title}</p>
                        <p>${b.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      <br />
      <div>
      <span className={styles.spanSelect}>Select a book and leave us a review</span>
      <select className={styles.select} onChange={(event) => handler(event)}>
        <option value="">Books</option>
        {arrBooks.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>

      </div>   

      <ReviewForm user={user} bookId={bookId} setBookId={setBookId} />
      <br />
    </div>
  );
};

export default ShopList;
