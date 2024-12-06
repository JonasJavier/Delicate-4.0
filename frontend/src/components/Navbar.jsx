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
  const location = useLocation();

  // Toggle navbar on mobile
  const toggleNavbar = () => {
    setNavbarCollapsed((prevState) => !prevState);
  };

  // Close navbar when a link is clicked
  const handleLinkClick = () => {
    setNavbarCollapsed(true); // Collapse the menu
  };

  // Detect scroll for navbar styling
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
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
    '/admin/product-management',
    '/createblogpost',
  ];

  const pagesWithoutNavbar = ['/Checkout'];

  const isPageWithBlackBg = pagesWithBlackBg.some((page) =>
    location.pathname.startsWith(page)
  );
  const isPageWithoutNavbar = pagesWithoutNavbar.includes(location.pathname);

  if (isPageWithoutNavbar) {
    return null;
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled && !isPageWithBlackBg ? 'scrolled' : ''} ${isPageWithBlackBg ? 'black-bg' : ''}`}
    >
      <div className="container d-flex justify-content-between">
        <NavLink className="navbar-brand" to="/">
          <h2 className="logo">Delicaté</h2>
        </NavLink>
        <div className="d-flex align-items-center">
          <div className="navbar-icons d-lg-none order-1 d-flex align-items-center">
            <NavLink className="nav-link position-relative" to="/ShoppingCart" onClick={handleLinkClick}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </NavLink>
            <div
              className="nav-link position-relative user-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faUser} />
              {showDropdown && (
                <div className="dropdown-menu dropdown-menu-right show custom-dropdown">
                  {user ? (
                    <>
                      <NavLink className="dropdown-item" to="/OrderHistoryPage" onClick={handleLinkClick}>
                        <i className="fas fa-history"></i> Order History
                      </NavLink>
                      <NavLink className="dropdown-item" to="/settings" onClick={handleLinkClick}>
                        <i className="fas fa-cog"></i> Settings
                      </NavLink>
                      {isAdmin && (
                        <>
                          <NavLink
                            className="dropdown-item"
                            to="/admin/product-management"
                            onClick={handleLinkClick}
                          >
                            <i className="fas fa-box"></i> Product Management
                          </NavLink>
                        </>
                      )}
                      <NavLink
                        className="dropdown-item"
                        to="#"
                        onClick={() => {
                          logout();
                          handleLinkClick(); // Close menu after logout
                        }}
                      >
                        <i className="fas fa-sign-out-alt"></i> Log out
                      </NavLink>
                    </>
                  ) : (
                    <NavLink className="dropdown-item" to="/login" onClick={handleLinkClick}>
                      <i className="fas fa-sign-in-alt"></i> Login
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </div>
          <button
            className="navbar-toggler order-2"
            type="button"
            onClick={toggleNavbar}
          >
            <FontAwesomeIcon icon={navbarCollapsed ? faBars : faTimes} />
          </button>
        </div>
        <div className={`collapse navbar-collapse ${navbarCollapsed ? '' : 'show'}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                to="/"
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                to="/shop"
                onClick={handleLinkClick}
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                to="/about"
                onClick={handleLinkClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                to="/contact"
                onClick={handleLinkClick}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                to="/blog"
                onClick={handleLinkClick}
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-icons d-none d-lg-flex align-items-center">
          <NavLink className="nav-link position-relative" to="/ShoppingCart" onClick={handleLinkClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </NavLink>
          <div
            className="nav-link position-relative user-icon"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faUser} />
            {showDropdown && (
              <div className="dropdown-menu dropdown-menu-right show custom-dropdown">
                {user ? (
                  <>
                    <NavLink className="dropdown-item" to="/OrderHistoryPage" onClick={handleLinkClick}>
                      <i className="fas fa-history"></i> Order History
                    </NavLink>
                    <NavLink className="dropdown-item" to="/settings" onClick={handleLinkClick}>
                      <i className="fas fa-cog"></i> Settings
                    </NavLink>
                    {isAdmin && (
                      <>
                        <NavLink
                          className="dropdown-item"
                          to="/admin/product-management"
                          onClick={handleLinkClick}
                        >
                          <i className="fas fa-box"></i> Product Management
                        </NavLink>
                      </>
                    )}
                    <NavLink
                      className="dropdown-item"
                      to="#"
                      onClick={() => {
                        logout();
                        handleLinkClick(); // Close menu after logout
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Log out
                    </NavLink>
                  </>
                ) : (
                  <NavLink className="dropdown-item" to="/login" onClick={handleLinkClick}>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
