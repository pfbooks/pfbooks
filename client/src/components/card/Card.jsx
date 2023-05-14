import { Link } from "react-router-dom";
import styles from './Card.module.css'

const Card = (props) => {
    
    return (
        <div>
            <Link to = {`/detail/${props.id}`}>
                <img src={props.image} alt={props.id} />
            </Link>
                <p>{ props.title }</p>
                <p> {props.rating} </p>
                <p>{ props.price }</p>
            </div>
    )
};

export default Card;