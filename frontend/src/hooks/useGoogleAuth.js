import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // Usar el archivo `api.js` unificado
import { AuthContext } from '../context/AuthContext';

export const useGoogleAuth = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Lógica para manejar el inicio de sesión con Google
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { credential: id_token } = response; // Obtener el token
      const result = await API.post('/google-login/', { id_token }); // Llamar al backend

      if (result.data) {
        const { access_token, refresh_token } = result.data;

        // Guardar tokens en localStorage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        console.log('Google login successful. Tokens saved to localStorage.');

        // Actualizar el contexto de autenticación
        googleLogin(result.data);

        // Redirigir al usuario
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error('Google login failed. Please try again.');
    }
  };

  return { handleGoogleLoginSuccess };
};
