const jwt = require('jsonwebtoken');
const { User, Admin } = require('../models');

// Use a consistent secret key
const JWT_SECRET = 'digiwise_super_secret_key_2025_secure_123';

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    console.log('\n=== Authentication Debug ===');
    console.log('Auth header:', authHeader);
    console.log('JWT Secret being used:', JWT_SECRET);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No Bearer token found in header');
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
      console.log('❌ No token found after Bearer');
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    try {
      // First, try to decode the token without verification to see its structure
      const decodedWithoutVerify = jwt.decode(token);
      console.log('Decoded token (without verification):', decodedWithoutVerify);

      // Now verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Decoded token (with verification):', decoded);

      if (!decoded || !decoded.id) {
        console.log('❌ Invalid token format - missing id');
        return res.status(401).json({
          success: false,
          message: 'Invalid token format'
        });
      }

      // Get user from database with specific attributes
      const user = await User.findOne({
        where: { id: decoded.id },
        attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'lastLogin']
      });

      console.log('Found user:', user ? `ID: ${user.id}, Email: ${user.email}` : 'Not found');

      if (!user) {
        console.log('❌ User not found in database');
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Add user to request
      req.user = user;
      req.token = token;
      console.log('✅ Authentication successful');
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      console.error('JWT error name:', jwtError.name);
      console.error('JWT error message:', jwtError.message);
      console.error('JWT error stack:', jwtError.stack);

      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired'
        });
      }
      throw jwtError;
    }
  } catch (error) {
    console.error('❌ Authentication error:', error);
    console.error('Error stack:', error.stack);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found'
      });
    }

    req.admin = admin;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication token is required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or expired token'
    });
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
  authenticateToken
}; 