import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { bookById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";



const Detail = () => {

    const { id } = useParams()
    const detail = useSelector(state => state.detail)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(bookById(id))
    }, [dispatch, id])

    return(
        <div>
            <Link to='/'>
            <button>Back to home</button>
            </Link>
            <p>Title:{detail.title}</p>
            <p>Author:{detail.author}</p>
            <p>Price:{detail.author}</p>
            <p>Genre:{detail.genre}</p>
            <p>Rating:{detail.rating}</p>
            <p>Description:{detail.description}</p>
            <img src={detail.image} alt={id}/>
        </div>
    )
}

export default Detail;