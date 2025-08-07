import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/biosampleV.JPG';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import FunctionsIcon from '@mui/icons-material/Functions';
import FlightIcon from '@mui/icons-material/Flight';
import CodeIcon from '@mui/icons-material/Code';
import MemoryIcon from '@mui/icons-material/Memory';

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
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const disableAnimations = useMediaQuery('(max-width:400px)');

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, sm: 6 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          borderRadius: '16px',
          p: { xs: 2, sm: 3, md: 4 },
          width: '100%',
          maxWidth: '1100px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          animation: disableAnimations ? 'none' : 'fadeSlideUp 1s ease-in-out',
        }}
      >
        <Typography
          variant={isXs ? 'h5' : 'h4'}
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
              <Grid
                item
                xs={12} // 1 column on extra small
                sm={6}  // 2 columns on small
                md={4}  // 3 columns on medium
                lg={3}  // 4 columns on large+
                key={subject.name}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Tooltip title={`Explore ${subject.name}`} arrow>
                  <Link
                    to={`/virtual-lab/${subject.name.toLowerCase()}`}
                    style={{ textDecoration: 'none', width: '100%' }}
                  >
                    <Card
                      sx={{
                        backgroundColor: bgColor,
                        color: textColor,
                        borderRadius: 2,
                        minHeight: { xs: '100px', sm: '110px', md: '120px' },
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
                        animation: disableAnimations
                          ? 'none'
                          : `fadeSlideUp 0.4s ease ${index * 0.15}s both, pulse 3s infinite ease-in-out`,
                        '&:hover': {
                          transform: 'scale(1.08)',
                          opacity: 1,
                          boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)',
                        },
                      }}
                    >
                      <CardActionArea sx={{ p: { xs: 1.5, sm: 2 } }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                          {React.cloneElement(subject.icon, {
                            sx: {
                              fontSize: { xs: 26, sm: 30 },
                              color: textColor,
                              mb: 1,
                            },
                          })}
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 'bold',
                              fontSize: { xs: '0.9rem', sm: '1rem' },
                              color: textColor,
                              textAlign: 'center',
                            }}
                          >
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
