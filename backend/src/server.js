require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const { sequelize } = require('./models');
const app = require('./app');

const PORT = process.env.PORT || 5001;

// Test database connection before starting server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`\n=== Server Status ===`);
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✅ Database: Connected`);
      console.log(`✅ API Base URL: http:/127.0.0.1:${PORT}/api`);
      console.log(`\nAvailable Routes:`);
      console.log(`- POST /api/admins/register`);
      console.log(`- POST /api/admins/login`);
      console.log(`- GET /api/admins/dashboard`);
      console.log(`- GET /api/admins/results`);
      console.log(`\n=== Server Ready ===\n`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // Don't exit the process, just log the error
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  // Don't exit the process, just log the error
}); 
