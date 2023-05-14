import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBooks } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import CardsContainer from "../CardsContainer/CardsContainer";
import Paginado from "../Paginado/Paginado";
import Search from "../Search/Search";
import styles from "./Home.modules.css"; 

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const lastIndex = currentPage * booksPerPage;
  const firstIndex = lastIndex - booksPerPage;
  const size = books.length / booksPerPage;

  const currentBooks = books.slice(firstIndex, lastIndex);

  useEffect(() => {
    dispatch(allBooks());
  }, [dispatch]);

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  return (
    <>
      <NavBar handlePageChange={handlePageChange} />
      <div className={styles.container}> 
        <h1 className={styles.title}>BIENVENIDOS</h1> 
        <Paginado size={size} handlePageChange={handlePageChange} />
        <div className={styles.row}> 
          <CardsContainer books={currentBooks} />
        </div>
      </div>
    </>
  );
};

export default Home;
