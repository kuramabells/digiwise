import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import { Person, Email, Lock } from '@mui/icons-material';
import { registerAdmin } from '../../services/api/adminApi';

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
        setError('All fields are required');
        return;
      }

      const response = await registerAdmin({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      if (response.status === 201) {
        // Log successful registration
        console.log('Admin registration successful:', {
          email: formData.email,
          timestamp: new Date().toISOString()
        });
        
        // Show success message and redirect to login page
        alert('Registration successful! You will be redirected to the login page.');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/admin/login', {
            state: { 
              registrationSuccess: true,
              email: formData.email 
            },
            replace: true
          });
        }, 1500);
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err: any) {
      if (err.message.includes('Too many requests')) {
        setError('Too many requests. Please wait a moment and try again.');
        setRetryCount(prev => prev + 1);
        
        // If we've retried 3 times, show a more specific message
        if (retryCount >= 3) {
          setError('Too many attempts. Please wait a few minutes before trying again.');
        }
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Person sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography component="h1" variant="h5">
              Admin Registration
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              error={!!error && !formData.firstName}
              helperText={!formData.firstName ? 'First name is required' : ''}
              InputProps={{
                startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              error={!!error && !formData.lastName}
              helperText={!formData.lastName ? 'Last name is required' : ''}
              InputProps={{
                startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!error && !formData.email}
              helperText={!formData.email ? 'Email is required' : ''}
              InputProps={{
                startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!error && !formData.password}
              helperText={!formData.password ? 'Password is required' : ''}
              InputProps={{
                startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/admin/login')}
              sx={{ mt: 1 }}
            >
              Already have an account? Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage; 