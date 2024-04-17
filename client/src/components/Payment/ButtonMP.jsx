import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import styles from "./ButtonMP.module.css";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("TEST-75896b1c-2143-43c1-82c4-274c670747f1");

// In this example i'm using React
// Other way to use this is using the script tag in the html file
// and then use the global variable window.MercadoPago

// Then some document.querySelector('.cho-container') to get the element
// and then use the mp.checkout() method

const endpoint = "http://localhost:3001";
// const obj = {
//     user: {
//         name: 'Jorge',
//         lastName: 'JImenez',
//         email: 'jorge970102@test.com'
//     },
//     items: cart
// }

const ButtonMP = () => {
  const [prefrenceId, setPreference] = useState("");
  const { cart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));
  const obj = {
    user: {
      name: user.name,
      surname: user.lastName,
      email: user.email,
    },
    items: cart,
  };

  const pay = async () => {
    const response = await axios.post(`${endpoint}/payment`, obj);
    setPreference(response.data);
  };
  useEffect(() => {
    pay();
  }, [cart]);

  const customization = {
    // visual: {
    //     buttonBackground: 'white',
    //     borderRadius: '6px',
    //     buttonHeight: "48px"
    // },
    checkout: {
      theme: {
        elementsColor: "#04ab77",
        headerColor: "#04ab77",
      },
    },
  };

  return (
    <div id="button-mp" className={styles["div-mp"]}>
      <Wallet
        id="button-mp"
        initialization={{ preferenceId: prefrenceId, redirectMode: "modal" }}
        customization={customization}
      />
    </div>
  );
};

export default ButtonMP;
