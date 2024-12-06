import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext'; 

const Container = styled.div`
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#000')};
  padding: 60px 20px;
  min-height: 100vh;
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};

  @media (max-width: 768px) {
    padding: 40px 10px;
  }

  @media (max-width: 500px) {
    padding: 30px 5px;
  }
`;

const Title = styled.h1`
  text-align: left;
  font-size: 4rem;
  margin-bottom: 40px;
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#333')};
  margin-left: 5%;
  font-family: Pro-text;
  font-weight: bold;

  span { 
    color: #f28123;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  @media (max-width: 500px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const FaqContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (min-width: 769px) {
    width: 45%;
  }

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const FaqItem = styled.div`
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#fff')};
  border: 1px solid ${(props) => (props.theme === 'dark' ? '#555' : '#ccc')};
  padding: 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px ${(props) => (props.theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)')};

  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#444' : '#f0f0f0')};
  }

  @media (max-width: 500px) {
    padding: 15px;
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  color: ${(props) => (props.theme === 'dark' ? '#ffcc00' : '#333')};

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const Answer = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  line-height: 1.5;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  font-weight: lighter;
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#555')};

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Icon = styled.span`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  color: ${(props) => (props.theme === 'dark' ? '#ffcc00' : '#333')};
  transform: ${(props) => (props.$show ? 'rotate(180deg)' : 'rotate(0deg)')};

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const faqs = [
  {
    question: 'What types of soaps do you offer?',
    answer: 'We offer a wide variety of handmade soaps, including natural options, fragrance-free, for sensitive skin, and organic ingredients. We also offer custom soaps based on your preferences.',
  },
  {
    question: 'Are the soaps suitable for sensitive skin?',
    answer: 'Yes, all our soaps are made with gentle and natural ingredients that are perfect for sensitive skin. If you have allergies, we can help you choose the best soap for your needs.',
  },
  {
    question: 'Can I customize my soaps?',
    answer: 'Absolutely! We offer the option to personalize soaps with different fragrances, colors, or even labels for special occasions like weddings, birthdays, or corporate events.',
  },
  {
    question: 'How should I store and care for my handmade soaps?',
    answer: 'To prolong the life of your handmade soaps, keep them in a cool, dry place. After each use, make sure to let them dry completely before storing them back in their box or container.',
  },
  {
    question: 'Do you offer home delivery?',
    answer: 'Yes, we offer home delivery within [country/city]. You can choose from different shipping options at checkout for quick and secure delivery.',
  },
  {
    question: 'Can I buy soaps in bulk?',
    answer: 'Yes, we offer special pricing for bulk purchases. If you own a store or business and would like to resell our handmade soaps, please contact us for more information and a customized quote.',
  },
  {
    question: 'Are your soaps environmentally friendly?',
    answer: 'Yes, our soaps are made with eco-friendly ingredients, and we use sustainable packaging whenever possible. We strive to minimize our environmental impact while creating high-quality products.',
  },
  {
    question: 'How long will the soap last?',
    answer: 'The longevity of the soap depends on its usage. Typically, a bar of soap can last anywhere from 2-4 weeks with daily use. To make it last longer, we recommend storing it in a dry area between uses.'
  },
];


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { theme } = useTheme(); // Obtener el tema actual

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const leftColumnFaqs = faqs.slice(0, 4);
  const rightColumnFaqs = faqs.slice(4);

  return (
    <Container theme={theme}>
      <Title theme={theme}>Frequently Asked <span>Questions</span></Title>
      <FaqContainer>
        <Column>
          {leftColumnFaqs.map((faq, index) => (
            <FaqItem key={index} onClick={() => handleToggle(index)} theme={theme}>
              <Question theme={theme}>
                {faq.question}
                <Icon $show={activeIndex === index} theme={theme}>&#9660;</Icon>
              </Question>
              <Answer $show={activeIndex === index} theme={theme}>{faq.answer}</Answer>
            </FaqItem>
          ))}
        </Column>
        <Column>
          {rightColumnFaqs.map((faq, index) => (
            <FaqItem key={index + 4} onClick={() => handleToggle(index + 4)} theme={theme}>
              <Question theme={theme}>
                {faq.question}
                <Icon $show={activeIndex === index + 4} theme={theme}>&#9660;</Icon>
              </Question>
              <Answer $show={activeIndex === index + 4} theme={theme}>{faq.answer}</Answer>
            </FaqItem>
          ))}
        </Column>
      </FaqContainer>
    </Container>
  );
};

export default FAQ;
