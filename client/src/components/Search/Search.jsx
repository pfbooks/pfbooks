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
        // <div className={styles.search}>
        //     <input className={styles.searchInput}
        //     type = 'text' placeholder="Search books" 
        //     value={title} 
        //     onChange={(e) => handleChange(e)}
            
        //     /> 
        //     <button className={styles.searchButton} onClick={(event) => handleSubmit(event)}> <FiSearch style={{ color: "white" }}/></button>
        // </div>
        <div className="form-control relative ">
        <input 
            type="text" 
            placeholder="Search" 
            className="input input-bordered w-24 md:w-auto"
            onChange={(e) => handleChange(e)}
            value={title} />
            <div className=" absolute right-2 top-3 border-l-2">
                <button className=" mx-2" onClick={(event) => handleSubmit(event)}> <FiSearch style={{ color: "black" }}/></button>
            </div>
      </div>
    )

}

export default Search;