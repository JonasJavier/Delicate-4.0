import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductAPI } from '../services/api';
import styled from 'styled-components';

const ProductManagementContainer = styled.div`
  background-color: #1e1e1e;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 700px;
  margin: 8% auto;
  color: #e0e0e0;
  font-family: 'Poppings-regular', sans-serif;

`;

const Title = styled.h2`
  font-family: 'Pro-text', sans-serif;
  color: #f1f1f1;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  .form-label {
    font-weight: bold;
    color: #cccccc;
    font-family: 'Poppings-light', sans-serif;
  }

  .form-control {
    background-color: #333;
    border: 1px solid #444;
    color: #e0e0e0;

    &:focus {
      background-color: #444;
      color: #ffffff;
      border-color: #666;
      box-shadow: none;
    }
  }

  .file-input {
    padding: 10px;
    font-family: 'Poppings-regular', sans-serif;
    background-color: #444;
    color: #e0e0e0;
    border-radius: 5px;
    border: 1px solid #555;
    cursor: pointer;

    &:hover {
      background-color: #555;
      color: #ffffff;
      border-color: #666;
    }
  }

  .btn-primary {
    background-color: #f1964c;
    border-color: #f1964c;
    font-family: 'Poppings-regular', sans-serif;
    padding: 10px 20px;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ffab70;
      border-color: #ffab70;
    }
  }
`;

const Alert = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;

  &.alert-danger {
    background-color: #e74c3c;
    color: white;
  }

  &.alert-success {
    background-color: #2ecc71;
    color: white;
  }
`;

const ProductManagement = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(productData).forEach(key => {
        formData.append(key, productData[key]);
      });

      await addProductAPI(formData);
      setSuccess('Product added successfully!');
      setError('');
      navigate('/shop');
    } catch (error) {
      setSuccess('');
      setError('Error adding product. Please try again.');
    }
  };

  return (
    <ProductManagementContainer>
      <Title>Add New Product</Title>
      {error && <Alert className="alert-danger">{error}</Alert>}
      {success && <Alert className="alert-success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name:</label>
          <input type="text" id="name" name="name" className="form-control" value={productData.name} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="number" id="price" name="price" className="form-control" value={productData.price} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea id="description" name="description" className="form-control" value={productData.description} onChange={handleInputChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock:</label>
          <input type="number" id="stock" name="stock" className="form-control" value={productData.stock} onChange={handleInputChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="form-label">Image:</label>
          <input type="file" id="image" name="image" className="form-control file-input" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </Form>
    </ProductManagementContainer>
  );
};

export default ProductManagement;
