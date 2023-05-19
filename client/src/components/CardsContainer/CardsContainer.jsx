import Card from "../Card/Card";
import styles from './CardsContainer.module.css'
import { useCart } from "../../hooks/useCart";


const CardsContainer = (props) => {

    const { addToCart, removeFromCart, cart } = useCart()

    // const checkProductInCart = product => {
    //   return cart.some(item => item.id === product.id)
    // }
    // const isProductInCart = checkProductInCart(product)
  
    const handleAddToCart = (product)=>{
      addToCart(product)
      // console.log(cart)
      alert("Producto agregado al carrito")
    }
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
            />
        })}
    </div>
    )
};

export default CardsContainer;