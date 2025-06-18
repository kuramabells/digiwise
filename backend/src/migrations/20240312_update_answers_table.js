'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Add assessment_id column if it doesn't exist
      const tableInfo = await queryInterface.describeTable('answers');
      
      if (!tableInfo.assessment_id) {
        await queryInterface.addColumn('answers', 'assessment_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'assessments',
            key: 'id'
          }
        });
      }

      // Add created_at and updated_at if they don't exist
      if (!tableInfo.created_at) {
        await queryInterface.addColumn('answers', 'created_at', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        });
      }

      if (!tableInfo.updated_at) {
        await queryInterface.addColumn('answers', 'updated_at', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        });
      }

      // Add unique index for question_id and assessment_id
      try {
        await queryInterface.addIndex('answers', ['question_id', 'assessment_id'], {
          unique: true,
          name: 'answers_question_assessment_unique'
        });
      } catch (error) {
        console.log('Index might already exist, continuing...');
      }

      console.log('✅ Migration completed successfully');
    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Remove index
      await queryInterface.removeIndex('answers', 'answers_question_assessment_unique');

      // Remove columns
      await queryInterface.removeColumn('answers', 'assessment_id');
      await queryInterface.removeColumn('answers', 'created_at');
      await queryInterface.removeColumn('answers', 'updated_at');

      console.log('✅ Rollback completed successfully');
    } catch (error) {
      console.error('❌ Rollback failed:', error);
      throw error;
    }
  }
}; 