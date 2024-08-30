// src/utils/cookies.js

/**
 * Obtains the value of a cookie by its name.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} - The value of the cookie or null if it doesn't exist.
 */
export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Checks if this cookie starts with the searched name
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

/**
 * Sets a cookie with a name, value, and optionally expiration days.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} [days=7] - Optional. The number of days before the cookie expires. If null, the cookie will be session-based.
 */
export const setCookie = (name, value, days = 7) => {
    let expires = '';
    if (days !== null) {
        expires = `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/;${expires}; SameSite=Lax; Secure`;
};

/**
 * Deletes a cookie by its name.
 * @param {string} name - The name of the cookie to delete.
 */
export const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax; Secure`;
};
