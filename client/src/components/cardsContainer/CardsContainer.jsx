import Card from "../Card/Card";

const CardsContainer = (props) => {
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
};

export default CardsContainer;