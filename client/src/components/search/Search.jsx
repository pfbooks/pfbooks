import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bookByTitle } from "../../redux/actions/actions";
import styles from "./Search.modules.css";

const Search = ({handlePageChange}) => {

    const dispatch = useDispatch();
    const [title, setTitle]= useState('')

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
        <div className={`${styles.search} search`}>
            <input 
            type = 'text' placeholder="Search books" 
            value={title} 
            onChange={(e) => handleChange(e)}
            /> 
            <button onClick={(event) => handleSubmit(event)}>Search </button>
        </div>
    )

}

export default Search;
