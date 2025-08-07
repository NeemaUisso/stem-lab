// src/components/Sidebar.jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';
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
  { name: 'Robotics', icon: <MemoryIcon />, path: '/virtual-lab/robotics' },
  { name: 'Aviation', icon: <FlightIcon />, path: '/virtual-lab/aviation' },
  { name: 'Mathematics', icon: <FunctionsIcon />, path: '/virtual-lab/mathematics' },
  { name: 'Coding', icon: <CodeIcon />, path: '/virtual-lab/coding' },
  { name: 'Physics', icon: <BoltIcon />, path: '/virtual-lab/physics' },
  { name: 'Chemistry', icon: <ScienceIcon />, path: '/virtual-lab/chemistry' },
  { name: 'Biology', icon: <BiotechIcon />, path: '/virtual-lab/biology' },
];


const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };


  const toggleDrawer = () => {
    setOpen(!open); // Close if open, open if closed
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'flex-end' : 'center',
          padding: '8px',
        }}
      >
        <IconButton onClick={toggleDrawer} style={{ color: '#fff' }}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {subjects.map(({ name, icon, path }) => (
          <ListItem key={name} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#fff',
              }}
              onClick={() => handleNavigate(path)}
            >
              <ListItemIcon
                sx={{
                  color: '#fff',
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
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
