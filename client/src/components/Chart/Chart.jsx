import React from 'react';
import { useCart } from '../../hooks/useCart';
import { RiCloseCircleFill } from 'react-icons/ri';
import styles from "./Chart.module.css"
import ButtonMP from '../Payment/ButtonMP';

const Chart = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart({ id: productId });
  };
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.unit_price;
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
                  <p>Precio: ${product.unit_price}</p>
                </div>
                <button className={styles.deleteButton} onClick={() => handleRemoveFromCart(product.id)}>
                  <RiCloseCircleFill />
                </button>
              </div>
            ))}
          </div>
          <p>Total gastado: ${calculateTotal()}</p>
          <div>
            <ButtonMP />
          </div>
        </div>
        
      )}
    </div>
  );
};

export default Chart;
