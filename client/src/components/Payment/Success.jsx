import React, { useEffect } from 'react'
import { useCart } from '../../hooks/useCart'
import styles from "./Success.module.css"


export const Success = () => {
    const { clearCart } = useCart();
    useEffect(() => {
        clearCart()
        
    }, [clearCart]);
  return (
    <div className={styles.div-success}>
        <h1>Payment successfull</h1>
    </div>
  )
}