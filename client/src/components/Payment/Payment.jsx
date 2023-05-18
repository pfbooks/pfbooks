import { useEffect,  } from 'react'
import axios from "axios";
import { useState } from "react";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-db48b08a-4c56-4fb8-8e6c-046a23871e3a');



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
        email: 'jorge970102@gmail.com'
    },
    items: [{
        title: 'Prueba',
        description: 'Cien años de soledad',
        quantity: 2,
        unit_price: 10
      },
      {
        title: 'Prueba2',
        description: 'Los hermanos kamarasov',
        quantity: 3,
        unit_price: 15
      }]

      

}
// const compra =       {
//     title: 'Prueba2',
//     quantity: 3,
//     unit_price: 15
//   }


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

       
    //     .then((res) => {window.open(res.data.init_point,'_modal')
    //     console.log(res.data.init_point)
    // })
    




    return (
        // <div>
        //     <button onClick={console.log(prefrenceId)}>buton</button>
        // </div>
        
           
<Wallet initialization={{ preferenceId: prefrenceId, redirectMode: 'modal' }}  />

       
    )

}

export default Payment;