import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/ProductDetail.css';
import { addToCart, fetchProductById, fetchReviews, addReview } from '../services/api';
import { getCookie } from '../utils/cookies';
import CartModal from '../components/CartModal';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: '', rating: 0 });
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({
    show: false,
    title: '',
    message: '',
    redirect: null,
    redirectLabel: '',
  });

  useEffect(() => {
    const loadProductAndReviews = async () => {
      try {
        const productData = await fetchProductById(id);
        const reviewData = await fetchReviews(id);
        setProduct(productData);
        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching product or reviews:', error);
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };

    loadProductAndReviews();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    const token = getCookie('access_token');

    if (!token) {
      setModalData({
        show: true,
        title: 'Login Required',
        message: 'Please log in to add items to your cart.',
        redirect: () => navigate('/login'),
        redirectLabel: 'Go to Login',
      });
      return;
    }

    try {
      await addToCart(product.id, 1);
      setModalData({
        show: true,
        title: 'Success',
        message: 'Product added to cart successfully!',
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setModalData({
        show: true,
        title: 'Error',
        message: 'Failed to add product to cart.',
      });
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie('access_token');

    if (!token) {
      setModalData({
        show: true,
        title: 'Login Required',
        message: 'Please log in to leave a review.',
        redirect: () => navigate('/login'),
        redirectLabel: 'Go to Login',
      });
      return;
    }

    try {
      const review = await addReview(id, newReview);
      setReviews((prev) => [...prev, review]);
      setNewReview({ comment: '', rating: 0 });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container className="product-detail mt-5">
    <Row className="mt-4 align-items-center">
      <Col md={6}>
        <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.85)" zoomMargin={20}>
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            className="product-image"
            style={{ cursor: 'zoom-in', maxWidth: '100%', height: 'auto' }}
          />
        </Zoom>
      </Col>
      <Col md={6} className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p
          className={`stock-status ${
            product.stock > 0 ? 'text-success' : 'text-danger'
          }`}
        >
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
        <div className="product-price-container">
  {product.discount_price ? (
    <>
      <div className="price-highlight">
        <div className="price-wrapper">
          <span className="discounted-price">${product.discount_price}</span>
          <span className="discount-percentage">
            Save{' '}
            {Math.round(
              ((product.original_price - product.discount_price) /
                product.original_price) *
                100
            )}
            %
          </span>
        </div>
      </div>
      <span className="original-price">${product.original_price}</span>
    </>
  ) : (
    <div className="price-highlight">
      <span className="price">${product.price}</span>
    </div>
  )}
</div>
        <p className="product-description">{product.description}</p>
        <div className="quantity-selector-container">
          <Form.Control
            type="number"
            min="1"
            max={product.stock}
            value={1}
            className="quantity-selector"
          />
        </div>
        <div className="action-buttons">
          <Button
            variant="success"
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <FontAwesomeIcon icon="shopping-cart" />{' '}
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Button
            variant="outline-secondary"
            className="wishlist-button"
            onClick={() => console.log('Added to wishlist!')}
          >
            <FontAwesomeIcon icon="heart" />
          </Button>
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
  <div className="tab-content-container">
    <div className="description-content">
      <h4>About the Product</h4>
      <p>{product.description}</p>
      <h4>Key Features:</h4>
      <ul>
        <li>High-quality materials</li>
        <li>Modern and ergonomic design</li>
        <li>Available in various colors</li>
        <li>Warranty included</li>
      </ul>
      <h4>Care Instructions:</h4>
      <p>To maintain the product, clean it with a damp cloth and avoid direct sunlight exposure.</p>
    </div>
  </div>
</TabPanel>
  <TabPanel>
    <h3 style={{ color: '#000000' }}>Customer Reviews</h3>
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <Card key={review.id} className="review-card">
          <Card.Body>
            <div className="review-header">
              <span>{review.user_email}</span>
              <span className="review-rating">{review.rating} ★</span>
            </div>
            <Card.Text className="review-comment">{review.comment}</Card.Text>
          </Card.Body>
        </Card>
      ))
    ) : (
      <p style={{ color: '#555', fontStyle: 'italic' }}>
        No reviews yet. Be the first to write one!
      </p>
    )}
    <Form onSubmit={handleReviewSubmit} className="review-form">
  <Form.Group controlId="reviewComment" className="mb-3">
    <Form.Label>Comment</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      value={newReview.comment}
      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
    />
  </Form.Group>
  <Form.Group controlId="reviewRating" className="mb-3">
    <Form.Label>Rating</Form.Label>
    <Form.Control
      type="number"
      min="1"
      max="5"
      value={newReview.rating}
      onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
    />
  </Form.Group>
  <Button type="submit" variant="primary">
    Submit Review
  </Button>
</Form>
  </TabPanel>
  <TabPanel>
  <div className="tab-content-container">
    <div className="additional-info-grid">
      <div className="additional-info-column">
        <h5>Technical Details</h5>
        <p>Dimensions: 12 x 8 x 4 inches</p>
        <p>Weight: 1.5 kg</p>
        <p>Material: Aluminum and Plastic</p>
        <p>Warranty: 2 Years</p>
      </div>
      <div className="additional-info-column">
        <h5>Other Information</h5>
        <p>Shipping Time: 5-7 business days</p>
        <p>Available Colors: Red, Blue, Black</p>
        <p>Country of Origin: USA</p>
        <p>Support: 24/7 Customer Support Available</p>
      </div>
    </div>
  </div>
</TabPanel>
</Tabs>
  
        </Col>
      </Row>

      {/* Cart Modal */}
      <CartModal
        show={modalData.show}
        onHide={() => setModalData({ ...modalData, show: false })}
        title={modalData.title}
        message={modalData.message}
        onRedirect={modalData.redirect}
        redirectLabel={modalData.redirectLabel}
      />
    </Container>
  );
};

export default ProductDetail;
