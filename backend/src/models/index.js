const sequelize = require('../config/database');
const User = require('./User');
const Admin = require('./Admin');
const Question = require('./Question');
const Answer = require('./Answer');
const Assessment = require('./Assessment');
const Result = require('./Result');

// Define associations
User.hasMany(Assessment);
Assessment.belongsTo(User);

Assessment.hasMany(Answer, {
  as: 'answers'
});
Answer.belongsTo(Assessment, {
  as: 'assessment'
});

Question.hasMany(Answer, {
  foreignKey: 'question_id',
  as: 'answers'
});
Answer.belongsTo(Question, {
  foreignKey: 'question_id',
  as: 'question'
});

Assessment.hasOne(Result);
Result.belongsTo(Assessment);

module.exports = {
  sequelize,
  User,
  Admin,
  Question,
  Answer,
  Assessment,
  Result
}; 