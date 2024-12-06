import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; 
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { useTheme } from '../context/ThemeContext'; 

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => (theme === 'dark' ? '#333' : 'white')}; 
  color: ${({ theme }) => (theme === 'dark' ? '#f1f1f1' : '#000')};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${({ theme }) => (theme === 'dark' ? '#f1f1f1' : '#000')}; 
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => (theme === 'dark' ? '#ddd' : '#555')}; 
  margin-bottom: 30px;
  line-height: 1.6;
`;

const CallToAction = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => (theme === 'dark' ? '#f1f1f1' : '#222')}; 
  margin-bottom: 30px;
  padding: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#f8f9fa')}; 
  border-radius: 8px;
  border: 2px dashed ${({ theme }) => (theme === 'dark' ? '#28a745' : '#25D366')}; 
`;

const WhatsappButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #25D366;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #22b358;
  }

  .whatsapp-icon {
    margin-right: 10px;
  }
`;

const CheckoutModal = ({ cartItems, total, showModal, closeModal }) => {
  const { theme } = useTheme(); 

  const whatsappMessage = encodeURIComponent(
    `*Hello! I want to place an order with the following products.:* \n\n` + 
    cartItems
      .map(
        (item) =>
          `Producto: *${item.product.name}* \n` +  
          `Cantidad: ${item.quantity} \n` +  
          `Precio total: $${(item.product.price * item.quantity).toFixed(2)} \n` +  
          `--------------------------\n`
      )
      .join('') + 
    `\n*Order Total: $${total.toFixed(2)}*\n\n` +  
    `Please confirm this order or inform me if you need more details. Thank you!`
  );

  return (
    showModal && (
      <ModalOverlay onClick={closeModal}>
    <ModalContainer theme={theme} onClick={(e) => e.stopPropagation()}>
      <Title theme={theme}>Thank you for your purchase! 👋</Title>
      <Message theme={theme}>
        Unfortunately, the online payment systems are still in process, but don't worry, you can place your order via WhatsApp! 😎
      </Message>
      <CallToAction theme={theme}>Click the button below and send us your cart.</CallToAction>
      <WhatsappButton
        href={`https://wa.me/+18498625049?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={24} className="whatsapp-icon" />
        Order via WhatsApp
      </WhatsappButton>
    </ModalContainer>
  </ModalOverlay>

    )
  );
};

export default CheckoutModal;
