import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import { useAuth } from './Auth';

const AppNavbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // We only need 'user' and 'logout' here

  const isMainContent = location.pathname.startsWith('/virtual-lab') || location.pathname.startsWith('/subject');
  
  // This state is fine, but you could also simplify the logic below.
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // We can simplify this logic since we want the background to be solid on all pages except the top of the homepage
    const handleScroll = () => {
      // The background is transparent only on the homepage when at the top.
      const shouldBeScrolled = location.pathname === '/' ? window.scrollY > 20 : true;
      setScrolled(shouldBeScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const appBarBgColor = location.pathname === '/' && !scrolled ? 'transparent' : '#2596be';

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
        {/* Sidebar toggle for main content pages only */}
        {isMainContent && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { xs: 'flex' } }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: 2 }}>
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

        {/* Center links - Always display on large screens */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button component={Link} to="/virtual-lab" sx={{ color: '#fff', textTransform: 'none' }}>
            VIRTUAL LAB
          </Button>
          <Button component={Link} to="/club-list" sx={{ color: '#fff', textTransform: 'none' }}>
            STEM CLUB
          </Button>
          {/* <Button href="#stem-club" sx={{ color: '#fff', textTransform: 'none' }}>
            STEM CLUB
          </Button> */}
           <Button href="/competition" sx={{ color: '#fff', textTransform: 'none' }}>
            COMPETITION
          </Button>
          <Button href="#faq" sx={{ color: '#fff', textTransform: 'none' }}>
            FAQ
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Mobile menu toggle - Always display on small screens */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem component={Link} to="/virtual-lab" onClick={handleMenuClose}>
              Virtual Lab
            </MenuItem>
            {/* <MenuItem onClick={handleMenuClose}>
              <a href="#stem-club" style={{ textDecoration: 'none', color: 'inherit' }}>
                STEM Club
              </a>
            </MenuItem> */}
             <MenuItem component={Link} to="/competition" onClick={handleMenuClose}>
            STEM ClUB
            </MenuItem>
            <MenuItem onClick={handleMenuClose}></MenuItem>
            <MenuItem component={Link} to="/competition" onClick={handleMenuClose}>
            COMPETITION
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>
                FAQ
              </a>
            </MenuItem>
          </Menu>
        </Box>

        {/* Auth section (Sign In / Logout) */}
        <Box sx={{ ml: 2 }}>
          {user ? (
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none' }}
            >
              Logout
            </Button>
          ) : (
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
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;