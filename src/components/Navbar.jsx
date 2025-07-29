import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import logo from '../assets/logo.png'; // your logo path

const AppNavbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === "/";
  const isMainContent = location.pathname === '/main-content' || location.pathname.includes('/virtual-lab');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `navbar fixed-top navbar-expand-lg ${
    isMainContent || scrolled ? 'navbar-colored' : 'navbar-transparent'
  }`;

  

  const navbarStyle = {
    transition: "background-color 0.3s ease",
    backgroundColor:
      isHomePage && !scrolled ? "rgba(255, 255, 255, 0.0)" : "#2596be"
  };

  const linkStyle = {
    color: "#003366",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    display: "inline-block",
    backgroundColor: scrolled ? "transparent" : "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease",
  };


  return (
    <Navbar className={navbarClasses} expand="lg" style={navbarStyle}>
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" height="50" style={{ backgroundColor: "white", padding: "6px 12px", borderRadius: "6px" }} />
        </Navbar.Brand>

        {/* Sidebar toggle for main content (ALWAYS visible on right) */}
        {isMainContent && (
          <Button onClick={toggleSidebar} className="ms-auto btn btn-outline-light d-lg-none bg-darkblue">
            ☰
          </Button>
        )}

        {/* Collapse for non-main pages */}
        {!isMainContent && <Navbar.Toggle aria-controls="basic-navbar-nav" />}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Only show Virtual Lab & STEM Club if NOT in main content */}
            {!isMainContent && (
              <>
                <Nav.Link as={Link} to="/virtual-lab" style={linkStyle}>
                  VIRTUAL LAB
                </Nav.Link>
                <Nav.Link as={Link} to="/stem-club" style={linkStyle}>
                  STEM CLUB
                </Nav.Link>
              </>
            )}

            {/* Ask a Teacher (always visible) */}
            <NavDropdown
              title={<span style={{ ...linkStyle, color: "#003366" }}>ASK A TEACHER</span>}
              id="ask-a-teacher-dropdown"
            >
              <NavDropdown.Item as={Link} to="/ask-a-teacher/faq">FAQ</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/ask-a-teacher/ask">Ask a Teacher</NavDropdown.Item>
            </NavDropdown>

            {/* Sign In: Only show if not in main content */}
            {!isMainContent && (
              <Button variant="primary" className="fw-bold px-3 py-2 btn-darkblue">
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>

        {/* Sidebar toggle also for large screen on main-content */}
        {isMainContent && (
          <Button onClick={toggleSidebar} className="d-none d-lg-inline btn btn-darkblue ms-2">
            ☰
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
