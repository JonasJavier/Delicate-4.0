import React from 'react';
import '../assets/css/Instagram.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

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

const InstagramSection = () => {
  return (
    <section id="instagram" className="padding-large">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title3">Follow our <span>Instagram</span></h2>
        </div>
        <div className="row d-flex flex-wrap justify-content-center">
          {images.map((image, index) => (
            <div className="col-lg-2 col-md-4 col-4" key={index}>
              <figure className="zoom-effect">
                <img src={image.src} alt={image.alt} className="insta-image" />
                <FontAwesomeIcon icon={faInstagram} className="icon-instagram" />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
