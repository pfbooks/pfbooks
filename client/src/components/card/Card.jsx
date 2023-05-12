import { Link } from "react-router-dom";

const Card = (props) => {
    
    return (
        <Link key = { props.id } to = {`/detail/${props.id}`}>
            <div>
                <img src={props.image} alt="image" />
                <p>{ props.title }</p>
                <p> {props.rating} </p>
                <p>{ props.price }</p>
            </div>
        </Link>
    )
};

export default Card;