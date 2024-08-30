import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Definiendo los estilos con styled-components
const Container = styled.div`
  background-color: rgb(248, 249, 250);
  min-height: 100vh;
  padding-top: 8%;
  font-family: 'Poppings-regular', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    padding-top: 5%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

const Col = styled.div`
  flex: 1;
  padding: 1rem;
  min-width: 300px;
  box-sizing: border-box;

  &:first-child {
    max-width: 33.33%;
  }

  &:last-child {
    max-width: 66.67%;
  }

  @media (max-width: 768px) {
    &:first-child,
    &:last-child {
      max-width: 100%;
    }
  }
  @media (max-width: 500px) {
    padding: 10px;
  }

`;

const Box = styled.div`
  background: white;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .15);
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxRight = styled(Box)`
  padding: 3rem;

  @media (max-width: 400px) {
    padding: 10px;
  }


  @media (max-width: 500px) {
    padding: 5%;
  }
`;


const Icon = styled.i`
  font-size: 36px;
  color: green;
  padding-top: 1rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: 'Poppings-semibold', sans-serif;
  margin-bottom: 1rem;
  color: #343a40;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-family: 'Poppings-light', sans-serif;
  margin-bottom: 1.5rem;
  text-align: center;


  @media (max-width: 500px) {
    font-size: 1rem;
  }

`;

const Input = styled.input`
  font-size: 1.25rem;
  padding: 0.75rem;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  font-family: 'Poppings-regular', sans-serif;

  @media (max-width: 500px) {
    font-size: 1rem;
    padding: 0.5rem;
  }

`;

const TextArea = styled.textarea`
  font-size: 1.25rem;
  padding: 0.75rem;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  font-family: 'Poppings-regular', sans-serif;

  @media (max-width: 500px) {
    font-size: 1rem;
    padding: 0.5rem;
  }

`;

const Button = styled.button`
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  background-color:  green;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Poppings-semibold', sans-serif;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .15);

  &:hover {
    background-color: #161716;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

`;

const ContactPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Box>
            <div className="mb-4 text-center">
              <Icon className="fas fa-map-marker-alt" />
              <p className="mt-2 mb-0">2715 Ash Dr. San Jose, South Dakota 83475</p>
            </div>
            <div className="mb-4 text-center">
              <Icon className="fas fa-envelope" />
              <p className="mt-2 mb-0">redacted@example.com<br />redacted@example.com</p>
            </div>
            <div className="mb-4 text-center">
              <Icon className="fas fa-phone" />
              <p className="mt-2 mb-0">(219) 555-0114<br />(164) 333-0487</p>
            </div>
          </Box>
        </Col>
        <Col>
          <BoxRight>
            <Title>Just Say Hello!</Title>
            <Subtitle>
              Do you fancy saying hi to me or you want to get started with your project and you need my help? Feel free to contact me.
            </Subtitle>
            <form>
              <Input type="text" placeholder="Template Cookie" />
              <Input type="email" placeholder="redacted@example.com" />
              <TextArea rows="3" placeholder="Hello"></TextArea>
              <Input type="text" placeholder="Subjects" />
              <Button type="submit">Send Message</Button>
            </form>
          </BoxRight>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
