const express = require('express');
const jwt = require('jsonwebtoken');
const { Admin, Assessment, Result, User } = require('../models');
const { authenticateAdmin } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Admin registration
router.post('/register', async (req, res) => {
  console.log('\n=== Admin Registration Request ===');
  console.log('Request Body:', req.body);
  
  try {
    // Validate request body
    const { email, password, firstName, lastName } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }

    // Check if admin already exists
    console.log('Checking for existing admin...');
    const existingAdmin = await Admin.findOne({ where: { email } });
    
    if (existingAdmin) {
      console.log('❌ Admin already exists');
      return res.status(400).json({
        status: 'error',
        message: 'Admin already exists'
      });
    }

    // Create new admin
    console.log('Creating new admin...');
    const admin = await Admin.create({
      email,
      password,
      firstName,
      lastName
    });

    console.log('✅ Admin created successfully');

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Token generated successfully');

    // Send response
    res.status(201).json({
      status: 'success',
      message: 'Admin registered successfully',
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName
        },
        token
      }
    });

  } catch (error) {
    console.error('❌ Registration Error:', error);
    
    // Handle specific error types
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists'
      });
    }

    // Handle any other errors
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  console.log('\n=== Admin Login Request ===');
  console.log('Request Body:', req.body);
  
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find admin
    console.log('Finding admin...');
    const admin = await Admin.findOne({ where: { email } });
    
    if (!admin) {
      console.log('❌ Admin not found');
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Verify password
    console.log('Verifying password...');
    const isValidPassword = await admin.checkPassword(password);
    
    if (!isValidPassword) {
      console.log('❌ Invalid password');
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful');

    // Send response
    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName
        },
        token
      }
    });

  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get dashboard stats
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    // Get total assessments
    const totalAssessments = await Assessment.count();

    // Get completed assessments
    const completedAssessments = await Assessment.count({
      where: { is_completed: true }
    });

    // Get risk level distribution
    const results = await Result.findAll();
    const riskDistribution = {
      low: 0,
      moderate: 0,
      high: 0,
      severe: 0
    };

    results.forEach(result => {
      riskDistribution[result.risk_level]++;
    });

    // Get recent assessments with user info
    const recentAssessments = await Assessment.findAll({
      where: { is_completed: true },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: Result,
          attributes: ['overall_score', 'risk_level']
        }
      ],
      order: [['completion_time', 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        totalAssessments,
        completedAssessments,
        riskDistribution,
        recentAssessments
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all assessment results
router.get('/results', authenticateAdmin, async (req, res) => {
  try {
    const results = await Result.findAll({
      include: [
        {
          model: Assessment,
          include: [
            {
              model: User,
              attributes: ['firstName', 'lastName', 'email', 'ageRange', 'region', 'role']
            }
          ]
        }
      ],
      order: [[Assessment, 'completion_time', 'DESC']]
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router; 