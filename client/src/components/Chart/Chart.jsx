import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faTrashAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import styles from "./Chart.module.css";
import ButtonMP from "../Payment/ButtonMP";
import { CartContext } from "../../context/cart";

const Chart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart(CartContext);
  const handleRemoveFromCart = (productId) => {
    removeFromCart({ id: productId });
  };
  const history = useHistory();
  const handleIncreaseQuantity = (productId) => {
    increaseQuantity({ id: productId });
  };

  const handleDecreaseQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product && product.quantity === 1) {
      handleRemoveFromCart(productId);
    } else {
      decreaseQuantity({ id: productId });
    }
  };
  const [isLogged, setIsLogged] = useState(false);
  const handleClearCart = () => {
    clearCart();
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const handleMP = () => {
    if (!user) {
      history.push("/login");
    }
    setIsLogged(true);
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
      <h2 className={styles.title}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className={styles.emptyCartContainer}>
          <p>No products yet</p>
          <Link to="/">
            <button className={styles.buttonEmptyCart}>Go Shopping</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className={styles.cartContainer}>
            {cart.map((product) => (
              <div key={product.id} className={styles.productContainer}>
                <img src={product.image} alt={product.title} />
                <div>
                  <h3>{product.title}</h3>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ${product.unit_price}</p>
                  <div>
                    <button onClick={() => handleIncreaseQuantity(product.id)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
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
          <div className={styles.totalClear}>
            <div className={styles.totalContainer}>
              <h3>Total: </h3>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <FontAwesomeIcon icon={faDollarSign} className={styles.icon} />
              <p className={styles.total}>{calculateTotal()}</p>
            </div>
            <button className={styles.cleanButton} onClick={handleClearCart}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className={styles.buttonIcon}
              />
              Clean cart
            </button>
          </div>
          <div className={styles.botones}>
            <div>
              {!isLogged && (
                <button className={styles.buttonMp} onClick={handleMP}>
                  Go to pay
                </button>
              )}
              {isLogged && <ButtonMP />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
