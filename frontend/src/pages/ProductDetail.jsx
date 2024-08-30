import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Zoom from 'react-medium-image-zoom';
import LazyLoad from 'react-lazyload';
import 'react-medium-image-zoom/dist/styles.css';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/ProductDetail.css';
import { addToCart, fetchProductById } from '../services/api'; // Import the fetchProductById function
import { getCookie } from '../utils/cookies'; // Function to get cookies


const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // State to hold the product data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id); // Fetch product data from the API
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error loading product details.');
        navigate('/shop'); // Redirect to shop if product not found
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    const token = getCookie('access_token');

    if (!token) {
      alert('Please log in to add items to your cart.');
      navigate('/login'); // Redirect to login page
      return;
    }

    if (!product || typeof product.id !== 'number') {
      alert('Invalid product.');
      return;
    }

    try {
      await addToCart(product.id, 1); // Ensure product.id is the correct ID
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <Container className="product-detail mt-9">
      <Row className="mt-4 align-items-center">
        <Col md={6}>
          <Zoom>
            <LazyLoad height={400} offset={100} once>
              <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} className="product-image" />
            </LazyLoad>
          </Zoom>
        </Col>
        <Col md={6} className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="text-success stock-status">In Stock</p>
          <div className="product-price">
            <span className="original-price">$48.00</span>
            <span className="discounted-price">${product.price}</span>
            <span className="discount-percentage">64% Off</span>
          </div>
          <p className="product-description">{product.description}</p>
          <InputGroup className="quantity-selector">
            <Button variant="outline-secondary">-</Button>
            <FormControl aria-label="Quantity" value="1" readOnly className="text-center" />
            <Button variant="outline-secondary">+</Button>
          </InputGroup>
          <div className="action-buttons">
            <Button variant="success" className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline-secondary" className="wishlist-button">
              <FontAwesomeIcon icon={faHeart} className="wishlist-icon" />
            </Button>
          </div>
          <div className="share-item">
            <span>Share item: </span>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
            <FontAwesomeIcon icon={faTwitter} size="2x" />
            <FontAwesomeIcon icon={faPinterest} size="2x" />
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Tabs className="product-tabs">
            <TabList>
              <Tab>Descriptions</Tab>
              <Tab>Reviews</Tab>
              <Tab>Additional Information</Tab>
            </TabList>
            <TabPanel>
              <p>{product.description}</p>
            </TabPanel>
            <TabPanel>
              <p>Here are the product reviews...</p>
            </TabPanel>
            <TabPanel>
              <p>Here is the additional information...</p>
            </TabPanel>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
