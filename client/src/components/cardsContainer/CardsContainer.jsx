import Card from "../Card/Card";
import styles from './Card.module.css'

const CardsContainer = (props) => {
    return (

    <div>
        {props.books && props.books.map(book => {
            return < Card
                key={book.id}
                id={book.id}
                title={book.title}
                image={book.image}
                price={book.price}
                rating={book.rating}
            />
        })}
    </div>
    )
};

export default CardsContainer;