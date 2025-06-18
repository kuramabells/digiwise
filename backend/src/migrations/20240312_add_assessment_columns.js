'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Add progress column
      await queryInterface.addColumn('assessments', 'progress', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      });

      // Add last_answered_at column
      await queryInterface.addColumn('assessments', 'last_answered_at', {
        type: Sequelize.DATE,
        allowNull: true
      });

      // Add created_at and updated_at if they don't exist
      const tableInfo = await queryInterface.describeTable('assessments');
      
      if (!tableInfo.created_at) {
        await queryInterface.addColumn('assessments', 'created_at', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        });
      }

      if (!tableInfo.updated_at) {
        await queryInterface.addColumn('assessments', 'updated_at', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        });
      }

      console.log('✅ Migration completed successfully');
    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Remove added columns
      await queryInterface.removeColumn('assessments', 'progress');
      await queryInterface.removeColumn('assessments', 'last_answered_at');
      await queryInterface.removeColumn('assessments', 'created_at');
      await queryInterface.removeColumn('assessments', 'updated_at');

      console.log('✅ Rollback completed successfully');
    } catch (error) {
      console.error('❌ Rollback failed:', error);
      throw error;
    }
  }
}; 