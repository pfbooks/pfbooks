import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from "react";
import { allAuthors, allBooks, allGenre, filterBooks } from "../../redux/actions/actions";
import styles from './Filters.module.css'
// import { Link } from "react-router-dom";



const Filters = ({handlePageChange}) => {


    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const authors = useSelector((state) => state.authors);
    const [order, setOrder] = useState('')
    const [genre, setGenre] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        dispatch(allBooks());
    }, [dispatch]);

    useEffect(() => {
          dispatch(filterBooks(genre, author));
      }, [dispatch, genre, author]);


    useEffect(() => {
        dispatch(allGenre());
    }, [dispatch]);
    useEffect(() => {
        dispatch(allAuthors());
    }, [dispatch]);




    const handleFilter = (event) => {
        console.log(event.target.value)
        console.log(event.target.name)
        if(event.target.name === 'genre' && event.target.value !== 'All') setGenre(event.target.value)
        if(event.target.name === 'author' && event.target.value !== 'All') setAuthor(event.target.value)
        setOrder(event.target.value + order)

        handlePageChange(1);
    }
    const handleAllBooks = (event) => {
        dispatch(allBooks())
        setGenre('')
        setAuthor('')
    }



    return(
        <div>

            <select className={styles.selectFilters} onChange={ event => handleFilter(event)} name='genre' >
                <option value="">By genre</option>
                
                {genres.map(genre => {
                    return (
                        <option key={genre} value={genre} >{genre}</option>
                    )
                })}
            </select>

            <select className={styles.selectFilters} onChange={ event => handleFilter(event)} name ='author'>
                <option value="">By author</option>
                
                {authors.map(author => {
                    return (
                        <option key={author} value={author} >{author}</option>
                    )
                })}
            </select>
            <button className={styles.buttonBooks} onClick={event => handleAllBooks(event)}>All books</button>

        </div>
    )
}

export default Filters;