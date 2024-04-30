import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import styles from "./ButtonMP.module.css";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("TEST-85f9b50d-0f48-4873-829d-2239d74e8c1a");


const endpoint = process.env.REACT_APP_ENV === 'develop' ? 'http://localhost:3001' : "https://pfbooks.onrender.com";


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
