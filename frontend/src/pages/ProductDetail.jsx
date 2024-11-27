import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart ,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/ProductDetail.css';
import { addToCart, fetchProductById, fetchReviews, addReview } from '../services/api';
import { getCookie } from '../utils/cookies';
import CartModal from '../components/CartModal';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useTheme } from '../context/ThemeContext';

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

  const { theme } = useTheme();

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
    <Container className={`product-detail ${theme === 'dark' ? 'dark-mode' : ''} mt-5`}>
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
          <p className={`stock-status ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <div className="product-price-container">
            {product.discount_price ? (
              <>
                <div className="price-highlight">
                  <div className="price-wrapper">
                    <span className="discounted-price">${product.discount_price}</span>
                    <span className="discount-percentage">
                      Save {Math.round(((product.original_price - product.discount_price) / product.original_price) * 100)}%
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
          <div className="action-buttons">
            <Button
              variant="success"
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
        <Tabs className={`product-tabs ${theme === 'dark' ? 'dark-mode-tabs' : ''}`}>
  <TabList>
    <Tab>Descriptions</Tab>
    <Tab>Reviews</Tab>
  </TabList>
  <TabPanel>
  <div id="product-description2"className="tab-content-container product-description2">
    <h4>About the Product</h4>
    <p className="product-summary">{product.description}</p>

    <div className="product-details-grid">
      <div className="details-section">
        <h5>Product Details</h5>
        <ul>
  <li>Ingredients: {product.ingredients || 'High-quality plastic'}</li>
  <li>Dimensions: {product.dimensions || '10 x 5 x 3 cm'}</li>
  <li>Weight: {product.weight || '500g'}</li>
  <li>Skin type: {product.skintype || 'For all skin types'}</li>
</ul>
      </div>
      <div className="details-section">
        <h5>Usage Instructions</h5>
        <ol>
          <li>Unpack the product carefully.</li>
          <li>Follow the assembly guide included in the package.</li>
          <li>Ensure proper maintenance for durability.</li>
        </ol>
      </div>
    </div>
  </div>
</TabPanel>
<TabPanel>
  <h3>Customer Reviews</h3>
  {reviews.length > 0 ? (
    reviews.map((review) => (
      <Card key={review.id} className="review-card">
        <Card.Body>
          <div className="review-header">
            <span>{review.user_email}</span>
            <span className="review-rating">{review.rating} ★</span>
          </div>
          <Card.Text>{review.comment}</Card.Text>
        </Card.Body>
      </Card>
    ))
  ) : (
    <p>No reviews yet. Be the first to write one!</p>
  )}
  <Form className="review-form" onSubmit={handleReviewSubmit}>
    <Form.Group controlId="reviewComment">
      <Form.Label>Comment</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={newReview.comment}
        onChange={(e) =>
          setNewReview({ ...newReview, comment: e.target.value })
        }
      />
    </Form.Group>
    <Form.Group controlId="reviewRating">
      <Form.Label>Rating</Form.Label>
      <Form.Control
        type="number"
        min="1"
        max="5"
        value={newReview.rating}
        onChange={(e) =>
          setNewReview({ ...newReview, rating: parseInt(e.target.value) })
        }
      />
    </Form.Group>
    <Button type="submit" variant="primary">
      Submit Review
    </Button>
  </Form>
</TabPanel>

          </Tabs>
        </Col>
      </Row>
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
