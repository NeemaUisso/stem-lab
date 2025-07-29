import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  ChevronRight,
  Code,
  Functions,
  Science,
  Biotech,
  LocalFlorist,
  Flight,
  PrecisionManufacturing
} from '@mui/icons-material';

const drawerWidth = 240;
const drawerColor = '#2596be'; // same as navbar
const textColor = 'darkblue';
const hoverColor = '#1c7ea5'; // darker blue for hover
const activeBgColor = '#ffffff55'; // semi-transparent white for active

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Robotics', icon: <PrecisionManufacturing />, path: '/robotics' },
    { text: 'Aviation', icon: <Flight />, path: '/aviation' },
    { text: 'Coding', icon: <Code />, path: '/coding' },
    { text: 'Mathematics', icon: <Functions />, path: '/mathematics' },
    { text: 'Physics', icon: <Science />, path: '/physics' },
    { text: 'Chemistry', icon: <Biotech />, path: '/chemistry' },
    { text: 'Biology', icon: <LocalFlorist />, path: '/biology' }
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: drawerColor,
          boxSizing: 'border-box',
          color: textColor
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <IconButton onClick={onClose} sx={{ color: textColor, marginLeft: 'auto', m: 1 }}>
        <ChevronRight />
      </IconButton>
      <Divider sx={{ backgroundColor: '#fff' }} />
      <List>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => navigate(path)}
                sx={{
                  '&:hover': {
                    backgroundColor: hoverColor,
                  },
                  backgroundColor: isActive ? activeBgColor : 'transparent',
                }}
              >
                <ListItemIcon sx={{ color: textColor }}>{icon}</ListItemIcon>
                <ListItemText primary={text} primaryTypographyProps={{ style: { color: textColor } }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
