import React from 'react';
import styled from 'styled-components';
import img1 from '../assets/images/news/img1.jpg';
import img2 from '../assets/images/news/img2.jpg';
import img3 from '../assets/images/news/img3.jpg';
import { useTheme } from '../context/ThemeContext'; 

const Container = styled.div`
  max-width: 1300px;
  margin: 10% auto;
  padding: 15px;
`;

const Title = styled.h2`
  font-family: 'Pro-text';
  text-transform: uppercase;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  margin: 0 auto 2rem;
  display: block;
  padding-bottom: 10px;
  position: relative;

  /* Estilo dinámico basado en el tema */
  span {
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#000000')}; /* "Our" cambia según el tema */
  }

  .highlight {
    color: #f7941d; /* "News" siempre en este color */
  }

  &::after {
    content: "";
    width: 80px;
    height: 4px;
    background-color: #f7941d;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 360px) {
    font-size: 2.5rem;

    &::after {
      width: 40px;
    }
  }
`;



const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Col = styled.div`
  flex: 1 0 30%;
  margin: 0.5rem;

  @media (max-width: 1000px) {
    flex: 1 0 100%;
    max-width: 100%;
  }
`;

const Card = styled.div`
  border: none;
  margin-bottom: 2rem;
  height: 100%;
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  box-shadow: 0px 0px 20px rgba(96, 96, 96, 0.584);
`;

const CardImage = styled.img`
  height: 250px;
  object-fit: cover;
  width: 100%;
  transition: filter 0.3s ease;
  box-shadow: 0px 0px 20px rgba(96, 96, 96, 0.584);

  ${Card}:hover & {
    filter: brightness(1.3);
  }

  @media (max-width: 360px) {
    height: 200px;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h5`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#333')};
  font-family: 'Poppins-Regular';

  @media (max-width: 360px) {
    font-size: 1.2rem;
  }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
  color: ${(props) => (props.theme === 'dark' ? '#cccccc' : '#333')};
  text-align: left;
  font-family: 'Poppins-Light';

  @media (max-width: 360px) {
    font-size: 0.9rem;
  }
`;

const ReadMoreLink = styled.a`
  font-weight: bold;
  color: ${(props) => (props.theme === 'dark' ? '#f7941d' : '#000')};
  text-decoration: none;

  i {
    margin-left: 5px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const NewsSection = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <Title theme={theme}>
  <span>Our</span> <span className="highlight">News</span>
</Title>
      <Row>
        <Col>
          <Card theme={theme}>
            <CardImage src={img1} alt="News 1" />
            <CardBody>
              <CardTitle theme={theme}>You will vainly look for fruit on it in autumn.</CardTitle>
              <CardMeta>
                <span><i className="fas fa-user"></i> Admin</span>
                <span><i className="fas fa-calendar-alt"></i> 27 December, 2019</span>
              </CardMeta>
              <CardText theme={theme}>
                Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi. Praesent vitae mattis nunc, egestas viverra eros.
              </CardText>
              <ReadMoreLink href="#" theme={theme}>
                Read more <i className="fas fa-arrow-right"></i>
              </ReadMoreLink>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card theme={theme}>
            <CardImage src={img2} alt="News 2" />
            <CardBody>
              <CardTitle theme={theme}>A man's worth has its season, like tomato.</CardTitle>
              <CardMeta>
                <span><i className="fas fa-user"></i> Admin</span>
                <span><i className="fas fa-calendar-alt"></i> 27 December, 2019</span>
              </CardMeta>
              <CardText theme={theme}>
                Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi. Praesent vitae mattis nunc, egestas viverra eros.
              </CardText>
              <ReadMoreLink href="#" theme={theme}>
                Read more <i className="fas fa-arrow-right"></i>
              </ReadMoreLink>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card theme={theme}>
            <CardImage src={img3} alt="News 3" />
            <CardBody>
              <CardTitle theme={theme}>Good thoughts bear good fresh juicy fruit.</CardTitle>
              <CardMeta>
                <span><i className="fas fa-user"></i> Admin</span>
                <span><i className="fas fa-calendar-alt"></i> 27 December, 2019</span>
              </CardMeta>
              <CardText theme={theme}>
                Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi. Praesent vitae mattis nunc, egestas viverra eros.
              </CardText>
              <ReadMoreLink href="#" theme={theme}>
                Read more <i className="fas fa-arrow-right"></i>
              </ReadMoreLink>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsSection;
