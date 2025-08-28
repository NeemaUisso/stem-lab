import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Fab,
  Zoom,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TikTokIcon from '@mui/icons-material/MusicNote';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={true}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Fab size="small" aria-label="scroll back to top" sx={{ bgcolor: '#003366', color: 'white' }}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#003366', color: 'white', mt: 6, pt: 4 , }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 } }}>
        <Grid container spacing={4} justifyContent="space-between">
          {/* Useful Links */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" gutterBottom>USEFUL LINKS</Typography>
            <Box>
              <Link href="#" underline="none" color="inherit" display="block" mb={1}>Home</Link>
              <Link href="#" underline="none" color="inherit" display="block" mb={1}>Partners</Link>
              <Link href="https://adilisha.or.tz" underline="none" color="inherit" display="block" mb={1}>Read More</Link>
            </Box>
          </Grid>

          {/* Contact */}
          {/* Contact */}
<Grid item xs={12} sm={5} md={4}>
  <Typography variant="h6" gutterBottom>CONTACT</Typography>

  <Box display="flex" alignItems="center" mb={1}>
    <LocationOnIcon sx={{ mr: 1 }} />
    <Typography variant="body2">
      Bondeni Street, Ghana<br />
      Mwanza - Tanzania
    </Typography>
  </Box>

  <Box display="flex" alignItems="center" mb={1}>
    <EmailIcon sx={{ mr: 1 }} />
    <Typography variant="body2">info@adilisha.or.tz</Typography>
  </Box>

  <Box display="flex" alignItems="center">
    <PhoneIcon sx={{ mr: 1 }} />
    <Typography variant="body2">0282561724</Typography>
  </Box>
</Grid>


          {/* Socials */}
          <Grid item xs={12} sm={12} md={3} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="h6" gutterBottom>FOLLOW US</Typography>
            <IconButton color="inherit" href="#"><FacebookIcon /></IconButton>
            <IconButton color="inherit" href="#"><TwitterIcon /></IconButton>
            <IconButton color="inherit" href="#"><InstagramIcon /></IconButton>
            <IconButton color="inherit" href="#"><TikTokIcon /></IconButton>
          </Grid>
        </Grid>

        <Box mt={4} borderTop={1} borderColor="gray" pt={3} pb={2} display="flex" justifyContent="space-between" flexWrap="wrap">
          <Typography variant="body2">
            © 2025 Copyright: 
            <Link href="https://adilisha.or.tz" color="inherit" underline="none" sx={{ ml: 1 }}>
              Adilisha All Rights Reserved
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Scroll to Top Button */}
      <ScrollTop />
    </Box>
  );
};

export default Footer;
