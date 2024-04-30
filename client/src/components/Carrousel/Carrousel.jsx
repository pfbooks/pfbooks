import React, { useEffect, useRef, useState } from 'react';
import { data } from '../../assets/data';
import { GoDotFill } from "react-icons/go";


const Carousel = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect( () =>{
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];
    if(imgNode){
      imgNode.scrollIntoView({
        inline: "start",
        behavior: "smooth"
      })
    }
  },[currentIndex])

  const handleScroll = (value) =>{
    if(value === 'prev'){
      setCurrentIndex(current => {
        const isFirstImage = currentIndex === 0;
        return isFirstImage ? data.length -1 : current - 1;
      })
    } else{
        setCurrentIndex(current => {
          const isLastImage = currentIndex === data.length - 1;
          return isLastImage ? 0 : current + 1;
        })
    }
  }

  const handleDot = (index) =>{
    setCurrentIndex(index);
  }

  return (
    <div className=' w-[95%] h-[400px] m-0'>
      <div className=' relative h-full'>
        <div onClick={() => handleScroll('prev')} className=' absolute top-[50%] z-10 left-8 transform -translate-y-1/2 text-5xl font-bold text-white cursor-pointer'>&#8249;</div>
        <div onClick={() => handleScroll('next')} className=' absolute top-[50%] z-10 right-8 transform -translate-y-1/2 text-5xl font-bold text-white cursor-pointer'>&#8250;</div>
        <div className=' w-full h-full rounded-[20px] border border-solid border-slate-200 overflow-hidden'>
        <ul ref={listRef} className="flex overflow-hidden m-0 p-0 w-full">
          {data.map((b) => (
            <li key={b.id} className="flex-shrink-0 w-full">
              <img src={b.url} className="w-full h-auto" alt={b.name}/>
            </li>
          ))}
        </ul>
        {/* <ul ref={listRef}>
            {
                data.map( (b) => {
                  return(
                    <li key={b.id}>
                      <img src={b.url} style={{ width: '100%', height: 'auto' }} alt={b.name}/>
                    </li>
                  )
                })      
            }
          </ul>*/}

        </div>
          <div className=' flex justify-center'>
              {
                data.map( ( __ , index ) => (
                 <div onClick={ () => handleDot(index) } key={index} className={` flex justify-center  items-center cursor-pointer text-xl text-center my-2 relative w-5 h-5 mx-1 ${index === currentIndex ? ' bg-zinc-400  rounded-full ' : '' }`}>
                     <span className="absolute inset-0 flex items-center justify-center" >
                     <GoDotFill />
                    </span>
                 </div> 
                ))
              }
          </div>
      </div>
    </div>
  );
};

export default Carousel;


/*${currentIndex === index ? 'bg-zinc-400 w-4 h-4 rounded-full' : ''}*/