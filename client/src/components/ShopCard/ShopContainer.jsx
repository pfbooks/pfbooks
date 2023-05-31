import React, { useState } from "react";
import Paginado from "../Paginado/Paginado";
import { ShopCard } from "./ShopCard";
import styles from "./ShopCard.module.css";

export const ShopContainer = ({ order }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const books = order.Books;
  const booksPerPage = 4;
  const lastIndex = currentPage * booksPerPage;
  const firstIndex = lastIndex - booksPerPage;
  const size = books.length / booksPerPage;
  const currentBooks = books.slice(firstIndex, lastIndex);
  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  return (
    <div key={order.id} className={styles.userCard}>
      <h5 className={styles.titleHeading2}>Order N° {order.id}</h5>
      <div className={styles.bookList}>
        <ul className={styles.bookListUl}>
          {currentBooks.map((b) => {
            return (
              <ShopCard
                id={b.id}
                image={b.image}
                title={b.title}
                quantity={b.quantity}
                price={b.price}
                key={b.id}
              />
            );
          })}
        </ul>
      </div>
      {books.length > 4 && <Paginado
        size={size}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />}
    </div>
  );
};
