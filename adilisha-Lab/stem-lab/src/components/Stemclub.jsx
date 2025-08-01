import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tooltip,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CalculateIcon from '@mui/icons-material/Calculate';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TerminalIcon from '@mui/icons-material/Terminal';

const clubs = [
  {
    name: 'RoboWarriors',
    description: 'A group of students building autonomous robots.',
    icon: <SmartToyIcon sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Math Minds',
    description: 'We tackle complex math problems and games.',
    icon: <CalculateIcon sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Aviation Explorers',
    description: 'Learning the basics of flight and making model planes.',
    icon: <FlightTakeoffIcon sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Coding Crafters',
    description: 'Exploring programming through fun projects and teamwork.',
    icon: <TerminalIcon sx={{ fontSize: 60, color: 'white' }} />,
  },
];

const StemClub = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const handleOpen = (clubName) => {
    setSelectedClub(clubName);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedClub(null);
  };

  return (
    <Box sx={{ pt: 10 }}>
      {/* Header */}
      <Box sx={{ backgroundColor: '#2596be', py: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#003366', fontWeight: 'bold' }}>
          Explore, join, or create your own STEM group. Let's innovate together!
        </Typography>
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          my: 4,
        }}
      >
        <Button variant="outlined" color="primary">
          Join a Club
        </Button>
        <Button variant="contained" sx={{ backgroundColor: '#2596be', color: 'white' }}>
          Start a New Club
        </Button>
      </Box>

      {/* Carousel */}
      <Box sx={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            px: 2,
            animation: 'scroll 20s linear infinite',
            '&:hover': {
              animationPlayState: 'paused',
            },
            '@keyframes scroll': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' },
    },
          }}
        >
          {clubs.concat(clubs).map((club, i) => (
            <Card
              key={i}
              sx={{
                minWidth: 250,
                height: 300,
                backgroundColor: 'white',
                textAlign: 'center',
                flexShrink: 0,
                boxShadow: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 140,
                  backgroundColor: '#003366',
                }}
              >
                <Tooltip title={club.name} placement="top" arrow>
                  <span>{club.icon}</span>
                </Tooltip>
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#003366' }}>
                  {club.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#003366' }}>
                  {club.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: '#2596be',
                    color: 'white',
                    '&:hover': { backgroundColor: '#003366' },
                  }}
                  onClick={() => handleOpen(club.name)}
                >
                  Join Club
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',       // <-- fixed from right to left
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Join {selectedClub}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Thank you for your interest in joining <b>{selectedClub}</b>! We'll get in touch with you soon.
            </Typography>
            <Box textAlign="right" mt={3}>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default StemClub;
