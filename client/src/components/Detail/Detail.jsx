import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { bookById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import styles from './Detail.module.css'


const Detail = () => {

    const { id } = useParams()
    const detail = useSelector(state => state.detail)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(bookById(id))
    }, [dispatch, id])

    return(
        <div className={styles.container}>
            <img src={detail.image} alt={id} className={styles.image} />
            <div className={styles.details}>
                <h2 className={styles.title}>{detail.title}</h2>
                <p className={styles.author}>{detail.author}</p>
                <hr/>
                <p className={styles.genre}>{detail.genre}</p>
                <hr/>
                <p className={styles.description}>{detail.description}</p>
                <div className={styles.ratingPrice}>
                    <p className={styles.rating}>Rating: {detail.rating}</p>
                    <p className={styles.price}>$ {detail.price}</p>
                </div>
                <Link to='/' className={styles.button}>
                    Back to home
                </Link>
            </div>
        </div>
    )
}

export default Detail;