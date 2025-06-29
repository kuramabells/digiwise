import fs from 'fs';
import path from 'path';
import { pool } from '../config/database';

async function runMigrations() {
  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '../database/migrations/001_initial_schema.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Split the SQL file into individual statements
    const statements = migrationSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    // Execute each statement
    for (const statement of statements) {
      await pool.query(statement);
      console.log('Executed:', statement.substring(0, 50) + '...');
    }

    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations(); 