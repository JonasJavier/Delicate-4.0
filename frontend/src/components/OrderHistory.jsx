import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext'; // Importa el contexto del tema

const HistoryContainer = styled.div`
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#333')};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 5rem;
  width: 100%;
  padding-top: 10rem;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
  color: ${(props) => (props.theme === 'dark' ? '#cccccc' : '#333')};

  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid ${(props) => (props.theme === 'dark' ? '#444' : '#dee2e6')};
  }

  th {
    background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f8f9fa')};
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000')};
  }

  a {
    color: ${(props) => (props.theme === 'dark' ? '#ffcc00' : '#007bff')};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const OrderHistory = () => {
  const { theme } = useTheme(); // Obtener el tema actual

  const orders = [
    { id: '738', date: '8 Sep, 2024', total: '$13.00 (2 Products)', status: 'Processing' },
    { id: '703', date: '24 May, 2024', total: '$25.00 (1 Product)', status: 'On the way' },
    { id: '130', date: '22 Oct, 2024', total: '$25.00 (4 Products)', status: 'Completed' },
    { id: '561', date: '1 Feb, 2024', total: '$35.00 (6 Product)', status: 'Completed' },
    { id: '536', date: '21 Sep, 2024', total: '$58.00 (8 Products)', status: 'Completed' },
    { id: '492', date: '22 Oct, 2024', total: '$45.00 (7 Products)', status: 'Completed' },
  ];

  return (
    <HistoryContainer theme={theme}>
      <h5>Recent Order History</h5>
      <Table theme={theme}>
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><Link to={`/orderdetails/${order.id}`}>{order.id} </Link> </td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td><a href="#">{order.status}</a></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <a href="#">View All</a>
    </HistoryContainer>
  );
};

export default OrderHistory;
