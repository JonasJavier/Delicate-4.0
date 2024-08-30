import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Img1 from '../assets/images/Blog/blog1.jpg';
import Img2 from '../assets/images/Blog/blog2.jpg';
import Img3 from '../assets/images/Blog/blog3.jpg';
import Img4 from '../assets/images/Blog/blog4.jpg';
import '../assets/css/BlogDetail.css';

const blogPosts = [
    { id: 1, img: Img1, title: 'Post 1', date: '18 NOV', content: 'Maecenas lacinia felis nec placerat sollicitudin. Quisque placerat dolor at scelerisque imperdiet. Phasellus tristique felis dolor.' },
    { id: 2, img: Img2, title: 'Post 2', date: '18 NOV', content: 'Maecenas elementum in risus sed condimentum. Duis convallis ante ac tempus maximus. Fusce malesuada sed velit ut dictum.' },
    // Añade más posts aquí...
];

const comments = [
    { name: 'Jane Doe', date: 'June 20, 2023', message: 'Great article, very informative!' },
    { name: 'John Smith', date: 'June 21, 2023', message: 'Thanks for sharing!' }
];

const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogPosts.find(post => post.id === parseInt(id));

    return (
        <Container className="blog-detail mt-5">
            <img src={blog.img} alt="Blog Header" className="img-fluid mb-4 rounded" />
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-meta mb-4">
                <span>Food</span> | <span>By Admin</span> | <span>65 Comments</span>
            </div>
            <p className="blog-content">{blog.content}</p>
            <p className="blog-content">
                Mauris pretium elit a dui pulvinar, in ornare sapien euismod. Nullam interdum nisl ante, id feugiat quam euismod commodo.
            </p>
            <p className="blog-content">
                Sed dictum non nulla eu imperdiet. Duis elit libero, vulputate quis vehicula ut, vestibulum ut mauris.
            </p>
            <div className="blog-share my-4">
                <span>Share item:</span>
                <FontAwesomeIcon icon={faFacebook} size="2x" className="mx-2" />
                <FontAwesomeIcon icon={faTwitter} size="2x" className="mx-2" />
                <FontAwesomeIcon icon={faPinterest} size="2x" className="mx-2" />
                <FontAwesomeIcon icon={faInstagram} size="2x" className="mx-2" />
            </div>
            <div className="blog-comments my-4">
                <h2><FontAwesomeIcon icon={faComments} /> Comments</h2>
                {comments.map((comment, index) => (
                    <div key={index} className="comment mb-3 p-3 border rounded">
                        <h5>{comment.name}</h5>
                        <span className="comment-date">{comment.date}</span>
                        <p>{comment.message}</p>
                    </div>
                ))}
            </div>
            <div className="leave-message my-4">
                <h2>Leave a Message</h2>
                <Form>
                    <Form.Group controlId="message">
                        <Form.Control as="textarea" rows={3} placeholder="Write your message..." />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">Submit</Button>
                </Form>
            </div>
        </Container>
    );
};

export default BlogDetail;
