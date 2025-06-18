const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Assessment = sequelize.define('Assessment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  completion_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  last_answered_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'assessments',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Assessment; 