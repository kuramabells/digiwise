import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'digiwise-v12',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

export { pool, testConnection }; 