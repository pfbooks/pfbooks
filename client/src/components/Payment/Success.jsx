import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./Success.module.css";
import { useCart } from "../../hooks/useCart"
import axios from "axios";
import { Link } from "react-router-dom";

const Success = () => {
  const { cart, clearCart } = useCart();
  const user = JSON.parse(window.localStorage.getItem("user"))
  const obj = {
    userId: user.id,
    books: cart
  };
  
  useEffect(() => {
    const axiosFunc = async() =>{
      await axios.post('http://localhost:3001/order/add', obj)
      .then(res => console.log(res))
      .catch(error => console.log(`error del post: ${error}`))

    }
    console.log(obj)
    axiosFunc()

    clearCart()

  },);
  return (
    <div className={styles.container}>
      <FaCheckCircle className={styles.icon} />
      <h1 className={styles.title}>¡Pago Exitoso!</h1>
      <Link to={`/shop/${user.id}`}>
        <button className={styles.buttonLink}>My Shop</button>
      </Link>
    </div>
  );
};

export default Success;
