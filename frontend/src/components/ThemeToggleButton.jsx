import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f1f1f1')};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  z-index: 1000;

  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#444' : '#e0e0e0')};
    transform: scale(1.1);
  }

  svg {
    font-size: 1.5rem;
    color: ${(props) => (props.theme === 'dark' ? '#ffcc00' : '#333')};
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: ${(props) => (props.theme === 'dark' ? '#ffe066' : '#ffcc00')};
  }
`;

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} theme={theme}>
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
    </Button>
  );
};

export default ThemeToggleButton;
