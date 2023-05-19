import { useEffect,  } from 'react'
import axios from "axios";
import { useState } from "react";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-75896b1c-2143-43c1-82c4-274c670747f1');



// In this example i'm using React
// Other way to use this is using the script tag in the html file
// and then use the global variable window.MercadoPago

// Then some document.querySelector('.cho-container') to get the element
// and then use the mp.checkout() method

const endpoint= "http://localhost:3001"
const obj = {
    user: {
        name: 'Jorge',
        lastName: 'JImenez',
        email: 'jorge970102@test.com'
    },
    items: [{
        title: 'Prueba',
        description: 'Cien años de soledad',
        quantity: 2,
        unit_price: 20000
      },
      {
        title: 'Prueba2',
        description: 'Los hermanos kamarasov',
        quantity: 3,
        unit_price: 30000
      }]

      

}

const Payment = () => {
    const [prefrenceId, setPreference] = useState('')

    const pay = async() =>{
        const response = await axios.post(`${endpoint}/payment`, obj)
        setPreference(response.data)
        // console.log(prefrenceId)
    }
    useEffect(() => {
        pay()
        
    }, [obj]);


    const customization = {
        visual: {
            buttonBackground: 'black',
            borderRadius: '6px',
        },
       }

    return (

        <div>
          <Wallet initialization={{ preferenceId: prefrenceId, redirectMode: 'modal' }} customization={customization}  />

        </div>   
    )

}

export default Payment;