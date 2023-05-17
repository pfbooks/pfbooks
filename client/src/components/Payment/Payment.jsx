import { useEffect,  } from 'react'
import axios from "axios";
import { useState } from "react";


// In this example i'm using React
// Other way to use this is using the script tag in the html file
// and then use the global variable window.MercadoPago

// Then some document.querySelector('.cho-container') to get the element
// and then use the mp.checkout() method

const endpoint= "http://localhost:3001"
  const user = {
    name: 'Jorge',
    lastName: 'JImenez',
    email: 'jorge970102@gmail.com'
  }
  const compra = {
    title: 'Prueba',
    quantity: 2,
    unit_price: 10
  }


const Payment = () => {

    const pay = () =>{
        axios.post(`${endpoint}/payment`, compra)
        .then((res) => {window.open(res.data.init_point,'_modal')

        console.log(res.data.init_point)
    })
    }




    return (
        <div>
            <button onClick={() => pay()}> Comprar</button>
        </div>
    )

}

export default Payment;