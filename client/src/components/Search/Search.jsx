import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bookByTitle } from "../../redux/actions/actions";
import styles from './Search.module.css';
import { FiSearch } from 'react-icons/fi';


const Search = ({handlePageChange}) => {

    const dispatch = useDispatch();
    const [title, setTitle]= useState('')

    // const handleInputChange = (event) => {

    //     setTitle(event.target.value)
    //     dispatch(bookByTitle(event.target.value))
    //     handlePageChange(1)

    // }
    function handleChange(e) {
        setTitle(e.target.value);
      }
    

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(bookByTitle(title))
        setTitle('')
        handlePageChange(1);
    }

    return (
        <div className={styles.search}>
            <input className={styles.searchInput}
            type = 'text' placeholder="Search books" 
            value={title} 
            onChange={(e) => handleChange(e)}
            
            /> 
            <button className={styles.searchButton} onClick={(event) => handleSubmit(event)}> <FiSearch style={{ color: "white" }}/></button>
        </div>
    )

}

export default Search;