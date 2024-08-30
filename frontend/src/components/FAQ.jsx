import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: #000;
  padding: 60px 20px;
  min-height: 100vh;
  background-color: #ffffff !important;

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
  color: #333;
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
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f0f0f0;
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
  display: ${props => (props.$show ? 'block' : 'none')};
  font-weight: lighter;
  color: #555;

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
  transform: ${props => (props.$show ? 'rotate(180deg)' : 'rotate(0deg)')};

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const faqs = [
  {
    question: 'What type of photography do you specialize in?',
    answer: 'I specialize in [Portrait, Landscape, Event, etc.] photography, capturing moments that tell unique stories.',
  },
  {
    question: 'How can I book a photography session with you?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
  },
  {
    question: 'What equipment do you use for your photography?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
  },
  {
    question: 'Can I request a specific location for a photoshoot?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
  },
  {
    question: 'What is your editing process like?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
  },
  {
    question: 'Are digital files included in the package?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
  },
  {
    question: 'Do you offer prints of your photographs?',
    answer: 'Yes, prints are available for purchase. Explore the \'Prints\' section for more details on sizes and pricing.',
  },
  {
    question: 'How long does it take to receive the edited photos?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const leftColumnFaqs = faqs.slice(0, 4);
  const rightColumnFaqs = faqs.slice(4);

  return (
    <Container>
      <Title>Frequently Asked <span>Questions</span></Title>
      <FaqContainer>
        <Column>
          {leftColumnFaqs.map((faq, index) => (
            <FaqItem key={index} onClick={() => handleToggle(index)}>
              <Question>
                {faq.question}
                <Icon $show={activeIndex === index}>&#9660;</Icon>
              </Question>
              <Answer $show={activeIndex === index}>{faq.answer}</Answer>
            </FaqItem>
          ))}
        </Column>
        <Column>
          {rightColumnFaqs.map((faq, index) => (
            <FaqItem key={index + 4} onClick={() => handleToggle(index + 4)}>
              <Question>
                {faq.question}
                <Icon $show={activeIndex === index + 4}>&#9660;</Icon>
              </Question>
              <Answer $show={activeIndex === index + 4}>{faq.answer}</Answer>
            </FaqItem>
          ))}
        </Column>
      </FaqContainer>
    </Container>
  );
};

export default FAQ;
