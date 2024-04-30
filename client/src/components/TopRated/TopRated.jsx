import React from 'react'
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import { useCart } from '../../hooks/useCart';
import { useEffect, useState } from 'react';

function TopRated() {

    const { addToCart } = useCart();
    const [showNotification, setShowNotification] = useState(false);
  
    const handleAddToCart = (product) => {
      addToCart(product);
      setShowNotification(true);
    };
  
    useEffect(() => {
      let timeoutId;
  
      if (showNotification) {
        timeoutId = setTimeout(() => {
          setShowNotification(false);
        }, 3000); // Duración de la animación o tiempo que deseas mostrar el cartelito
      }
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [showNotification]);

    const books = useSelector((state) => state.books);
    const topRatedBooks = books.sort((a, b) =>
        a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0).slice(0,5);

    
    return (
        <div>TopRated

            <div>
                <ul>
                    {topRatedBooks.map(book => {
                        return (
                            <Card
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            image={book.image}
                            price={book.price}
                            rating={book.rating}
                            handleAddToCart={handleAddToCart}
                            showNotification={showNotification}
                          />
                            
                            
                        )
                    })}
                </ul>
                
            </div>

        </div>
    )
}

export default TopRated;