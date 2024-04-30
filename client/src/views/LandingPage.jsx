import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from '../components/Carrousel/Carrousel';
import TopRated from '../components/TopRated/TopRated';
import { allBooks } from '../redux/actions/actions';


const LandingPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allBooks());

  }, [dispatch])

  return (
    <section className=' flex justify-center items-center my-10 flex-col'>
      <Carousel />
      <TopRated />
    </section>
  )
}

export default LandingPage