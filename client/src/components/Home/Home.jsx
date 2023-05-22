import CardsContainer from "../CardsContainer/CardsContainer";
import { sort, sortPrice, sortRating } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Paginado from "../Paginado/Paginado";
import Filters from "../Filters/Filters";
import styles from './Home.module.css'

const Home = () => {

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books);
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;
    const lastIndex = currentPage * booksPerPage
    const firstIndex = lastIndex - booksPerPage
    const size = books.length / booksPerPage

    const currentBooks = books.slice(firstIndex, lastIndex);




    const handlePageChange = (number)=> {
        setCurrentPage(number)
    }

    const handleSort = (event) => {
        dispatch(sort(event.target.value))
        setOrder(event.target.value + order)
        handlePageChange(1);
        
    }
    const handleRating = (event) => {
        dispatch(sortRating(event.target.value))
        setOrder(event.target.value + order)
        handlePageChange(1);
        
    }
    const handlePrice = (event) => {
        dispatch(sortPrice(event.target.value))
        setOrder(event.target.value + order)
        handlePageChange(1);
        
    }



    return (
        <div className={styles.homeContainer}>
            <br />
            <Filters handlePageChange={handlePageChange} />
            <br />

            <select className={styles.selectHome} onChange={event => handleSort(event)}>
                <option value="">Alphabetic</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
            </select>

            <select className={styles.selectHome} onChange={event => handleRating(event)}>
                <option value="">Rating</option>
                <option value="asc">Higher rating</option>
                <option value="dsc">Lower rating</option>
            </select>

            <select className={styles.selectHome} onChange={event => handlePrice(event)}>
                <option value="">Price</option>
                <option value="asc">Higher price</option>
                <option value="dsc">Lower price</option>
            </select>


            <CardsContainer
                books={currentBooks}
            />
            <Paginado size={size} handlePageChange={handlePageChange} currentPage={currentPage}/>

            </div>

    
        

    )
};

export default Home;

