import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/biosampleV.JPG';
import { Box, Typography, Grid, Card, CardActionArea, Tooltip } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import FunctionsIcon from '@mui/icons-material/Functions';
import FlightIcon from '@mui/icons-material/Flight';
import CodeIcon from '@mui/icons-material/Code';
import MemoryIcon from '@mui/icons-material/Memory';
import SchoolIcon from '@mui/icons-material/School';

const subjects = [
  { name: 'Biology', icon: <BiotechIcon /> },
  { name: 'Chemistry', icon: <ScienceIcon /> },
  { name: 'Physics', icon: <ScienceIcon /> },
  { name: 'Mathematics', icon: <FunctionsIcon /> },
  { name: 'Aviation', icon: <FlightIcon /> },
  { name: 'Coding', icon: <CodeIcon /> },
  { name: 'Robotics', icon: <MemoryIcon /> },
];

const spotlighted = ['Mathematics', 'Aviation', 'Coding', 'Robotics'];

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '3rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '16px',
          padding: '2rem',
          width: '100%',
          maxWidth: '1100px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          animation: 'fadeSlideUp 1s ease-in-out',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#003366', fontWeight: 'bold', mb: 4 }}
        >
          Welcome to the STEM Virtual Lab
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {subjects.map((subject, index) => {
            const isSpotlight = spotlighted.includes(subject.name);
            const bgColor = isSpotlight ? '#003366' : '#ffffff';
            const textColor = isSpotlight ? '#ffffff' : '#003366';

            return (
              <Grid item xs={6} sm={4} md={3} key={subject.name}>
                <Tooltip title={`Explore ${subject.name}`} arrow>
                  <Link to={`/virtual-lab/${subject.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                    <Card
                      sx={{
                        backgroundColor: bgColor,
                        color: textColor,
                        borderRadius: 2,
                        minHeight: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        boxShadow: isSpotlight
                          ? '0 0 15px rgba(0, 51, 102, 0.7)'
                          : '0 4px 8px rgba(0,0,0,0.2)',
                        border: isSpotlight ? '2px solid #2596be' : 'none',
                        transition: 'all 0.6s ease-in-out',
                        opacity: 0.85,
                        animation: `fadeSlideUp 0.4s infinite ease ${index * 0.15}s both, pulse 3s infinite ease-in-out`,
                        '&:hover': {
                          transform: 'scale(1.08)',
                          opacity: 1,
                          boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)',
                        },
                      }}
                    >
                      <CardActionArea sx={{ p: 2 }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                          {React.cloneElement(subject.icon, {
                            sx: { fontSize: 30, color: textColor, mb: 1 },
                          })}
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: textColor }}>
                            {subject.name}
                          </Typography>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <style>
        {`
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.85;
            }
            50% {
              transform: scale(1.02);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0.85;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;
