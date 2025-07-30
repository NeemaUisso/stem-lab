// src/components/AppNavbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/logo.png';

const AppNavbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMainContent = location.pathname.startsWith('/virtual-lab') || location.pathname.startsWith('/subject');

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(isHomePage ? window.scrollY > 20 : true);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const navbarStyle = {
    backgroundColor: isHomePage && !scrolled ? 'rgba(255, 255, 255, 0)' : '#2596be',
    transition: 'background-color 0.3s ease',
    zIndex: 9999,
  };

  const linkStyle = {
    color:  '#003366',
    fontWeight: '500',
    padding: '6px 12px',
    textDecoration: 'none',
    backgroundColor: isHomePage && !scrolled ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
    transition: '0.3s',
     marginRight: '8px',
  borderRadius: '4px',
  display: 'inline-block', 
  };

  return (
    <Navbar expand="lg" fixed="top" style={navbarStyle}>
      <Container fluid>
        {isMainContent && (
          <Button variant="light" onClick={toggleSidebar} className="me-2">
            ☰
          </Button>
        )}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" height="50" style={{ background: 'white', borderRadius: '8px' }} />
        </Navbar.Brand>
        {!isMainContent && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {isHomePage && (
              <>
                <Nav.Link as={Link} to="/virtual-lab" style={linkStyle}>VIRTUAL LAB</Nav.Link>
                <Nav.Link as={Link} to="/stem-club" style={linkStyle}>STEM CLUB</Nav.Link>
              </>
            )}
            <NavDropdown title={<span style={ linkStyle}>ASK A TEACHER</span>}>
              <NavDropdown.Item as={Link} to="/ask-a-teacher/faq">FAQ</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/ask-a-teacher/ask">Ask a Teacher</NavDropdown.Item>
            </NavDropdown>
            {!isHomePage ? (
              <Nav.Link as={Link} to="/profile" className="ms-2">
                <AccountCircleIcon style={{ fontSize: 32, color: '#fff', backgroundColor: '#003366', borderRadius: '50%', padding: '4px' }} />
              </Nav.Link>
            ) : (
              <Button as={Link} to="/signin" className="ms-2 btn-darkblue">Sign In</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
