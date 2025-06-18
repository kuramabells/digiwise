const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');

// Use the same secret key as auth middleware
const JWT_SECRET = 'digiwise_super_secret_key_2025_secure_123';

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('\n=== Login Attempt ===');
    console.log('Email:', email);

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find user by email (case-insensitive)
    const user = await User.findOne({
      where: {
        email: email.toLowerCase()
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'role']
    });

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check if password is hashed
    const isHashed = user.password.startsWith('$2');
    let isValidPassword = false;

    if (isHashed) {
      isValidPassword = await bcrypt.compare(password, user.password);
    } else {
      // If password is not hashed, hash it and update the user
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({ password: hashedPassword });
      isValidPassword = true;
    }

    if (!isValidPassword) {
      console.log('❌ Invalid password');
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const tokenPayload = { 
      id: user.id,
      email: user.email,
      role: user.role
    };

    console.log('\n=== Token Generation Debug ===');
    console.log('Token payload:', tokenPayload);
    console.log('JWT Secret being used:', JWT_SECRET);

    const token = jwt.sign(
      tokenPayload,
      JWT_SECRET,
      { 
        expiresIn: '24h',
        algorithm: 'HS256'
      }
    );

    console.log('Generated token:', token);

    // Verify the token immediately to ensure it's valid
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      console.log('Token verified immediately:', verified);
      console.log('Token verification successful ✅');
    } catch (error) {
      console.error('Token verification failed:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw new Error('Failed to generate valid token');
    }

    // Update last login
    try {
      await user.update({ lastLogin: new Date() });
    } catch (error) {
      console.error('Error updating last login:', error);
    }

    // Remove password from user object
    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    res.json({
      status: 'success',
      message: 'Login successful',
      token,
      user: userResponse,
      success: true
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during login'
    });
  }
});

// Get current user
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'role']
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching user data'
    });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required',
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'User with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'user', // Default role
    });

    // Omit password from the response
    const userResponse = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    };

    // Generate JWT token for the new user
    const tokenPayload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = jwt.sign(
      tokenPayload,
      JWT_SECRET,
      { 
        expiresIn: '24h',
        algorithm: 'HS256'
      }
    );

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during registration',
    });
  }
});

module.exports = router; 