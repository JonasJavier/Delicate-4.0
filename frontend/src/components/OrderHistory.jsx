
// OrderHistory.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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

  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #dee2e6;
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const OrderHistory = () => {
  const orders = [
    { id: '738', date: '8 Sep, 2020', total: '$135.00 (5 Products)', status: 'Processing' },
    { id: '703', date: '24 May, 2020', total: '$25.00 (1 Product)', status: 'On the way' },
    { id: '130', date: '22 Oct, 2020', total: '$250.00 (4 Products)', status: 'Completed' },
    { id: '561', date: '1 Feb, 2020', total: '$35.00 (1 Product)', status: 'Completed' },
    { id: '536', date: '21 Sep, 2020', total: '$578.00 (13 Products)', status: 'Completed' },
    { id: '492', date: '22 Oct, 2020', total: '$345.00 (7 Products)', status: 'Completed' },
  ];

  return (
    <HistoryContainer>
      <h5>Recent Order History</h5>
      <Table>
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
              <td><Link to={`/orderdetails/${order.id}`}>{order.id}</Link></td>
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