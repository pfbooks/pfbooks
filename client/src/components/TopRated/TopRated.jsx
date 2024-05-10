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
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showNotification]);

  const books = useSelector((state) => state.books);
  const topRatedBooks = books.sort((a, b) =>
    a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0).slice(0, 5);


  return (

    <div className='flex flex-col justify-center m-[100px]'>

      <div className=' flex m-10'>
        <h1 className=' text-5xl font-bold'>TOP RATED BOOKS</h1>
      </div>


    <div className='grid grid-cols-3 grid-rows-2 h-auto w-auto m-10 gap-x-3 gap-y-3'>

        {topRatedBooks.map(book => {
          return (
            <div className=' col-start-auto row-start-acol-span-1 uto row-span-1' key={book.id}>

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
            </div>
          )
        })}

    
    </div>
    </div>

)
}

export default TopRated;
