import React, { useReducer, createContext } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cart.js';

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  });

  const removeFromCart = (product) => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  });

  const increaseQuantity = (product) => dispatch({
    type: 'INCREASE_QUANTITY',
    payload: product
  });

  const decreaseQuantity = (product) => dispatch({
    type: 'DECREASE_QUANTITY',
    payload: product
  });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return { state, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart };
}

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCartReducer();

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
