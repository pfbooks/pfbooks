import Card from "../Card/Card";
import styles from './CardsContainer.module.css'
import { useCart } from "../../hooks/useCart";
import { useEffect, useState } from "react";



const CardsContainer = (props) => {

    const { addToCart } = useCart()
    const [showNotification, setShowNotification] = useState(false);

    // const checkProductInCart = product => {
    //   return cart.some(item => item.id === product.id)
    // }
    // const isProductInCart = checkProductInCart(product)
  
    const handleAddToCart = (product)=>{
      addToCart(product)
      // console.log(cart)
      setShowNotification(true);
    }
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
    return (

    <div className={styles.Container}>
        {props.books && props.books.map(book => {
            return < Card
                key={book.id}
                id={book.id}
                title={book.title}
                image={book.image}
                price={book.price}
                rating={book.rating}
                handleAddToCart={handleAddToCart}
                showNotification={showNotification}
            />
        })}
    </div>
    )
};

export default CardsContainer;