import React from 'react';
import styled from 'styled-components';
import avatar1 from '../assets/images/testimonials/avatar1.jpg';
import avatar2 from '../assets/images/testimonials/avatar2.jpg';
import avatar3 from '../assets/images/testimonials/avatar3.jpg';
import {
  MDBCard,
  MDBCardBody,
  MDBCarousel,
  MDBCarouselItem,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from 'mdb-react-ui-kit';
import { useTheme } from '../context/ThemeContext';


// Estilo para el fondo degradado
const GradientContainer = styled(MDBContainer)`
  background: radial-gradient(50% 123.47% at 50% 50%, #00ff94 0%, #720059 100%),
    linear-gradient(121.28deg, #669600 0%, #ff0000 100%),
    linear-gradient(360deg, #0029ff 0%, #8fff00 100%),
    radial-gradient(100% 164.72% at 100% 100%, #6100ff 0%, #00ff57 100%),
    radial-gradient(100% 148.07% at 0% 0%, #fff500 0%, #51d500 100%);
  background-blend-mode: screen, color-dodge, overlay, difference, normal;
  position: relative;
  height: 90vh;
  padding: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    padding: 2rem 1rem;
  }
`;


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.203);
  z-index: 1;
`;

// Wrapper para el contenido principal
const TestimonialWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const TitleBackground = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const TestimonialTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-family: 'Pro-text', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TestimonialName = styled.h4`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000')};
  text-shadow: ${(props) =>
    props.theme === 'dark' ? '1px 1px 2px rgba(255, 255, 255, 0.5)' : 'none'};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  font-family: 'Poppings-light', sans-serif;
  text-align: left;
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#000')};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledCardBody = styled(MDBCardBody)`
  padding: 5rem;
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.theme === 'dark' ? '0 8px 20px rgba(255, 255, 255, 0.2)' : '0 8px 20px rgba(0, 0, 0, 0.1)'};

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

// Icono de cita con estilo fijo (sin condicionales para el modo oscuro)
const QuoteIcon = styled(MDBIcon)`
  color: #ffffff; /* Color fijo */
  font-size: 3rem;
`;

// Flechas del carrusel
const CarouselControl = styled.div`
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: ${(props) => (props.theme === 'dark' ? '#ffffff' : 'transparent')};
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;
// Contenedor para alinear imagen y texto
const TestimonialRow = styled(MDBRow)`
  display: flex;
  align-items: center;
`;


const AvatarImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Testimonials = () => {
  const { theme } = useTheme();

  const testimonials = [
  {
    imgSrc: avatar1,
    name: 'Enyi Andujar - Bonao',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis...',
  },
  {
    imgSrc: avatar2,
    name: 'Lisa Cudrow - Puerto Plata',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...',
  },
  {
    imgSrc: avatar3,
    name: 'John Smith - Barahona',
    text: 'At vero eos et accusamus et iusto odio dignissimos qui blanditiis praesentium voluptatum...',
  },
];

  return (
    <GradientContainer fluid className="py-5" theme={theme}>
  {/* Capa oscura */}
  <Overlay />
  {/* Contenido principal */}
  <TestimonialWrapper>
    <MDBRow className="d-flex justify-content-center">
      <MDBCol md="12">
        <div className="text-center mb-4 pb-2">
          <QuoteIcon fas icon="quote-left" />
        </div>
        <TitleBackground className="mb-4 pb-2">
          <TestimonialTitle>What Our Customers Say</TestimonialTitle>
        </TitleBackground>
        <MDBCard className="testimonial-card">
          <StyledCardBody theme={theme}>
            <MDBCarousel showControls dark>
              {testimonials.map((testimonial, index) => (
                <MDBCarouselItem className={index === 0 ? 'active' : ''} key={index}>
                  <MDBRow className="d-flex justify-content-center">
                    <MDBCol lg="10" xl="8">
                      <TestimonialRow>
                        <MDBCol lg="4" className="d-flex justify-content-center">
                          {/* Imagen estilizada con AvatarImage */}
                          <AvatarImage
                            src={testimonial.imgSrc}
                            alt={`${testimonial.name} avatar`}
                          />
                        </MDBCol>
                        <MDBCol
                          md="9"
                          lg="8"
                          xl="8"
                          className="text-center text-lg-start mx-auto mx-lg-0"
                        >
                          <TestimonialName theme={theme}>
                            {testimonial.name}
                          </TestimonialName>
                          <TestimonialText theme={theme}>
                            {testimonial.text}
                          </TestimonialText>
                        </MDBCol>
                      </TestimonialRow>
                    </MDBCol>
                  </MDBRow>
                </MDBCarouselItem>
              ))}
            </MDBCarousel>
          </StyledCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </TestimonialWrapper>
</GradientContainer>
    
  );
};

export default Testimonials;
