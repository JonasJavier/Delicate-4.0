import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Blog.css';
import Img1 from '../assets/images/news/avena.jpg'; // Imagen de avena
import Img2 from '../assets/images/news/coco.jpg'; // Imagen de coco
import Img3 from '../assets/images/news/naranja.jpg'; // Imagen de naranja
import Img4 from '../assets/images/Blog/blog4.jpg';
import Img5 from '../assets/images/Blog/blog5.jpg';
import Img6 from '../assets/images/Blog/blog6.jpg';
import Img7 from '../assets/images/Blog/blog7.jpg';
import Img8 from '../assets/images/Blog/blog8.jpg';
import Pagination from '../components/Paginations';
import LazyLoad from 'react-lazyload';
import { useNavigate } from 'react-router-dom';

const blogPosts = [
    {
        id: 1,
        img: Img1, // Importación correcta
        title: 'Glow Naturally with Oatmeal Magic', // Título correspondiente
        date: '28 NOV', // Fecha actualizada
        description: 'Discover the gentle exfoliation and soothing benefits of oatmeal soap. Perfect for sensitive skin.', // Descripción breve
    },
    {
        id: 2,
        img: Img2, // Importación correcta
        title: 'Coconut Bliss: Hydration You Deserve', // Título correspondiente
        date: '28 NOV', // Fecha actualizada
        description: 'Experience deep hydration and the tropical escape of coconut soap for silky smooth skin.', // Descripción breve
    },
    {
        id: 3,
        img: Img3, // Importación correcta
        title: 'Orange Zest: A Refreshing Start', // Título correspondiente
        date: '28 NOV', // Fecha actualizada
        description: 'Kickstart your day with the revitalizing and brightening power of orange soap.', // Descripción breve
    },
    { id: 4, img: Img4, title: 'Post 4', date: '18 NOV', description: 'Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.' },
    { id: 5, img: Img5, title: 'Post 5', date: '18 NOV', description: 'Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.' },
    { id: 6, img: Img6, title: 'Post 6', date: '18 NOV', description: 'Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.' },
    { id: 7, img: Img7, title: 'Post 7', date: '18 NOV', description: 'Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.' },
    { id: 8, img: Img8, title: 'Post 8', date: '18 NOV', description: 'Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.' },
];

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
    const navigate = useNavigate();

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(blogPosts.length / postsPerPage);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <div className="blog-page">
            <div className="hero-section4 position-relative d-flex align-items-center justify-content-center text-center">
                <div className="overlay4 position-absolute top-0 start-0 w-100 h-100"></div>
                <div className="content4 text-white position-relative">
                    <p className="small-title4 fs-2 mb-3">Our Blog</p>
                    <h1 className="main-title4 display-1 fw-bold mb-4">The best advices for you</h1>
                </div>
            </div>
            <div className="container my-5">
                <div className="row">
                    {currentPosts.map(post => (
                        <div key={post.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100">
                                <LazyLoad height={200} offset={100} once>
                                    <img src={post.img} className="card-img-top" alt={post.title} />
                                </LazyLoad>
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="date-badge bg-light me-2">{post.date}</div>
                                        <div className="text-muted">
                                            <span>By Admin</span> <span> | 65 Comments</span>
                                        </div>
                                    </div>
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.description}</p>
                                    <button className="text-success btn-read-more" onClick={() => handleReadMore(post.id)}>Read More →</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default Blog;
