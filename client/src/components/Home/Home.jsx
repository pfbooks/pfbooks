import CardsContainer from "../CardsContainer/CardsContainer";
import { sort, sortPrice, sortRating } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Paginado from "../Paginado/Paginado";
import Filters from "../Filters/Filters";
import styles from './Home.module.css'
// import AdminBar from "../AdminBar/AdminBar";

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
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.adminRole;
    const containerClass = isAdmin ? styles.homeContainerAdmin : styles.homeContainer;




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
        <div className={containerClass}>
            <br />
            <div className={styles.divFilters1}>
                <Filters handlePageChange={handlePageChange} />
            </div>
            <br />

            <div className={styles.divFilters2}>
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
            </div>

            {currentBooks.length > 0 ?
                <CardsContainer books={currentBooks}/> :
                <div className={styles.divNoMach}> No se encontraron resultados para tu búsqueda </div>}
            <Paginado size={size} handlePageChange={handlePageChange} currentPage={currentPage}/>

            </div>

    
        

    )
};

export default Home;

