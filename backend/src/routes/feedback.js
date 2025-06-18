const express = require('express');
const router = express.Router();

// Placeholder GET endpoint
router.get('/', (req, res) => {
  res.json({ message: 'Feedback route is working.' });
});

module.exports = router; 