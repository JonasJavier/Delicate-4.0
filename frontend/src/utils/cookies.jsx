export const getCookie = (name) => {
  if (!name) return null;
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    try {
      acc[key] = decodeURIComponent(value);
    } catch (error) {
      console.warn(`Error decoding cookie: ${key}`, error);
    }
    return acc;
  }, {});
  return cookies[name] || null;
};

export const setCookie = (name, value, days = 7, path = '/') => {
  if (!name || !value) {
    throw new Error('Both name and value are required for setting a cookie.');
  }

  const expires = days
    ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`
    : '';
  const isSecure = location.protocol === 'https:' ? 'Secure; ' : '';
  const sameSite = 'SameSite=Lax;';

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path};${expires}; ${sameSite} ${isSecure}`;
};

export const deleteCookie = (name, path = '/') => {
  if (!name) {
    throw new Error('Cookie name is required for deletion.');
  }

  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=${path}; SameSite=Lax; Secure`;
};
