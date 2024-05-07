import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from '../components/Carrousel/Carrousel';
import TopRated from '../components/TopRated/TopRated';
import { allBooks, getFavorites } from '../redux/actions/actions';


const LandingPage = () => {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id

  useEffect(() => {
    dispatch(allBooks());

  }, [dispatch])

  useEffect(() => {
    if(userId){
      dispatch(getFavorites(userId));
    }

  }, [dispatch, userId])


  return (
    <section className=' flex justify-center items-center my-10 flex-col'>
      <Carousel />
      <TopRated />
    </section>
  )
}

export default LandingPage