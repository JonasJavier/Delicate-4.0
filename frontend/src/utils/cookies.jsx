export const getCookie = (name) => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    return cookies[name] || null;
  };
  
  export const setCookie = (name, value, days = 7, path = '/') => {
    let expires = '';
    if (days) {
      expires = `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`;
    }
    const secure = location.protocol === 'https:' ? 'Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; path=${path};${expires}; SameSite=Lax; ${secure}`;
  };
  
  export const deleteCookie = (name, path = '/') => {
    document.cookie = `${name}=; Max-Age=0; path=${path}; SameSite=Lax; Secure`;
  };
  