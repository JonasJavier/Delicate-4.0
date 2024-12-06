import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '../context/ThemeContext';

import instaImage1 from '../assets/images/Instagram/insta-image1.jpg';
import instaImage2 from '../assets/images/Instagram/insta-image2.jpg';
import instaImage3 from '../assets/images/Instagram/insta-image3.jpg';
import instaImage4 from '../assets/images/Instagram/insta-image4.jpg';
import instaImage5 from '../assets/images/Instagram/insta-image5.jpg';
import instaImage6 from '../assets/images/Instagram/insta-image6.jpg';

const images = [
  { src: instaImage1, alt: 'Instagram 1' },
  { src: instaImage2, alt: 'Instagram 2' },
  { src: instaImage3, alt: 'Instagram 3' },
  { src: instaImage4, alt: 'Instagram 4' },
  { src: instaImage5, alt: 'Instagram 5' },
  { src: instaImage6, alt: 'Instagram 6' },
];

const Section = styled.section`
  padding: 4rem 0;
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3%;
`;

const SectionTitle = styled.h2`
  font-size: 4.5rem;
  font-family: Pro-text;
  font-weight: bold;
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};

  span {
    color: #f28123;
  }

  @media (max-width: 750px) {
    font-size: 3rem;
  }

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }

  @media (max-width: 400px) {
    font-size: 2rem;
  }

  @media (max-width: 321px) {
    font-size: 1.5rem;
    margin-bottom: 5%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ZoomEffect = styled.figure`
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.6s ease-out;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
    opacity: 0;
    transition: 0.5s ease;
  }

  &:hover:before {
    opacity: 1;
  }

  .icon-instagram {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
    color: white;
    opacity: 0;
    z-index: 3;
    transition: opacity 0.5s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const Column = styled.div`
  width: 16.6667%;
  padding: 0.5rem;

  @media (max-width: 770px) {
    width: 33.333%;
  }

  @media (max-width: 500px) {
    width: 50%;
  }
`;

const InstagramSection = () => {
  const { theme } = useTheme();

  return (
    <Section theme={theme}>
      <div className="container">
        <SectionHeader>
          <SectionTitle theme={theme}>
            Follow our <span>Instagram</span>
          </SectionTitle>
        </SectionHeader>
        <Row>
          {images.map((image, index) => (
            <Column key={index}>
              <a
                href="https://www.instagram.com/delicate.soaps/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ZoomEffect>
                  <img src={image.src} alt={image.alt} />
                  <FontAwesomeIcon icon={faInstagram} className="icon-instagram" />
                </ZoomEffect>
              </a>
            </Column>
          ))}
        </Row>
      </div>
    </Section>
  );
};

export default InstagramSection;
