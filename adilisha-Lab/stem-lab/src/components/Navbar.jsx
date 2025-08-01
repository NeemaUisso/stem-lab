import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';

const AppNavbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMainContent = location.pathname.startsWith('/virtual-lab') || location.pathname.startsWith('/subject');

  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // for small screen menu toggle

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(isHomePage ? window.scrollY > 20 : true);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const appBarBgColor = isHomePage && !scrolled ? 'transparent' : '#2596be';

  const linkStyles = {
    color: '#003366',
    fontWeight: 500,
    padding: '6px 12px',
    textDecoration: 'none',
    backgroundColor: isHomePage && !scrolled ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
    borderRadius: 4,
    marginRight: 1, // MUI spacing unit ~8px
    display: 'inline-block',
    fontSize: '0.9rem',
    '&:hover': {
      backgroundColor: '#e0e0e0',
      textDecoration: 'none',
    },
  };

  // Handlers for mobile menu toggle on homepage
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: appBarBgColor,
        transition: 'background-color 0.3s ease',
        zIndex: 1300,
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ px: 2 }}>
        {/* Sidebar toggle button on main content pages */}
        {isMainContent && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { xs: 'flex' } }} // visible on small screens only for main content
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo always visible */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            mr: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 50,
              backgroundColor: 'white',
              borderRadius: 2,
              px: 0.5,
              py: 0.25,
            }}
          />
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

      
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
  {isHomePage && (
    <>
      {/* Centered links (Virtual Lab, STEM Club, FAQ) on large screens */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
        }}
      >
        <Button component={Link} to="/virtual-lab" sx={linkStyles}>
          VIRTUAL LAB
        </Button>
        <Button href="#stem-club" sx={linkStyles}>
          STEM CLUB
        </Button>
        <Button href="#faq" sx={linkStyles}>
          FAQ
        </Button>
      </Box>

      {/* Sign In button aligned right on large screen */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'flex-end',
        }}
      >
        <Button
          component={Link}
          to="/signin"
          variant="contained"
          sx={{
            bgcolor: '#003366',
            color: '#fff',
            '&:hover': { bgcolor: '#002244' },
            textTransform: 'none',
          }}
        >
          Sign In
        </Button>
      </Box>

      {/* Mobile (small screen) layout */}
<Box sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'flex-end', width: '100%' }}>
  {/* Toggle icon (left) */}
  <IconButton
    size="large"
    aria-label="menu"
    onClick={handleMenuOpen}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>

  {/* Sign In button (right) */}
  <Button
    component={Link}
    to="/signin"
    variant="contained"
    sx={{
      bgcolor: '#003366',
      color: '#fff',
      '&:hover': { bgcolor: '#002244' },
      textTransform: 'none',
    }}
  >
    Sign In
  </Button>

  {/* Dropdown menu (for mobile) */}
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <MenuItem component={Link} to="/virtual-lab" onClick={handleMenuClose}>
      Virtual Lab
    </MenuItem>
    <MenuItem href="#stem-club" onClick={handleMenuClose}>
      STEM Club
    </MenuItem>
    <MenuItem href="#faq" onClick={handleMenuClose}>
      FAQ
    </MenuItem>
  </Menu>
</Box>

    </>
  )}
</Box>


        {/* On other pages: profile icon on right */}
        {!isHomePage && (
          <IconButton
            component={Link}
            to="/profile"
            sx={{
              fontSize: 32,
              color: '#fff',
              backgroundColor: '#003366',
              borderRadius: '50%',
              padding: '4px',
            }}
            aria-label="profile"
          >
            <AccountCircleIcon fontSize="inherit" />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
