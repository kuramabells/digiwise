require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function fixPasswords() {
  try {
    console.log('Starting password fix script...');
    
    // Find all users
    const users = await User.findAll();
    console.log(`Found ${users.length} users`);

    // Check each user's password
    for (const user of users) {
      const isHashed = user.password.startsWith('$2');
      if (!isHashed) {
        console.log(`Fixing unhashed password for user: ${user.email}`);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        console.log(`Password fixed for user: ${user.email}`);
      }
    }

    console.log('Password fix script completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error in password fix script:', error);
    process.exit(1);
  }
}

fixPasswords(); 