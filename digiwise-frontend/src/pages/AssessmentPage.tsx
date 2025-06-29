import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProgressHeader } from '../components/assessment/ProgressHeader';
import { QuestionCard } from '../components/assessment/QuestionCard';
import { useAssessment } from '../context/AssessmentContext';
import { useUser } from '../context/UserContext';
import { questions } from '../components/assessment/questions';
import { UserFormData } from '../types';

// Define UserFormData type
type UserFormData = {
  firstName: string;
  email: string;
  ageRange: string;
  region: string;
  role?: string;
};

// Define setUserInfo function
const setUserInfo = (userInfo: UserFormData) => {
  // Logic to set user info
  console.log('Setting user info:', userInfo);
};

export const AssessmentPage = () => {
  const navigate = useNavigate();
  const { state: userState } = useUser();
  const {
    state,
    currentQuestion,
    totalQuestions,
    progress,
    getAnswerForQuestion,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    startAssessment,
    completeAssessment
  } = useAssessment();

  const [isStarting, setIsStarting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    if (!userState.isLoading && !userState.isAuthenticated) {
      navigate('/auth');
    }
  }, [userState.isAuthenticated, userState.isLoading, navigate]);

  // Start assessment when component mounts
  useEffect(() => {
    const initializeAssessment = async () => {
      try {
        setIsStarting(true);
        setError(null);
        await startAssessment();
      } catch (err: any) {
        setError(err.message || 'Failed to start assessment');
      } finally {
        setIsStarting(false);
      }
    };

    if (userState.isAuthenticated && !state.currentAssessment && !userState.isLoading) {
      initializeAssessment();
    }
  }, [userState.isAuthenticated, userState.isLoading, state.currentAssessment, startAssessment]);

  // Check if user already has completed an assessment
  useEffect(() => {
    if (state.isComplete) {
      // If assessment is already completed, redirect to results page
      navigate('/results');
    }
  }, [state.isComplete, navigate]);

  // Handle user info submission
  const handleUserInfoSubmit = (userData: UserFormData) => {
    setUserInfo({
      firstName: userData.firstName,
      email: userData.email,
      ageRange: userData.ageRange,
      region: userData.region,
      role: userData.role
    });
  };

  // Calculate category progress
  const getCategoryProgress = () => {
    if (!currentQuestion) return {
      current: 0,
      total: 0
    };
    const categoryQuestions = questions.filter(q => q.category === currentQuestion.category);
    const currentCategoryIndex = categoryQuestions.findIndex(q => q.id === currentQuestion.id);
    return {
      current: currentCategoryIndex + 1,
      total: categoryQuestions.length
    };
  };

  // Show loading state while checking authentication
  if (userState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state while starting assessment
  if (isStarting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Starting your assessment...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Starting Assessment</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no current question, show loading
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your assessment...</p>
        </div>
      </div>
    );
  }

  const handleAnswer = async (questionId: number, value: number) => {
    try {
      await answerQuestion(questionId, value);
    } catch (err: any) {
      setError(err.message || 'Failed to save answer');
    }
  };

  // Update the last question handler
  const handleLastQuestion = async () => {
    try {
      if (state.currentQuestionIndex === totalQuestions - 1) {
        console.log('Completing assessment and navigating to results page.');
        await completeAssessment();
        navigate('/results');
      } else {
        goToNextQuestion();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to complete assessment');
    }
  };

  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <ProgressHeader currentQuestion={state.currentQuestionIndex + 1} totalQuestions={totalQuestions} progress={progress} />
      <motion.main className="container mx-auto px-4 py-6 max-w-3xl" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.3
    }}>
        {state.saveError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{state.saveError}</p>
          </div>
        )}
        <motion.div key={currentQuestion.id} initial={{
        opacity: 0,
        x: 10
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -10
      }} transition={{
        duration: 0.2
      }}>
          <QuestionCard question={currentQuestion} selectedAnswer={getAnswerForQuestion(currentQuestion.id)} onAnswer={value => handleAnswer(currentQuestion.id, value)} onNext={handleLastQuestion} onPrevious={goToPreviousQuestion} isFirst={state.currentQuestionIndex === 0} isLast={state.currentQuestionIndex === totalQuestions - 1} currentQuestionIndex={state.currentQuestionIndex} totalQuestions={totalQuestions} categoryProgress={getCategoryProgress()} isSaving={state.isSaving} />
        </motion.div>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Your responses are automatically saved and will only be used to generate
            your personalized digital wellness profile.
          </p>
        </div>
      </motion.main>
    </div>;
};