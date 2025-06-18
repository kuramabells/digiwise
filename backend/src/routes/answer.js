const express = require('express');
const { Answer, Assessment } = require('../models');
const { authenticateUser } = require('../middleware/auth');
const { sequelize } = require('../models');

const router = express.Router();

// Save a single answer
router.post('/', authenticateUser, async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    console.log('=== Starting Save Answer Process ===');
    console.log('Request Data:', {
      body: req.body,
      user: req.user,
      headers: req.headers
    });

    const { question_id, value, assessment_id } = req.body;

    // Validate request data
    if (!question_id || value === undefined || !assessment_id) {
      console.error('❌ Validation Error:', { question_id, value, assessment_id });
      return res.status(400).json({
        success: false,
        message: 'Invalid answer data format'
      });
    }

    console.log('✅ Data validation passed');

    // Check if assessment exists and belongs to user
    const assessment = await Assessment.findOne({
      where: {
        id: assessment_id,
        user_id: req.user.id,
        is_completed: false // Ensure assessment is not completed
      },
      transaction
    });

    if (!assessment) {
      console.error('❌ Assessment not found or already completed');
      return res.status(404).json({
        success: false,
        message: 'Assessment not found or already completed'
      });
    }

    // Check if answer already exists for this assessment and question
    console.log('🔍 Checking for existing answer...');
    const existingAnswer = await Answer.findOne({
      where: {
        assessment_id,
        question_id
      },
      transaction
    });

    let answer;
    if (existingAnswer) {
      console.log('📝 Updating existing answer...');
      try {
        answer = await existingAnswer.update({
          value,
          updated_at: new Date()
        }, { transaction });
        console.log('✅ Answer updated successfully:', answer.toJSON());
      } catch (updateError) {
        console.error('❌ Error updating answer:', updateError);
        throw new Error(`Failed to update answer: ${updateError.message}`);
      }
    } else {
      console.log('📝 Creating new answer...');
      try {
        answer = await Answer.create({
          assessment_id,
          question_id,
          value,
          user_id: req.user.id
        }, { transaction });
        console.log('✅ Answer created successfully:', answer.toJSON());
      } catch (createError) {
        console.error('❌ Error creating answer:', createError);
        throw new Error(`Failed to create answer: ${createError.message}`);
      }
    }

    // Update assessment progress
    const totalAnswers = await Answer.count({
      where: { assessment_id },
      transaction
    });

    const progress = Math.round((totalAnswers / 20) * 100); // Assuming 20 questions total
    await assessment.update({
      progress,
      last_answered_at: new Date()
    }, { transaction });

    await transaction.commit();
    console.log('=== Save Answer Process Completed ===');

    res.json({
      success: true,
      message: 'Answer saved successfully',
      data: {
        answer: answer.toJSON(),
        progress
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Fatal Error in Save Answer Process:', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Save multiple answers
router.post('/save-answers', authenticateUser, async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    console.log('=== Starting Save Multiple Answers Process ===');
    console.log('Request Data:', {
      body: req.body,
      user: req.user,
      headers: req.headers
    });

    const { answers, assessment_id } = req.body;

    // Validate request data
    if (!answers || !Array.isArray(answers) || !assessment_id) {
      console.error('❌ Validation Error: Invalid answers data format');
      return res.status(400).json({
        success: false,
        message: 'Invalid answers data format'
      });
    }

    // Check if assessment exists and belongs to user
    const assessment = await Assessment.findOne({
      where: {
        id: assessment_id,
        user_id: req.user.id,
        is_completed: false // Ensure assessment is not completed
      },
      transaction
    });

    if (!assessment) {
      console.error('❌ Assessment not found or already completed');
      return res.status(404).json({
        success: false,
        message: 'Assessment not found or already completed'
      });
    }

    console.log('✅ Data validation passed');

    // Validate each answer
    for (const answer of answers) {
      if (!answer.question_id || answer.value === undefined) {
        console.error('❌ Validation Error: Invalid answer data:', answer);
        return res.status(400).json({
          success: false,
          message: `Invalid answer data for question ${answer.question_id}`
        });
      }
    }

    console.log('✅ All answers validated');

    // Save each answer
    const savedAnswers = [];
    for (const answer of answers) {
      console.log(`\n🔍 Processing answer for question ${answer.question_id}...`);
      
      try {
        // Check if answer already exists
        const existingAnswer = await Answer.findOne({
          where: {
            assessment_id,
            question_id: answer.question_id
          },
          transaction
        });

        let savedAnswer;
        if (existingAnswer) {
          console.log('📝 Updating existing answer...');
          savedAnswer = await existingAnswer.update({
            value: answer.value,
            updated_at: new Date()
          }, { transaction });
          console.log('✅ Answer updated successfully');
        } else {
          console.log('📝 Creating new answer...');
          savedAnswer = await Answer.create({
            assessment_id,
            question_id: answer.question_id,
            value: answer.value,
            user_id: req.user.id
          }, { transaction });
          console.log('✅ Answer created successfully');
        }
        savedAnswers.push(savedAnswer.toJSON());
      } catch (saveError) {
        console.error(`❌ Error saving answer for question ${answer.question_id}:`, saveError);
        throw new Error(`Failed to save answer for question ${answer.question_id}: ${saveError.message}`);
      }
    }

    // Update assessment progress
    const totalAnswers = await Answer.count({
      where: { assessment_id },
      transaction
    });

    const progress = Math.round((totalAnswers / 20) * 100); // Assuming 20 questions total
    await assessment.update({
      progress,
      last_answered_at: new Date()
    }, { transaction });

    // Commit the transaction
    console.log('\n💾 Committing transaction...');
    await transaction.commit();
    console.log('✅ Transaction committed successfully');
    console.log('=== Save Multiple Answers Process Completed ===');

    res.json({
      success: true,
      message: 'Answers saved successfully',
      data: {
        answers: savedAnswers,
        progress
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Fatal Error in Save Multiple Answers Process:', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

module.exports = router; 