import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Person, Email, LocationOn, Cake } from '@mui/icons-material';
import { examineeApi, UserFormData } from '../services/api/examineeApi';

const ExamineeRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    first_name: '',
    email: '',
    age_range: '',
    region: '',
    role: 'examinee'
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.first_name || !formData.email || !formData.age_range || !formData.region) {
        setError('All fields are required');
        return;
      }

      const response = await examineeApi.register(formData);

      if (response.success) {
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        setError(response.message || 'Registration failed');
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
              Examinee Registration
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="Full Name"
              name="first_name"
              autoComplete="name"
              value={formData.first_name}
              onChange={handleChange}
              error={!!error && !formData.first_name}
              helperText={!formData.first_name ? 'Full name is required' : ''}
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
            <FormControl fullWidth margin="normal" required error={!!error && !formData.age_range}>
              <InputLabel id="age-range-label">Age Range</InputLabel>
              <Select
                labelId="age-range-label"
                id="age_range"
                name="age_range"
                value={formData.age_range}
                onChange={handleChange}
                label="Age Range"
                startAdornment={<Cake sx={{ color: 'action.active', mr: 1 }} />}
              >
                <MenuItem value="18-24">18-24</MenuItem>
                <MenuItem value="25-34">25-34</MenuItem>
                <MenuItem value="35-44">35-44</MenuItem>
                <MenuItem value="45-54">45-54</MenuItem>
                <MenuItem value="55+">55+</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required error={!!error && !formData.region}>
              <InputLabel id="region-label">Region</InputLabel>
              <Select
                labelId="region-label"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                label="Region"
                startAdornment={<LocationOn sx={{ color: 'action.active', mr: 1 }} />}
              >
                <MenuItem value="north">North</MenuItem>
                <MenuItem value="south">South</MenuItem>
                <MenuItem value="east">East</MenuItem>
                <MenuItem value="west">West</MenuItem>
                <MenuItem value="central">Central</MenuItem>
              </Select>
            </FormControl>
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
              onClick={() => navigate('/login')}
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

export default ExamineeRegisterPage; 