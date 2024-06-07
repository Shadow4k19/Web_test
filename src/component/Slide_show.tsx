import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Slide {
  url: string;
}

interface SlideShowProps {
  slideData: Slide[];
  transitionTime?: number;
  dotColor?: string;
}

const Slidestyle = styled.div`
  .slide-show {
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  
  .slide-show-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 100%;
    height: 100%;
  }
  
  .slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .slide.active {
    opacity: 1;
    position: relative;
  }
  
  .slide img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
  
  .slide-show-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
  }

  .dot.active {
    opacity: 1;
  }
  
  .container {
    position: relative;
  }
  
  .slide-show-controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
  }
  
  .prev-button,
  .next-button {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 90px;
  }
  
  .prev-button:hover,
  .next-button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .left-arrow {
    font-size: 30px;
    border-width: 10px 15px 10px 0;
    border-color: transparent white transparent transparent;
  }
  
  .right-arrow {
    font-size: 30px;
    border-width: 10px 0 10px 15px;
    border-color: transparent transparent transparent white;
  }

  @media screen and (max-width: 1000px){
    .slide img{
      height: 400px;
    }
  }
  
  @media screen and (max-width: 800px){
    .slide img{
      height: 300px;
    }
  }
  
  @media screen and (max-width: 600px){
    .slide img{
      height: 270px;
    }
  }
  
  @media screen and (max-width: 500px){
    .slide img{
      height: 230px;
    }
  }
  
  @media screen and (max-width: 400px){
    .slide img{
      height: 200px;
    }
  }
`;

const SlideShow: React.FC<SlideShowProps> = ({ slideData, transitionTime = 3000, dotColor }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideData.length);
    }, transitionTime);

    return () => clearInterval(slideInterval);
  }, [slideData.length, transitionTime]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };
  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideData.length);
  };

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slideData.length) % slideData.length);
  };
  return (
    <Slidestyle>
      <div className="container">
        <div className="slide-show">
          <div className="slide-show-inner" ref={slideRef}>
            {slideData.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={slide.url} alt= "" className = "img-slide"/>
              </div>
            ))}
          </div>
          <div className="slide-show-controls">
            <button className="prev-button" onClick={handlePrevClick}>
              <span className="arrow left-arrow">&#9664;</span>
            </button>
            <button className="next-button" onClick={handleNextClick}>
              <span className="arrow right-arrow">&#9654;</span>
            </button>
          </div>
          <div className="slide-show-dots">
            {slideData.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundColor: dotColor }}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </Slidestyle>
  );
};

export default SlideShow;
