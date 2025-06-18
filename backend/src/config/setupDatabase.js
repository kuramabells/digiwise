const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
  let connection;
  try {
    // Create connection without database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS digiwise');
    console.log('✅ Database created or already exists');

    // Use the database
    await connection.query('USE digiwise');
    console.log('✅ Using digiwise database');

    // Create admins table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT(11) NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('✅ Admins table created or already exists');

    // Check if default admin exists
    const [admins] = await connection.query('SELECT * FROM admins WHERE email = ?', ['admin@digiwise.com']);
    
    if (admins.length === 0) {
      // Create default admin
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.query(
        'INSERT INTO admins (email, password, firstName, lastName, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
        ['admin@digiwise.com', hashedPassword, 'Admin', 'User']
      );
      console.log('✅ Default admin created');
    } else {
      console.log('✅ Default admin already exists');
    }

    console.log('✅ Database setup completed successfully');
  } catch (error) {
    console.error('❌ Database setup error:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('✅ Database connection closed');
    }
  }
}

// Run the setup
setupDatabase().catch(console.error); 