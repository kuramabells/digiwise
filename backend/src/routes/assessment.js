const express = require('express');
const { Question, Answer, Assessment, Result } = require('../models');
const { authenticateUser } = require('../middleware/auth');
const { sequelize } = require('../models');

const router = express.Router();

// Get all questions
router.get('/questions', authenticateUser, async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

// Start new assessment
router.post('/start', authenticateUser, async (req, res) => {
  try {
    console.log('\n=== Starting Assessment ===');
    console.log('User:', req.user);
    console.log('Request body:', req.body);
    console.log('Headers:', req.headers);

    // Check if user already has an active assessment
    const existingAssessment = await Assessment.findOne({
      where: {
        user_id: req.user.id,
        is_completed: false
      }
    });

    if (existingAssessment) {
      console.log('Found existing assessment:', existingAssessment.id);
      return res.json({
        success: true,
        data: existingAssessment
      });
    }

    // Create new assessment
    const assessment = await Assessment.create({
      user_id: req.user.id,
      start_time: new Date()
    });

    console.log('Created new assessment:', assessment.id);

    res.status(201).json({
      success: true,
      data: assessment
    });
  } catch (error) {
    console.error('Error starting assessment:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Save answer
router.post('/answer', authenticateUser, async (req, res) => {
  try {
    const { assessment_id, question_id, value } = req.body;

    // Check if assessment exists and belongs to user
    const assessment = await Assessment.findOne({
      where: {
        id: assessment_id,
        user_id: req.user.id
      }
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    // Save or update answer
    const [answer, created] = await Answer.findOrCreate({
      where: {
        assessment_id,
        question_id
      },
      defaults: {
        value
      }
    });

    if (!created) {
      answer.value = value;
      await answer.save();
    }

    res.json({
      success: true,
      data: answer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Complete assessment
router.post('/complete', authenticateUser, async (req, res) => {
  try {
    const { assessment_id } = req.body;

    // Check if assessment exists and belongs to user
    const assessment = await Assessment.findOne({
      where: {
        id: assessment_id,
        user_id: req.user.id
      },
      include: [
        {
          model: Answer,
          as: 'answers',
          include: [{
            model: Question,
            as: 'question',
            attributes: ['id', 'category']
          }]
        }
      ]
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    // Calculate results
    const answers = assessment.answers;
    const categoryScores = {};
    let totalScore = 0;

    answers.forEach(answer => {
      const category = answer.question.category;
      if (!categoryScores[category]) {
        categoryScores[category] = 0;
      }
      categoryScores[category] += answer.value;
      totalScore += answer.value;
    });

    // Calculate overall score (0-100)
    const maxPossibleScore = answers.length * 5;
    const minPossibleScore = answers.length * 1;
    const normalizedScore = ((totalScore - minPossibleScore) / (maxPossibleScore - minPossibleScore)) * 100;
    const overallScore = Math.round(normalizedScore);

    // Determine risk level
    let riskLevel = 'low';
    if (overallScore >= 75) {
      riskLevel = 'severe';
    } else if (overallScore >= 50) {
      riskLevel = 'high';
    } else if (overallScore >= 25) {
      riskLevel = 'moderate';
    }

    // Create result
    const result = await Result.create({
      assessment_id,
      overall_score: overallScore,
      category_scores: categoryScores,
      risk_level: riskLevel
    });

    // Update assessment as completed
    assessment.is_completed = true;
    assessment.completion_time = new Date();
    await assessment.save();

    res.json({
      success: true,
      data: {
        assessment: assessment.toJSON(),
        result: result.toJSON()
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