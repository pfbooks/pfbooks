import CardsContainer from "../CardsContainer/CardsContainer";
import { allAuthors, allBooks, allGenre, filterBooks, sort } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Paginado from "../Paginado/Paginado";
import Filters from "../Filters/Filters";

export const Home = () => {

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
        setOrder(event.target.value)
        handlePageChange(1);
    }



    return (
        <>
            <h1>Home de Proyecto Books</h1>
            <Filters handlePageChange={handlePageChange}/>

            <select  onChange={event => handleSort(event)}>
                <option value="">-select-</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
            </select>


            <Paginado size={size} handlePageChange={handlePageChange}/>
            <CardsContainer
                books={currentBooks}
            />
        </>
    )
};

// export default Home;