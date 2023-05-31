import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { useCart } from "../../hooks/useCart";
import { useEffect, useState } from "react";

const CardsContainer = (props) => {
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);
  };

  useEffect(() => {
    let timeoutId;

    if (showNotification) {
      timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Duración de la animación o tiempo que deseas mostrar el cartelito
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showNotification]);

  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    if (!props.isLoading && props.books.length === 0) {
      const timeoutId = setTimeout(() => {
        setNoMatch(true);
      }, 1000); 
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setNoMatch(false);
    }
  }, [props.isLoading, props.books]);

  return (
    <div className={styles.Container}>
      {props.isLoading ? (
        <div className={styles.loading}>Cargando...</div>
      ) : props.books.length > 0 ? (
        props.books.map((book) => (
          <Card
            key={book.id}
            id={book.id}
            title={book.title}
            image={book.image}
            price={book.price}
            rating={book.rating}
            handleAddToCart={handleAddToCart}
            showNotification={showNotification}
          />
        ))
      ) : noMatch ? (
        <div className={styles.divNoMatch}>
          No se encontraron resultados para tu búsqueda
        </div>
      ) : null}
    </div>
  );
};

export default CardsContainer;
