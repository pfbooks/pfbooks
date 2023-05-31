import CardsContainer from "../CardsContainer/CardsContainer";
import { sort, sortPrice, sortRating } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Paginado from "../Paginado/Paginado";
import Filters from "../Filters/Filters";
import styles from "./Home.module.css";
import Loading from "./Loader-unscreen.gif";

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const lastIndex = currentPage * booksPerPage;
  const firstIndex = lastIndex - booksPerPage;
  const size = books.length / booksPerPage;
  const [isLoading, setIsLoading] = useState(true);
  const currentBooks = books.slice(firstIndex, lastIndex);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.adminRole;
  const containerClass = isAdmin
    ? styles.homeContainerAdmin
    : styles.homeContainer;

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  const handleSort = (event) => {
    dispatch(sort(event.target.value));
    setOrder(event.target.value + order);
    handlePageChange(1);
  };

  const handleRating = (event) => {
    dispatch(sortRating(event.target.value));
    setOrder(event.target.value + order);
    handlePageChange(1);
  };

  const handlePrice = (event) => {
    dispatch(sortPrice(event.target.value));
    setOrder(event.target.value + order);
    handlePageChange(1);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return ( 
     <div className={containerClass}>
      {isLoading ? (
        <div>
            <img src={Loading} alt="LOADING GIF" className={styles.gif} />         
        </div>
      ) : (
        <>
          <br />
          <div className={styles.divFilters1}>
            <Filters handlePageChange={handlePageChange} />
          </div>
          <br />

          <div className={styles.divFilters2}>
            <select
              className={styles.selectHome}
              onChange={(event) => handleSort(event)}
            >
              <option value="">Alphabetic</option>
              <option value="asc">A-Z</option>
              <option value="dsc">Z-A</option>
            </select>

            <select
              className={styles.selectHome}
              onChange={(event) => handleRating(event)}
            >
              <option value="">Rating</option>
              <option value="asc">Higher rating</option>
              <option value="dsc">Lower rating</option>
            </select>

            <select
              className={styles.selectHome}
              onChange={(event) => handlePrice(event)}
            >
              <option value="">Price</option>
              <option value="asc">Higher price</option>
              <option value="dsc">Lower price</option>
            </select>
          </div>

          <CardsContainer
            books={currentBooks}
            isLoading={isLoading}
            size={size}
            handlePageChange={handlePageChange}
            currentPage={currentPage}

          />
          {books.length > 0 && <Paginado  size={size} currentPage={currentPage}  handlePageChange={handlePageChange}/>}
        </>
      )}
    </div>
  );
};

export default Home;
