import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./Success.module.css";
import { useCart } from "../../hooks/useCart"
import axios from "axios";

const Success = () => {
  const { cart, clearCart } = useCart();
  const user = JSON.parse(window.localStorage.getItem("user"))
  const obj = {
    userId: user.id,
    // books: cart
    books: [
      {
        image:
          "https://www.gutenberg.org/cache/epub/394/pg394.cover.medium.jpg",
        id: 394,
        title: "Cranford",
        unit_price: 60,
        quantity: 2,
      },
      {
        image:
          "https://www.gutenberg.org/cache/epub/6761/pg6761.cover.medium.jpg",
        id: 6761,
        title: "The Adventures of Ferdinand Count Fathom — Complete",
        unit_price: 187,
        quantity: 3,
      },
      {
        image:
          "https://www.gutenberg.org/cache/epub/2160/pg2160.cover.medium.jpg",
        id: 2160,
        title: "The Expedition of Humphry Clinker",
        unit_price: 136,
        quantity: 1,
      },
    ],
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

  }, []);
  return (
    <div className={styles.container}>
      <FaCheckCircle className={styles.icon} />
      <h1 className={styles.title}>¡Pago Exitoso!</h1>
    </div>
  );
};

export default Success;
