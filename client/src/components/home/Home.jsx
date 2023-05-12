import CardsContainer from "../cardsContainer/CardsContainer";
import { allBooks } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Home = () => {

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books);
    const currentBooks = "a definir en el paginado";

    useEffect(() => {
        dispatch(allBooks());
    }, [dispatch]);

    return (
        <>
            <h1>Home de Proyecto Books</h1>
            <CardsContainer
                books={books}
            />
        </>
    )
};

// export default Home;