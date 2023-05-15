import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { bookById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import styles from './Detail.module.css'
import { FaHome } from "react-icons/fa";
import NavBar from "../NavBar/NavBar";


const Detail = () => {

    const { id } = useParams()
    const detail = useSelector(state => state.detail)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(bookById(id))
    }, [dispatch, id])

    const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= detail.rating) {
      stars.push(
        <div
          key={i}
          className={styles.fullStar}
        />
      );
    } else {
      stars.push(
        <div
          key={i}
          className={styles.star}
        />
      );
    }
  }

    return(
      
      
          <div>
            <NavBar/>

        <div className={styles.container}>
            <img src={detail.image} alt={id} className={styles.image} />
            <div className={styles.details}>
                <h2 className={styles.title}>{detail.title}</h2>
                <p className={styles.author}>Author: {detail.author}</p>
                <hr/>
                <p className={styles.genre}>Genres: {detail.genre}</p>
                <hr />
                <p>Description: </p>
                <p className={styles.description}>{detail.description}</p>
                <div className={styles.ratingContainer}>
                    <div className={styles.starContainer}>{stars}</div>
                </div>
                <p className={styles.price}>$ {detail.price}</p>
                <Link to="/">
                    <FaHome className={styles["home-icon"]} style={{ color: "#04ab77" }}/>
                </Link>
            </div>
        </div>
          </div>
    )
}

export default Detail;