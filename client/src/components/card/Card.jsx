import { Link } from "react-router-dom";
import styles from './Card.module.css'

const Card = (props) => {
    
    return (
        <div className={styles.cardContainer}>
            <Link to = {`/detail/${props.id}`}>
                <img src={props.image} alt={props.id} />
            </Link>
            <div className={styles.textContainer}>
                <p>{ props.title }</p>
                <p> Rating: {props.rating} </p>
                <p className={styles.priceText}>${ props.price }</p>
            </div>
        </div>
    )
};

export default Card;