import { useContext } from "react";
import { CartContext } from "../Context/cart";

export const UseCart = () => {
    const context = useContext(CartContext)

    if (context === undefined) {
        throw new Error('UseCart must be used within a CartProvider')
    }

    return context

}