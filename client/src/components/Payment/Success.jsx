import React, { useEffect } from 'react'
import { useCart } from '../../hooks/useCart'



export const Success = () => {
    const { clearCart } = useCart();
    useEffect(() => {
        clearCart()
        
    }, [clearCart]);
  return (
    <div>
        <h1>Payment successfull</h1>
    </div>
  )
}
