import CardsContainer from "../CardsContainer/CardsContainer";
import { allBooks } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Paginado from "../Paginado/Paginado";

export const Home = () => {

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;
    const lastIndex = currentPage * booksPerPage
    const firstIndex = lastIndex - booksPerPage
    const size = books.length / booksPerPage

    const currentBooks = books.slice(firstIndex, lastIndex);

    useEffect(() => {
        dispatch(allBooks());
    }, [dispatch]);

    const handlePageChange = (number)=> {
        setCurrentPage(number)
    }

    return (
        <>
            <h1>Home de Proyecto Books</h1>
            <Paginado size={size} handlePageChange={handlePageChange}/>
            <CardsContainer
                books={currentBooks}
            />
        </>
    )
};

// export default Home;