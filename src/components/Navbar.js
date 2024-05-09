import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavLink, NavbarToggle, NavbarCollapse } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useNavigate, Link } from 'react-router-dom';

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLoggedInStatus = () => {
      const userToken = localStorage.getItem('token');
      setIsLoggedIn(!!userToken);
    };

    checkUserLoggedInStatus();
    setLoading(false); // Set loading to false once authentication status is checked
  }, []);

  const handleUserLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('Name');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('User logout successful!');
    navigate('/login');
  };

  if (loading) return null; // Return null while loading

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Food Rage</Navbar.Brand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <NavLink as={Link} to="/orders">My Orders</NavLink>
                <NavLink as={Link} to="/cart">Cart</NavLink>
                <NavLink onClick={handleUserLogout}>Logout</NavLink>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavLink as={Link} to="/login">User Login</NavLink>
                <NavLink as={Link} to="/signup">User Signup</NavLink>
                {/* Removed Admin Login NavLink */}
              </>
            )}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
