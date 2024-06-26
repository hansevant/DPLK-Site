import React, { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Slider from "react-slick";
import SliderCard from './Card/SliderCard';
import axios from 'axios';

const Testi = () => {

  const uri = process.env.REACT_APP_BACKEND_URL;

  const [data, setData] = useState([]);

  const getTesti = async () => {
    try {
      const res = await axios.get(uri + '/testi');
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching testi:', error);
    }
  }

  useEffect(() => {
    getTesti();
    // eslint-disable-next-line
  }, [])

  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: null, // Set to null to hide the previous arrow
    nextArrow: null, // Set to null to hide the next arrow
  };
  
  return (
    
    <div className="container my-12 mx-auto md:px-6">
        <h5 className="text-center text-sky-800 text-sm font-bold font-['DM Sans'] uppercase leading-tight tracking-widest">Testimonial</h5>
        <h2 className="text-center mt-2 mb-12 text-gray-700 text-3xl font-bold font-['DM Sans'] leading-10">Dengarkan Cerita Mereka</h2>

        <div className="slider-container text-center">

            <Slider ref={sliderRef} {...settings}>
                {data.map((testi) => (
                <SliderCard key={testi.id} img={testi.img} position={testi.position} name={testi.name} star={testi.star} />
                ))}
            </Slider>

            <div className="slider-controls mt-4 flex justify-center">
                <button className="slider-button text-4xl text-slate-300 hover:text-slate-400 transition py-2 px-4 rounded" onClick={previous}>
                <FiArrowLeft/>
                </button>
                <button className="slider-button text-4xl text-slate-300 hover:text-slate-400 transition py-2 px-4 rounded" onClick={next}>
                <FiArrowRight />
                </button>
            </div>
        </div>

    </div>
  )
}

export default Testi