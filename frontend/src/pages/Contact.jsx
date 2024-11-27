import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
  background-color: ${(props) => (props.theme === 'dark' ? '#121212' : 'rgb(248, 249, 250)')};
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
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
  background: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#000000')};
  box-shadow: ${(props) =>
    props.theme === 'dark' ? '0 4px 15px rgba(255, 255, 255, 0.1)' : '0 .125rem .25rem rgba(0, 0, 0, .15)'};
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
  color: ${(props) => (props.theme === 'dark' ? '#F28123' : 'green')};
  padding-top: 1rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: 'Poppings-semibold', sans-serif;
  margin-bottom: 1rem;
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#343a40')};
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
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#000000')};

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
  border: 1px solid ${(props) => (props.theme === 'dark' ? '#444444' : '#ced4da')};
  background: ${(props) => (props.theme === 'dark' ? '#2c2c2c' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
  font-family: 'Poppings-regular', sans-serif;

  &:focus {
    outline: none;
  }

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
  border: 1px solid ${(props) => (props.theme === 'dark' ? '#444444' : '#ced4da')};
  background: ${(props) => (props.theme === 'dark' ? '#2c2c2c' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
  font-family: 'Poppings-regular', sans-serif;

  &:focus {
    outline: none;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    padding: 0.5rem;
  }
`;

const Button = styled.button`
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  background-color: ${(props) => (props.theme === 'dark' ? '#F28123' : 'green')};
  color: ${(props) => (props.theme === 'dark' ? '#000000' : '#ffffff')};
  border: none;
  cursor: pointer;
  font-family: 'Poppings-semibold', sans-serif;
  box-shadow: ${(props) =>
    props.theme === 'dark' ? '0 4px 15px rgba(255, 255, 255, 0.1)' : '0 .125rem .25rem rgba(0, 0, 0, .15)'};

  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#E06B00' : '#161716')};
    transform: scale(1.05);
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
`;

const ContactPage = () => {
  const { theme } = useTheme();
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!subject || !email || !message) {
      setStatus('All fields are required.');
      return;
    }

    const formData = { subject, email, message };

    setIsLoading(true);
    setStatus('');

    try {
      const response = await fetch('http://localhost:8000/contact/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setSubject('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setStatus(errorData.error || 'Something went wrong.');
      }
    } catch (error) {
      setStatus('Failed to send message.');
    }

    setIsLoading(false);
  };

  return (
    <Container theme={theme}>
      <Row>
        <Col>
          <Box theme={theme}>
            <div className="mb-4 text-center">
              <Icon className="fas fa-map-marker-alt" theme={theme} />
              <p>2715 Ash Dr. San Jose, South Dakota 83475</p>
            </div>
            <div className="mb-4 text-center">
              <Icon className="fas fa-envelope" theme={theme} />
              <p>redacted@example.com<br />redacted@example.com</p>
            </div>
            <div className="mb-4 text-center">
              <Icon className="fas fa-phone" theme={theme} />
              <p>(219) 555-0114<br />(164) 333-0487</p>
            </div>
          </Box>
        </Col>
        <Col>
          <BoxRight theme={theme}>
            <Title theme={theme}>Just Say Hello!</Title>
            <Subtitle theme={theme}>
              Do you fancy saying hi to me or you want to get started with your project and you need my help? Feel free to contact me.
            </Subtitle>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isLoading}
                theme={theme}
              />
              <Input
                type="email"
                placeholder="Your email redacted@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                theme={theme}
              />
              <TextArea
                rows="3"
                placeholder="I just want to say Hi"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                theme={theme}
              />
              <Button type="submit" disabled={isLoading} theme={theme}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
            {status && <p>{status}</p>}
          </BoxRight>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
