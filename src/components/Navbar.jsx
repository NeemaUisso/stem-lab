import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link , useLocation} from 'react-router-dom';
import logo from '../assets/logo.png';

function AppNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location =useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    const onResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const isSmallScreen = windowWidth < 992;

  const isPageActive = location.pathname !== '/';

  const navbarStyle = {
    backgroundColor: scrolled || isPageActive ? '#2596be' : 'transparent',
    boxShadow: scrolled || isPageActive ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    padding: '10px 0',
  };

  const linkStyle = {
    color: '#003366',
    fontWeight: '500',
    padding: '6px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    display: 'inline-block',
    backgroundColor: scrolled ?   'transparent' : 'rgba(255, 255, 255, 0.5)',
    transition: 'all 0.3s ease',
  };

  const signInButtonStyle = {
    backgroundColor: '#003366',
    borderColor: '#003366',
    color: 'white',
    fontWeight: '500',
    padding: '5px 15px',
    marginLeft: '1rem',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  };

  const togglerStyle = {
    backgroundColor: '#003366',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
  };

  const dropdownMenuStyle = isSmallScreen
    ? {
        backgroundColor: 'white',
        position: 'relative',
        padding: '10px',
        zIndex: 2000,
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      }
    : {};

  const dropdownItemStyle = isSmallScreen
    ? {
        color: '#003366',
        fontWeight: '500',
        padding: '8px 12px',
        textDecoration: 'none',
      }
    : {};

  return (
    <Navbar expand="lg" fixed="top" className={scrolled ? 'navbar-scrolled' : 'navbar-transparent'}
      style={navbarStyle}
      >
  <Container className="d-flex justify-content-between align-items-center">

    {/* Logo */}
    <Navbar.Brand as={Link} to="/">
      <img
        src={logo}
        alt="Logo"
        style={{ 
          backgroundColor: 'white', 
          padding: '5px',
          borderRadius: '5px',
          height: '60px',
         }}
      />
    </Navbar.Brand>

    {/* Right Side: Toggler + Sign In (small screens only) */}
    <div className="d-flex d-lg-none align-items-center">
      <Link to="/signin">
        <Button
          style={{
            backgroundColor: '#003366',
            borderColor: '#003366',
            color: 'white',
            fontWeight: '500',
            padding: '5px 15px',
            marginRight: '10px',
          }}
        >
          Sign In
        </Button>
      </Link>
      <Navbar.Toggle
        aria-controls="navbarToggleExternalContent"
        style={{
          backgroundColor: '#003366',
          border: 'none',
          padding: '6px 10px',
          borderRadius: '4px',
        }}
      />
    </div>

    {/* Collapsible Content */}
    <Navbar.Collapse id="navbarToggleExternalContent">
      {/* Small Screen Shared Box */}
      <div
        className="d-lg-none"
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '12px 20px',
          marginTop: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Nav className="flex-column gap-3">
          
          <Nav.Link
            as={Link}
            to="/virtual-lab"
            style={
              linkStyle
            }
          >
            VIRTUAL LAB
          </Nav.Link>
          
          <Nav.Link
            as={Link}
            to="/stem-club"
            style={
              linkStyle
            }
          >
            STEM CLUB
          </Nav.Link>
          <NavDropdown
            title={<span style={linkStyle}>ASK A TEACHER</span>}
            id="ask-a-teacher-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to="/faq"
              style={{ backgroundColor: 'white', color: '#003366', fontWeight: '500' }}
            >
              FAQ
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/ask-teacher"
              style={{ backgroundColor: 'white', color: '#003366', fontWeight: '500' }}
            >
              Ask a Teacher
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>

      

      {/* Large Screen Normal Navigation */}
      <Nav className="ms-auto d-none d-lg-flex flex-row align-items-center gap-3 mt-3 mt-lg-0">
        <Nav.Link
          as={Link}
          to="/virtual-lab"
          style={linkStyle}
        >
          VIRTUAL LAB
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/stem-club"
          style={linkStyle}
        >
          STEM CLUB
        </Nav.Link>
        <NavDropdown
          title={<span style={linkStyle}>ASK A TEACHER</span>}
          id="ask-a-teacher-dropdown"
        >
          <NavDropdown.Item as={Link} to="/faq">FAQ</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/ask">Ask a Teacher</NavDropdown.Item>
        </NavDropdown>
        <Link to="/signin">
          <Button
            style={signInButtonStyle}
          >
            Sign In
          </Button>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default AppNavbar;
