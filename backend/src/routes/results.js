const express = require('express');
const { Result, Assessment, User, Answer, Question } = require('../models');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// Get user's assessment results
router.get('/my-results', authenticateUser, async (req, res) => {
  try {
    const results = await Result.findAll({
      include: [
        {
          model: Assessment,
          where: { user_id: req.user.id },
          include: [
            {
              model: User,
              attributes: ['firstName', 'lastName', 'email', 'ageRange', 'region', 'role']
            }
          ]
        }
      ],
      order: [[Assessment, 'completion_time', 'DESC']]
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get detailed result for a specific assessment
router.get('/:assessmentId', authenticateUser, async (req, res) => {
  try {
    const { assessmentId } = req.params;

    // Get assessment with all related data
    const assessment = await Assessment.findOne({
      where: {
        id: assessmentId,
        user_id: req.user.id
      },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email', 'ageRange', 'region', 'role']
        },
        {
          model: Result
        },
        {
          model: Answer,
          include: [Question]
        }
      ]
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    // Format answers by category
    const answersByCategory = {};
    assessment.Answers.forEach(answer => {
      const category = answer.Question.category;
      if (!answersByCategory[category]) {
        answersByCategory[category] = [];
      }
      answersByCategory[category].push({
        question: answer.Question.text,
        value: answer.value
      });
    });

    res.json({
      success: true,
      data: {
        assessment: {
          id: assessment.id,
          startTime: assessment.start_time,
          completionTime: assessment.completion_time,
          isCompleted: assessment.is_completed,
          user: assessment.User,
          result: assessment.Result,
          answersByCategory
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router; 