const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const questionRoutes = require('./routes/questions');
const quizRoutes = require('./routes/quizzes');
const resultRoutes = require('./routes/results');
const feedbackRoutes = require('./routes/feedback');
const answerRoutes = require('./routes/answer');
const assessmentRoutes = require('./routes/assessment');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\n=== Incoming Request ===`);
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  console.log('Params:', req.params);
  next();
});

// CORS configuration
//const corsOptions = {
//  origin: [process.env.CORS_ORIGIN || 'http://localhost:5173', 'http://localhost:5174', 'https://digiwise.fun', 'https://www.digiwise.fun'],
//  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//  allowedHeaders: ['Content-Type', 'Authorization'],
//  credentials: true,
//  optionsSuccessStatus: 200
//};

// Middleware
//app.use(cors(corsOptions));

// Replace CORS with a dynamic reflector:
app.use(cors({
  origin: true,         // reflect request origin (https://digiwise.fun, etc.)
  credentials: true,    // allow cookies/headers
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/assessment', assessmentRoutes);

// Response logging middleware
app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function(data) {
    console.log(`\n=== Outgoing Response ===`);
    console.log(`Status: ${res.statusCode}`);
    console.log('Body:', data);
    oldSend.apply(res, arguments);
  };
  next();
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  console.log(`\n❌ Route Not Found: ${req.method} ${req.url}`);
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

module.exports = app; 