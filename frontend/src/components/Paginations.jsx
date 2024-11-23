import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext'; // Contexto del tema
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginationNav = styled.nav`
  .pagination {
    margin-top: 30px;
  }

  .page-item.disabled .page-link {
    color: ${(props) => (props.theme === 'dark' ? '#666' : '#6c757d')};
    pointer-events: none;
    background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#fff')};
    border-color: ${(props) => (props.theme === 'dark' ? '#444' : '#dee2e6')};
  }

  .page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: ${(props) => (props.theme === 'dark' ? '#F28123' : '#22d63d')};
    border-color: ${(props) => (props.theme === 'dark' ? '#F28123' : '#22d63d')};
  }

  .page-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#22d63d')};
    color: ${(props) => (props.theme === 'dark' ? '#fff' : '#fff')};
    border: none;
    margin: 0 0.25rem;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .page-link:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#444' : '#1abc32')};
    color: ${(props) => (props.theme === 'dark' ? '#F28123' : '#fff')};
  }
`;

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useTheme(); // Obtener el tema actual

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <PaginationNav theme={theme} aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => handlePageChange(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </PaginationNav>
  );
};

Paginations.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginations;
