import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";

const CardsContainer = (props) => {
  return (
    <div className={styles["cards-container"]}>
      {props.books &&
        props.books.map((book) => {
          return (
            <Card
              key={book.id}
              id={book.id}
              title={book.title}
              image={book.image}
              price={book.price}
              rating={book.rating}
              className={styles.card}
            />
          );
        })}
    </div>
  );
};

export default CardsContainer;
