import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);  
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setNavbarCollapsed(prevState => !prevState);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pagesWithBlackBg = [
    '/product/',
    '/ShoppingCart',
    '/contact',
    '/about',
    '/blog/',
    '/UserPage',
    '/OrderHistoryPage',
    '/orderdetails/',
    '/settings',
    '/OrderConfirmation',
    '/login',
    '/register',
    '/admin/product-management'
  ];

  const pagesWithoutNavbar = ['/Checkout'];

  const isPageWithBlackBg = pagesWithBlackBg.some(page => location.pathname.startsWith(page));
  const isPageWithoutNavbar = pagesWithoutNavbar.includes(location.pathname);

  if (isPageWithoutNavbar) {
    return null;
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled && !isPageWithBlackBg ? 'scrolled' : ''} ${isPageWithBlackBg ? 'black-bg' : ''}`}>
        <div className="container d-flex justify-content-between">
          <NavLink className="navbar-brand" to="/">
            <h2 className='logo'>Delicaté</h2>
          </NavLink>
          <div className="d-flex align-items-center">
            <div className="navbar-icons d-lg-none order-1 d-flex align-items-center">
              <NavLink className="nav-link position-relative" to="/ShoppingCart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </NavLink>
              <div 
                className="nav-link position-relative user-icon" 
                onMouseEnter={() => setShowDropdown(true)} 
                onMouseLeave={() => setShowDropdown(false)}
              >
                <FontAwesomeIcon icon={faUser} />
                {showDropdown && (
                  <div className="dropdown-menu dropdown-menu-right show custom-dropdown">
                    {user ? (
                      <>
                        <NavLink className="dropdown-item" to="/OrderHistoryPage">
                          <i className="fas fa-history"></i> Order History
                        </NavLink>
                        <NavLink className="dropdown-item" to="/settings">
                          <i className="fas fa-cog"></i> Settings
                        </NavLink>
                        
                        {/* Conditionally render Product Management link if the user is admin */}
                        {isAdmin && (
                          <NavLink className="dropdown-item" to="/admin/product-management">
                            <i className="fas fa-box"></i> Product Management
                          </NavLink>
                        )}

                        <NavLink className="dropdown-item" to="#" onClick={logout}>
                          <i className="fas fa-sign-out-alt"></i> Log out
                        </NavLink>
                      </>
                    ) : (
                      <NavLink className="dropdown-item" to="/login">
                        <i className="fas fa-sign-in-alt"></i> Login
                      </NavLink>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button className="navbar-toggler order-2" type="button" onClick={toggleNavbar}>
  <FontAwesomeIcon icon={navbarCollapsed ? faBars : faTimes} />
</button>
          </div>
          <div className={`collapse navbar-collapse ${navbarCollapsed ? '' : 'show'}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/shop">
                  Shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/blog">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-icons d-none d-lg-flex align-items-center">
            <NavLink className="nav-link position-relative" to="/ShoppingCart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </NavLink>
            <div 
              className="nav-link position-relative user-icon" 
              onMouseEnter={() => setShowDropdown(true)} 
              onMouseLeave={() => setShowDropdown(false)}
            >
              <FontAwesomeIcon icon={faUser} />
              {showDropdown && (
                <div className="dropdown-menu dropdown-menu-right show custom-dropdown">
                  {user ? (
                    <>
                      <NavLink className="dropdown-item" to="/OrderHistoryPage">
                        <i className="fas fa-history"></i> Order History
                      </NavLink>
                      <NavLink className="dropdown-item" to="/settings">
                        <i className="fas fa-cog"></i> Settings
                      </NavLink>
                      
                      {/* Conditionally render Product Management link if the user is admin */}
                      {isAdmin && (
                        <NavLink className="dropdown-item" to="/admin/product-management">
                          <i className="fas fa-box"></i> Product Management
                        </NavLink>
                      )}

                      <NavLink className="dropdown-item" to="#" onClick={logout}>
                        <i className="fas fa-sign-out-alt"></i> Log out
                      </NavLink>
                    </>
                  ) : (
                    <NavLink className="dropdown-item" to="/login">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {showHamburgerMenu && (
          <div className="hamburger-menu" onClick={() => setShowHamburgerMenu(false)}>
            <button className="close-btn" onClick={() => setShowHamburgerMenu(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="hamburger-menu-content">
              <NavLink className="hamburger-menu-link" to="/" onClick={() => setShowHamburgerMenu(false)}>Home</NavLink>
              <NavLink className="hamburger-menu-link" to="/shop" onClick={() => setShowHamburgerMenu(false)}>Shop</NavLink>
              <NavLink className="hamburger-menu-link" to="/about" onClick={() => setShowHamburgerMenu(false)}>About</NavLink>
              <NavLink className="hamburger-menu-link" to="/contact" onClick={() => setShowHamburgerMenu(false)}>Contact</NavLink>
              <NavLink className="hamburger-menu-link" to="/blog" onClick={() => setShowHamburgerMenu(false)}>Blog</NavLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
