require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const createTestUser = async () => {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ where: { email: 'test@example.com' } });
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      region: 'North America',
      ageRange: '25-34'
    });

    console.log('Test user created successfully:', user.email);
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

createTestUser(); 