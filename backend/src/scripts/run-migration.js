require('dotenv').config();
const { sequelize } = require('../models');
const assessmentMigration = require('../migrations/20240312_add_assessment_columns');
const answerMigration = require('../migrations/20240312_update_answers_table');

async function runMigrations() {
  try {
    console.log('Starting migrations...');
    
    // Run assessment migration
    console.log('\nRunning assessment migration...');
    await assessmentMigration.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    
    // Run answer migration
    console.log('\nRunning answer migration...');
    await answerMigration.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    
    console.log('\n✅ All migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations(); 