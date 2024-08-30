import React, { useState } from 'react';
import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image1 from '../assets/images/About/main1.png';
import Image2 from '../assets/images/About/main2.png';
import Image3 from '../assets/images/About/main3.png';

const AboutHero = () => {
  const [mainImage, setMainImage] = useState(Image1);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const slides = [
    { image: Image1, caption: 'Etiam tristique, metus pretium rutrum elementumv, risus tortor.' },
    { image: Image2, caption: 'Etiam tristique, metus pretium rutrum elementumv, risus tortor.' },
    { image: Image3, caption: 'Etiam tristique, metus pretium rutrum elementumv, risus tortor.' }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 250,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: current => changeImage(slides[current].image),
    arrows: false
  };

  const changeImage = (newImage) => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setMainImage(newImage);
      setFadeClass('fade-in');
    }, 250);
  };

  return (
    <SliderArea>
      <SliderItemActive className={fadeClass} $mainImage={mainImage}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="slider-item">
              <SliderHeight className="hero-overly d-flex align-items-center justify-content-center">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <SlideContent>
                        <Title>About us</Title>
                        <Caption>{slide.caption}</Caption>
                      </SlideContent>
                    </div>
                  </div>
                </div>
              </SliderHeight>
            </div>
          ))}
        </Slider>
      </SliderItemActive>
      <ThumbnailContainer>
        {slides.map((slide, index) => (
          <Thumbnail key={index} onClick={() => changeImage(slide.image)}>
            <img src={slide.image} alt={`thumb ${index + 1}`} />
          </Thumbnail>
        ))}
      </ThumbnailContainer>
    </SliderArea>
  );
};

export default AboutHero;

const fadeIn = keyframes`
  from { opacity: 0.2; background-color: rgba(255, 255, 255, 1); }
  to { opacity: 1; background-color: rgba(255, 255, 255, 0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; background-color: rgba(255, 255, 255, 0); }
  to { opacity: 0.2; background-color: rgba(255, 255, 255, 1); }
`;

const SliderArea = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #ffffff !important;
`;

const SliderItemActive = styled.div`
  background-image: url(${props => props.$mainImage});
  animation: ${props => (props.className === 'fade-in' ? fadeIn : fadeOut)} 0.5s forwards;
  height: 100%;
  width: 100%;

  .slick-track {
    display: flex;
    align-items: center;
  }
`;

const SliderHeight = styled.div`
  background: none !important;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 10rem;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Sarlotte';
  font-weight: bold;
  letter-spacing: 6px;

  @media (max-width: 1000px) {
    font-size: 7rem;
  }

  @media (max-width: 700px) {
    font-size: 5rem;
  }

  @media (max-width: 500px) {
    font-size: 4rem;
  }

  @media (max-width: 350px) {
    font-size: 3rem;
  }
`;

const Caption = styled.p`
  font-size: 2rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Poppins-light';

  @media (max-width: 1000px) {
    font-size: 1.6rem;
  }

  @media (max-width: 700px) {
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }

  @media (max-width: 350px) {
    font-size: 0.8rem;
  }
`;

const ThumbnailContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
  }
`;

const Thumbnail = styled.div`
  cursor: pointer;
  margin: 0 10px;
  transition: transform 0.3s;

  img {
    width: 100px;
    height: 60px;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 90px;
      height: 50px;
    }

    @media (max-width: 576px) {
      width: 80px;
      height: 40px;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;
