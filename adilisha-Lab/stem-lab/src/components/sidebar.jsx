import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ScienceIcon from '@mui/icons-material/Science';
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import FlightIcon from '@mui/icons-material/Flight';
import FunctionsIcon from '@mui/icons-material/Functions';
import CodeIcon from '@mui/icons-material/Code';
import BoltIcon from '@mui/icons-material/Bolt';
import BiotechIcon from '@mui/icons-material/Biotech';

const drawerWidth = 240;
const subjects = [
  { name: 'Robotics', icon: <PrecisionManufacturingIcon />, path: '/virtual-lab/robotics' },
  { name: 'Aviation', icon: <FlightIcon />, path: '/virtual-lab/aviation' },
  { name: 'Mathematics', icon: <FunctionsIcon />, path: '/virtual-lab/mathematics' },
  { name: 'Coding', icon: <CodeIcon />, path: '/virtual-lab/coding' },
  { name: 'Physics', icon: <BoltIcon />, path: '/virtual-lab/physics' },
  { name: 'Chemistry', icon: <ScienceIcon />, path: '/virtual-lab/chemistry' },
  { name: 'Biology', icon: <BiotechIcon />, path: '/virtual-lab/biology' },
];

const practicalPaths = subjects.map((s) => s.path);

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // ✅ Mobile View → Bottom Navigation only for practical subjects
  if (isMobile) {
    if (location.pathname.startsWith("/virtual-lab")) {
      return (
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 56, zIndex: (theme) => theme.zIndex.drawer + 1 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels={false}
            value={location.pathname}
            onChange={(event, newValue) => handleNavigate(newValue)}
            sx={{ bgcolor: '#2596be' }}
          >
            {subjects.map(({ name, icon, path }) => (
              <BottomNavigationAction
                key={name}
                value={path}
                icon={
                  <Tooltip title={name} arrow>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {icon}
                    </span>
                  </Tooltip>
                }
                sx={{
                  minWidth: 0,
                  flex: 1,
                  px: 0.5,
                  color: 'white',
                  '&.Mui-selected': { color: '#003366' }, // rangi ya active
                }}
              />
            ))}
          </BottomNavigation>
        </Paper>


      );
    }
    return null; // On mobile, non-practical pages show nothing
  }

  // ✅ Desktop Drawer with toggle button
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
                color: location.pathname === path ? '#1976d2' : '#fff',
                backgroundColor:
                  location.pathname === path ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
              onClick={() => handleNavigate(path)}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === path ? '#1976d2' : '#fff',
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
