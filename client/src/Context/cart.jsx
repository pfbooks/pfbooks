import { createContext, useState } from "react";


//1- Crear contexto
export const CartContext = createContext()

// 2. Crear provider

export function CartProvider({ children }){
    const [cart, setCart] = useState([])

    // Añadir productos al carrito
    const addToCart = product => {
        const productInCartIndex = cart.findIndex(item => item.id === product.id)
        
        // Si el producto ya está en el carrito aumenta la cantidad
        if(productInCartIndex >= 0){
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1;
            setCart(newCart)
        }

        // Si no está en el carrito
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value = {{
            cart,
            addToCart,
            clearCart
        }}>
            { children }
        </CartContext.Provider>
    )

}
