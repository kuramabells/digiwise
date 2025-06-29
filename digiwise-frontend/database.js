const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('digiwise', 'root', '', {
  host: '127.0.0.1', // Use IPv4 address instead of 'localhost'
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  port: 3306,
  dialectOptions: {
    connectTimeout: 60000, // Increase timeout to 60 seconds
    socketPath: null, // Explicitly set to null to use TCP/IP
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true
  }
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

testConnection();

module.exports = sequelize; 