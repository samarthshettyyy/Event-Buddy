
"use client";

import { Carousel } from "flowbite-react";
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.webp'
import image3 from '../assets/image3.jpg'
import image4 from '../assets/Event.jpg'
import image5 from '../assets/Event1.jpeg'

const FlowCarousel=()=> {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <h1>Our reviews</h1>
      <Carousel slideInterval={1000}>
        
        <img src={image1} alt="..." />
        <img src={image2} alt="..." />
        <img src={image3} alt="..." />
        <img src={image4} alt="..." />
        <img src={image5} alt="..." />
      </Carousel>
    </div>
  );
}
export default FlowCarousel;
