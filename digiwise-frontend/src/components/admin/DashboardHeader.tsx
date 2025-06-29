import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export const DashboardHeader: React.FC = () => {
  const { state, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DigiWise Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Welcome, {state?.admin?.firstName} {state?.admin?.lastName}
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};