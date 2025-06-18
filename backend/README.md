# DigiWise Backend

This is the backend server for the DigiWise Digital Wellness Assessment System. It provides APIs for user authentication, assessment management, and result tracking.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=digiwise

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Admin Configuration
ADMIN_EMAIL=admin@digiwise.com
ADMIN_PASSWORD=admin123
```

3. Create the database:
```sql
CREATE DATABASE digiwise;
```

4. Seed the database with initial data:
```bash
npm run seed
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user info

### Admin
- POST `/api/admin/login` - Admin login
- GET `/api/admin/dashboard` - Get dashboard stats
- GET `/api/admin/results` - Get all assessment results

### Assessment
- GET `/api/assessment/questions` - Get all questions
- POST `/api/assessment/start` - Start new assessment
- POST `/api/assessment/answer` - Save answer
- POST `/api/assessment/complete` - Complete assessment

### Results
- GET `/api/results/my-results` - Get user's assessment results
- GET `/api/results/:assessmentId` - Get detailed result for a specific assessment

## Database Schema

### Users
- id (PK)
- email
- password
- firstName
- lastName
- ageRange
- region
- role

### Admins
- id (PK)
- email
- password
- firstName
- lastName

### Questions
- id (PK)
- text
- category
- category_id
- order_number

### Assessments
- id (PK)
- user_id (FK)
- start_time
- completion_time
- is_completed

### Answers
- id (PK)
- assessment_id (FK)
- question_id (FK)
- value

### Results
- id (PK)
- assessment_id (FK)
- overall_score
- category_scores
- risk_level 