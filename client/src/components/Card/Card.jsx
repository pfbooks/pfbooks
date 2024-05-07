import { Link } from 'react-router-dom/cjs/react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Stars from '../Reviews/Stars';
import { useDispatch, useSelector } from 'react-redux';
import {addFavorite, deleteFavorite } from '../../redux/actions/actions';

function Card(props) {
  const [showNotification, setShowNotification] = useState(false);
  const favorites = useSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(null); 
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id

  useEffect(() => {
    if(user?.id) {
      if(favorites.includes(props.id)) {
        setIsFavorite(true);
      } else { setIsFavorite(false);}

    }
  }, [setIsFavorite, favorites, props.id, user?.id])
  

  const handleAddToCart = () => {
    props.handleAddToCart({
      image: props.image,
      id: props.id,
      title: props.title,
      unit_price: props.price,
    });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  };

  const handleFavorites = () => {
    if(user?.id) {
      let bookId = props.id;

      if(isFavorite) {
        dispatch(deleteFavorite(userId,bookId))
        return setIsFavorite(false);
      } else {
        dispatch(addFavorite(userId, props.id))
        return setIsFavorite(true);
      }

    }

  }

  return (


    <div className=' col-start-auto row-start-auto col-span-1 row-span-1'>

      <div className="relative max-w-sm min-w-[340px] min-h-[280px] bg-white shadow-md rounded-md p-2 mx-1 my-3">
        <div className="overflow-x-hidden rounded-2xl relative">
          <Link to={`/detail/${props.id}`}>
            <img className="h-40 rounded-2xl w-full object-cover" src={props.image} alt={props.id} />
          </Link>
          <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group" onClick={handleAddToCart}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </p>
          {showNotification && (
            <div className=" absolute bottom-0 right-0 p-2.5 bg-black bg-opacity-80 text-white text-sm font-bold rounded animate-fadeOut">
              Product added successfully
            </div>
          )}
        </div>
        <div className="mt-4 pl-2 mb-2 flex justify-between">
          <Link to={`/detail/${props.id}`}>
            <div>
              <div className=' flex flex-row'>
              <Stars rating={props.rating} />
              </div>
              <p className={`text-lg font-semibold text-gray-900 mb-0 truncate`}>{truncate(props.title)}</p>
              <p className="text-md text-gray-800 mt-0">${props.price}</p>
            </div>
          </Link>
          <div className="absolute right-2 bottom-[20px]  mb-1 mr-4 cursor-pointer" onClick={handleFavorites}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill={`${isFavorite ? "#04ab77" : "none"}`} viewBox="0 0 24 24" stroke={`${isFavorite ? "#04ab77" : "gray"}`}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Card;



function truncate(text, maxLength = 28) {
  if (text.length <= maxLength) {
      return text; 
  } else {
      return text.substring(0, maxLength) + '...';
  }
}
