import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import blogPosts from './blogpost'; // Importa los datos
import { useTheme } from '../context/ThemeContext'; // Para el tema

const BlogContainer = styled.div`
  margin-top: 9rem;
  padding: 2rem;
  background: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#333')};
`;

const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogPosts.find(post => post.id === parseInt(id));
    const { theme } = useTheme();

    if (!blog) {
        return <p>Post not found</p>;
    }

    return (
        <BlogContainer theme={theme}>
            <img src={blog.img} alt={blog.title} style={{ width: '100%', borderRadius: '10px' }} />
            <h1>{blog.title}</h1>
            <p>{blog.date}</p>
            <p>{blog.content}</p>
        </BlogContainer>
    );
};

export default BlogDetail;
