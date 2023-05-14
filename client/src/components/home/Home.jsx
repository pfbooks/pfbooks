import CardsContainer from "../CardsContainer/CardsContainer";
import { sort, sortPrice, sortRating } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Paginado from "../Paginado/Paginado";
import Filters from "../Filters/Filters";
import NavBar from "../NavBar/NavBar";

const Home = () => {

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books);
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;
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
        <>
      
            <h1>Home de Proyecto Books</h1>
            <NavBar handlePageChange={handlePageChange} />
            <Filters handlePageChange={handlePageChange}/>

            <select  onChange={event => handleSort(event)}>
                <option value="">-select-</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
            </select>

            <select  onChange={event => handleRating(event)}>
                <option value="">-select-</option>
                <option value="asc">Higher rating</option>
                <option value="dsc">Lower rating</option>
            </select>

            <select  onChange={event => handlePrice(event)}>
                <option value="">-select-</option>
                <option value="asc">Higher price</option>
                <option value="dsc">Lower price</option>
            </select>


            <Paginado size={size} handlePageChange={handlePageChange}/>
            <CardsContainer
                books={currentBooks}
            />
        </>
    )
};

export default Home;

