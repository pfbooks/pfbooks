import React from "react";
import { useCart } from "../../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash, faDollarSign } from "@fortawesome/free-solid-svg-icons";

import styles from "./Chart.module.css";
import ButtonMP from "../Payment/ButtonMP";

const Chart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart({ id: productId });
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity({ id: productId });
  };

  const handleDecreaseQuantity = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity === 1) {
      handleRemoveFromCart(productId);
    } else {
      decreaseQuantity({ id: productId });
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.unit_price * product.quantity;
    });
    return total;
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div>
          <div className={styles.cartContainer}>
            {cart.map((product) => (
              <div key={product.id} className={styles.productContainer}>
                <img src={product.image} alt={product.title} />
                <div>
                  <h3>{product.title}</h3>
                  <p>Cantidad: {product.quantity}</p>
                  <p>Precio: ${product.unit_price}</p>
                  <div>
                    <button onClick={() => handleIncreaseQuantity(product.id)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button onClick={() => handleDecreaseQuantity(product.id)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
          <button className={styles.cleanButton} onClick={handleClearCart}>Limpiar carrito</button>
          <div className={styles.totalContainer}>
            <FontAwesomeIcon icon={faDollarSign} />
            <p>Total gastado: ${calculateTotal()}</p>
          </div>
          <div>
            <ButtonMP />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
