import { Link } from "react-router-dom";
import styles from "./Card.modules.css";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <Link to={`/detail/${props.id}`}>
        <img src={props.image} alt={props.id} />
      </Link>
      <p>{props.title}</p>
      <p className={styles.rating}>{props.rating}</p>
      <p>{props.price}</p>
    </div>
  );
};

export default Card;
