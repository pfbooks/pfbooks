import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from "react";
import { allAuthors, allBooks, allGenre, filterBooks } from "../../redux/actions/actions";
// import { Link } from "react-router-dom";



const Filters = ({handlePageChange}) => {


    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const authors = useSelector((state) => state.authors);
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
        if(event.target.name === 'genre') setGenre(event.target.value)
        if(event.target.name === 'author') setAuthor(event.target.value)
        // dispatch(filterBooks(genre, author))
        // setOrder(event.target.value)

        handlePageChange(1);
    }



    return(
        <div>

            <select onChange={ event => handleFilter(event)} name='genre' >
                <option value="">-select-</option>
                <option value="All">All</option>
                {genres.map(genre => {
                    return (
                        <option key={genre} value={genre} >{genre}</option>
                    )
                })}
            </select>

            <select onChange={ event => handleFilter(event)} name ='author'>
                <option value="">-select-</option>
                <option value="All">All</option>
                {authors.map(author => {
                    return (
                        <option key={author} value={author} >{author}</option>
                    )
                })}
            </select>

        </div>
    )
}

export default Filters;