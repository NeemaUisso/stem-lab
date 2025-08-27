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
  const isTiny = useMediaQuery('(max-width: 360px)'); // really small phones

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '50vh', sm: '70vh', md: '90vh' }, // small screens auto
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 2, sm: 4, md: 6 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            borderRadius: '16px',
            p: {
              xs: isTiny ? 1 : 1.5,
              sm: 3,
              md: 4
            },
            width: '100%',
            maxWidth: '1100px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Heading */}
          <Typography
            variant={isTiny ? 'subtitle1' : isXs ? 'h6' : 'h4'}
            align="center"
            gutterBottom
            sx={{ color: '#003366', fontWeight: 'bold', mb: isTiny ? 1 : 2 }}
          >
            Welcome to the STEM Virtual Lab
          </Typography>

          {/* Subjects Grid */}
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center">
            {subjects.map((subject) => {
              const isSpotlight = spotlighted.includes(subject.name);
              const bgColor = isSpotlight ? '#003366' : '#ffffff';
              const textColor = isSpotlight ? '#ffffff' : '#003366';

              return (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={subject.name}
                  sx={{ display: 'flex', justifyContent: 'center', mb: isTiny ? 0.5 : 1 }}
                >
                  <Tooltip title={`Explore ${subject.name}`} arrow>
                    <Link
                      to={`/virtual-lab/${subject.name.toLowerCase()}`}
                      style={{ textDecoration: 'none', width: '100%', maxWidth: '200px' }}
                    >
                      <Card
                        sx={{
                          backgroundColor: bgColor,
                          color: textColor,
                          borderRadius: 2,
                          minHeight: {
                            xs: isTiny ? '60px' : '70px',
                            sm: '100px',
                            md: '120px'
                          },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          boxShadow: isSpotlight
                            ? '0 0 15px rgba(0, 51, 102, 0.7)'
                            : '0 4px 8px rgba(0,0,0,0.2)',
                          border: isSpotlight ? '2px solid #2596be' : 'none',
                          mx: 'auto',
                        }}
                      >
                        <CardActionArea sx={{ p: { xs: isTiny ? 0.5 : 1, sm: 1, md: 2 } }}>
                          <Box display="flex" flexDirection="column" alignItems="center">
                            {React.cloneElement(subject.icon, {
                              sx: {
                                fontSize: {
                                  xs: isTiny ? 18 : 20,
                                  sm: 26,
                                  md: 30
                                },
                                color: textColor,
                                mb: 1
                              },
                            })}
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 'bold',
                                fontSize: {
                                  xs: isTiny ? '0.7rem' : '0.75rem',
                                  sm: '0.9rem',
                                  md: '1rem'
                                },
                                color: textColor
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
      </Box>

      {/* Global styles */}
      <style>
        {`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 0.85; }
          }
        `}
      </style>
    </>
  );
};

export default Home;
