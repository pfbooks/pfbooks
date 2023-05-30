import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Paginado from "../Paginado/Paginado";
import { ShopCard } from "./ShopCard";
import { useSelector } from "react-redux";

export const ShopContainer = ({ order }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const books = order.Books;
  const booksPerPage = 4;
  const lastIndex = currentPage * booksPerPage;
  const firstIndex = lastIndex - booksPerPage;
  const size = books.length / booksPerPage;
  const currentBooks = books.slice(firstIndex, lastIndex);
  const handlePageChange = (number)=> {
    setCurrentPage(number)
}

  return (
    <div key={o.id} className={styles.userCard} on>
    <Paginado  size={size} currentBooks={currentBooks} />
    <h5 className={styles.titleHeading2}>Order N° {o.id}</h5>
    <div className={styles.bookList}>
      <ul className={styles.bookListUl}>
        {order.Books.map((b) => {
          return (<ShopCard />
          );
        })}
      </ul>
    </div>
  </div>
  );
};
