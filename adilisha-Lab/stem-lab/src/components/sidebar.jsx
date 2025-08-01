// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ScienceIcon from '@mui/icons-material/Science';
import MemoryIcon from '@mui/icons-material/Memory';
import FlightIcon from '@mui/icons-material/Flight';
import FunctionsIcon from '@mui/icons-material/Functions';
import CodeIcon from '@mui/icons-material/Code';
import BoltIcon from '@mui/icons-material/Bolt';
import BiotechIcon from '@mui/icons-material/Biotech';

const drawerWidth = 240;
const subjects = [
  { name: 'Robotics', icon: <MemoryIcon /> },
  { name: 'Aviation', icon: <FlightIcon /> },
  { name: 'Mathematics', icon: <FunctionsIcon /> },
  { name: 'Coding', icon: <CodeIcon /> },
  { name: 'Physics', icon: <BoltIcon /> },
  { name: 'Chemistry', icon: <ScienceIcon /> },
  { name: 'Biology', icon: <BiotechIcon /> },
];

const Sidebar = ({ open }) => {
  const navigate = useNavigate();

  const handleNavigate = (subject) => {
    const path = `/virtual-lab/${subject.toLowerCase()}`;
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          overflowX: 'hidden',
          transition: 'width 0.3s',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          backgroundColor: '#2596be',
          color: '#fff',
        },
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'flex-end' : 'center', padding: '8px' }}>
        {open && (
          <IconButton onClick={() => {}} style={{ color: '#fff' }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </div>
      <Divider />
      <List>
        {subjects.map(({ name, icon }) => (
          <ListItem key={name} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#fff',
              }}
              onClick={() => handleNavigate(name)}
            >
              <ListItemIcon sx={{ color: '#fff', minWidth: 40, mr: open ? 3 : 'auto', justifyContent: 'center', display:'flex', alignItems: 'center' }}>
                {icon}
              </ListItemIcon>
              {open && <ListItemText primary={name} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
