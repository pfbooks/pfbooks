import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./Success.module.css";
import { useCart } from "../../hooks/useCart"

const Success = () => {
  const { cart, clearCart } = useCart();
  useEffect(() => {
      clearCart()
      
  }, [clearCart]);
  return (
    <div className={styles.container}>
      <FaCheckCircle className={styles.icon} />
      <h1 className={styles.title}>¡Pago Exitoso!</h1>
    </div>
  );
};

export default Success;