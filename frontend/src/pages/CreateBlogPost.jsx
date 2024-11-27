import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';  // Se reutiliza axiosInstance que ya maneja autenticación
import Spinner from 'react-bootstrap/Spinner';
import { getCookie } from '../utils/cookies';  // Reutilizamos la función de cookies

const Container = styled.div`
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledButton = styled.button`
  background-color: #1db954;
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #17a144;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  margin-top: 1rem;
  font-weight: bold;
`;

const CreateBlogPost = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validar el slug
  const validateSlug = (value) => /^[a-zA-Z0-9_-]+$/.test(value);

  // Manejar la creación del post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!validateSlug(slug)) {
      setError('El slug solo puede contener letras, números, guiones y guiones bajos.');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('content', content);
    formData.append('seo_description', seoDescription);
    if (featuredImage) {
      formData.append('featured_image', featuredImage);
    }

    try {
      const csrfToken = getCookie('csrftoken');  // Obtener el token CSRF de las cookies
      
      // Verificar si el token CSRF se ha obtenido correctamente
      if (!csrfToken) {
        throw new Error("CSRF token missing");
      }

      const response = await axiosInstance.post('/blog/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,  // Incluir el token CSRF en las cabeceras
        },
      });

      if (response.status === 201) {
        navigate('/blog');  // Redirigir a la lista de blogs
      }
    } catch (err) {
      setError('No tienes permisos para crear un post o ocurrió un error.');
      console.error(err);
    } finally {
      setLoading(false);
    }
};

  return (
    <Container>
      <h1 className="mb-4">Crear nuevo post de blog</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleCreatePost}>
        <FormGroup>
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="slug" className="form-label">Slug</label>
          <input
            type="text"
            className="form-control"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="content" className="form-label">Contenido</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="seoDescription" className="form-label">Descripción SEO</label>
          <input
            type="text"
            className="form-control"
            id="seoDescription"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="featuredImage" className="form-label">Imagen destacada</label>
          <input
            type="file"
            className="form-control"
            id="featuredImage"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
          />
        </FormGroup>
        <StyledButton type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Crear Post'}
        </StyledButton>
      </form>
    </Container>
  );
};

export default CreateBlogPost;
