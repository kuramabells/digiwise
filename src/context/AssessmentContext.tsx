import React, { useCallback, useState, createContext, useContext, useReducer, ReactNode } from 'react';
import { questions } from '../components/assessment/questions';
import api from '../lib/axios';
import { useUser } from './UserContext';
// Types
export type Answer = {
  questionId: number;
  value: number;
};
export type UserInfo = {
  firstName: string;
  email: string;
  ageRange: string;
  region: string;
  role: string;
};
type AssessmentState = {
  answers: Answer[];
  currentQuestionIndex: number;
  isComplete: boolean;
  showResults: boolean;
  userInfo: UserInfo | null;
  showUserInfoModal: boolean;
  resultsSaved: boolean;
  questions: typeof questions;
  currentQuestion: typeof questions[0] | undefined;
  user: any | null;
  currentAssessment: any | null;
  startTime: Date | null;
  completionTime: Date | null;
  isSaving: boolean;
  saveError: string | null;
  progress: number;
};
type AssessmentAction = {
  type: 'SET_ANSWER';
  payload: Answer;
} | {
  type: 'NEXT_QUESTION';
} | {
  type: 'COMPLETE_ASSESSMENT';
} | {
  type: 'SHOW_RESULTS';
} | {
  type: 'SET_USER_INFO';
  payload: UserInfo;
} | {
  type: 'TOGGLE_USER_INFO_MODAL';
} | {
  type: 'MARK_RESULTS_SAVED';
} | {
  type: 'SET_USER';
  payload: any;
} | {
  type: 'SET_CURRENT_ASSESSMENT';
  payload: any;
} | {
  type: 'SET_SAVING';
  payload: boolean;
} | {
  type: 'SET_SAVE_ERROR';
  payload: string | null;
} | {
  type: 'SET_PROGRESS';
  payload: number;
} | {
  type: 'SET_CURRENT_QUESTION';
  payload: number;
} | {
  type: 'SET_COMPLETE';
} | {
  type: 'RESET';
};
type AssessmentContextType = {
  state: AssessmentState;
  currentQuestion: (typeof questions)[0] | undefined;
  totalQuestions: number;
  progress: number;
  answerQuestion: (questionId: number, value: number) => Promise<void>;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  startAssessment: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
  getAnswerForQuestion: (questionId: number) => number | undefined;
  calculateResults: () => {
    overallScore: number;
    categoryScores: Record<string, number>;
    riskLevel: string;
  };
  showUserInfoModal: () => void;
  hideUserInfoModal: () => void;
  setUserInfo: (userInfo: UserInfo) => void;
  markResultsSaved: () => void;
  saveAnswers: () => Promise<void>;
};
// Initial state
const initialState: AssessmentState = {
  answers: [],
  currentQuestionIndex: 0,
  isComplete: false,
  showResults: false,
  userInfo: null,
  showUserInfoModal: false,
  resultsSaved: false,
  questions: questions,
  currentQuestion: questions[0],
  user: null,
  currentAssessment: null,
  startTime: null,
  completionTime: null,
  isSaving: false,
  saveError: null,
  progress: 0
};
// Reducer function
const reducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case 'SET_ANSWER':
      // Check if answer already exists for this question
      const existingAnswerIndex = state.answers.findIndex(
        answer => answer.questionId === action.payload.questionId
      );

      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnswers = [...state.answers];
        updatedAnswers[existingAnswerIndex] = action.payload;
        return {
          ...state,
          answers: updatedAnswers
        };
      } else {
        // Add new answer
        return {
          ...state,
          answers: [...state.answers, action.payload]
        };
      }
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        currentQuestion: questions[state.currentQuestionIndex + 1]
      };
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        isComplete: true,
        completionTime: new Date()
      };
    case 'SHOW_RESULTS':
      return {
        ...state,
        showResults: true
      };
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload
      };
    case 'TOGGLE_USER_INFO_MODAL':
      return {
        ...state,
        showUserInfoModal: !state.showUserInfoModal
      };
    case 'MARK_RESULTS_SAVED':
      return {
        ...state,
        resultsSaved: true
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'SET_CURRENT_ASSESSMENT':
      return {
        ...state,
        currentAssessment: action.payload
      };
    case 'SET_SAVING':
      return {
        ...state,
        isSaving: action.payload
      };
    case 'SET_SAVE_ERROR':
      return {
        ...state,
        saveError: action.payload
      };
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.payload
      };
    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.payload
      };
    case 'SET_COMPLETE':
      return {
        ...state,
        isComplete: true
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
// Create context
export const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);
// Provider component
export const AssessmentProvider: React.FC<{
  children: ReactNode;
}> = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: userState } = useUser();
  // Derived state
  const totalQuestions = questions.length;
  const currentQuestion = questions[state.currentQuestionIndex];
  const progress = Math.round((state.currentQuestionIndex + 1) / totalQuestions * 100);
  // Save a single answer
  const saveAnswer = useCallback(async (questionId: number, value: number) => {
    if (!userState.isAuthenticated || !userState.user || !state.currentAssessment) {
      throw new Error('User must be authenticated and have an active assessment');
    }

    try {
      dispatch({ type: 'SET_SAVING', payload: true });
      dispatch({ type: 'SET_SAVE_ERROR', payload: null });

      const response = await api.post('/answers', {
        question_id: questionId,
        value,
        assessment_id: state.currentAssessment.id
      });

      if (response.data.success) {
        dispatch({ type: 'SET_PROGRESS', payload: response.data.data.progress });
      } else {
        throw new Error(response.data.message || 'Failed to save answer');
      }
    } catch (error: any) {
      console.error('Error saving answer:', error);
      dispatch({ 
        type: 'SET_SAVE_ERROR', 
        payload: error.response?.data?.message || 'Failed to save answer'
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  }, [userState.isAuthenticated, userState.user, userState.token, state.currentAssessment]);
  // Actions
  const answerQuestion = useCallback(async (questionId: number, value: number) => {
    try {
      await saveAnswer(questionId, value);
      dispatch({
        type: 'SET_ANSWER',
        payload: {
          questionId,
          value
        }
      });
    } catch (error) {
      console.error('Error in answerQuestion:', error);
      throw error;
    }
  }, [userState.isAuthenticated, userState.user, userState.token, state.currentAssessment]);
  const goToNextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < totalQuestions - 1) {
      dispatch({
        type: 'NEXT_QUESTION'
      });
    } else {
      dispatch({
        type: 'SHOW_RESULTS'
      });
    }
  }, [state.currentQuestionIndex, totalQuestions]);
  const goToPreviousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      dispatch({
        type: 'NEXT_QUESTION'
      });
    }
  }, [state.currentQuestionIndex]);
  const startAssessment = useCallback(async () => {
    try {
      if (!userState.isAuthenticated || !userState.user) {
        throw new Error('User must be authenticated to start assessment');
      }

      console.log('\n=== Assessment Start Request ===');
      console.log('User:', userState.user);
      console.log('Is authenticated:', userState.isAuthenticated);
      console.log('Token from localStorage:', localStorage.getItem('userToken'));

      const response = await api.post('/assessment/start', {
        user_id: userState.user.id,
        start_time: new Date()
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        dispatch({
          type: 'SET_CURRENT_ASSESSMENT',
          payload: response.data.data
        });
      } else {
        throw new Error(response.data.message || 'Failed to start assessment');
      }
    } catch (error: any) {
      console.error('Error starting assessment:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      console.error('Request config:', error.config);

      // Handle specific error cases
      if (error.response?.status === 401) {
        console.error('Authentication failed. Please log in again.');
        // Don't redirect automatically, let the UI handle it
        throw new Error('Authentication failed. Please log in again.');
      }

      throw new Error(error.response?.data?.message || 'Failed to start assessment');
    }
  }, [userState.isAuthenticated, userState.user]);
  const completeAssessment = useCallback(async () => {
    try {
      if (!state.currentAssessment) {
        throw new Error('No active assessment found');
      }

      const response = await api.post('/assessment/complete', {
        assessment_id: state.currentAssessment.id,
        completion_time: new Date()
      });

      if (response.data.success) {
        dispatch({
          type: 'COMPLETE_ASSESSMENT'
        });
      } else {
        throw new Error(response.data.message || 'Failed to complete assessment');
      }
    } catch (error: any) {
      console.error('Error completing assessment:', error);
      throw new Error(error.response?.data?.message || 'Failed to complete assessment');
    }
  }, [state.currentAssessment]);
  const resetAssessment = useCallback(() => {
    dispatch({
      type: 'SET_CURRENT_ASSESSMENT',
      payload: null
    });
  }, []);
  const showUserInfoModal = useCallback(() => {
    dispatch({
      type: 'TOGGLE_USER_INFO_MODAL'
    });
  }, []);
  const hideUserInfoModal = useCallback(() => {
    dispatch({
      type: 'TOGGLE_USER_INFO_MODAL'
    });
  }, []);
  const setUserInfo = useCallback((userInfo: UserInfo) => {
    dispatch({
      type: 'SET_USER_INFO',
      payload: userInfo
    });
  }, []);
  const markResultsSaved = useCallback(() => {
    dispatch({
      type: 'MARK_RESULTS_SAVED'
    });
  }, []);
  const getAnswerForQuestion = useCallback((questionId: number): number | undefined => {
    const answer = state.answers.find(a => a.questionId === questionId);
    return answer?.value;
  }, [state.answers]);
  // Calculate results based on answers
  const calculateResults = useCallback(() => {
    // Default score if no answers
    if (state.answers.length === 0) {
      return {
        overallScore: 0,
        categoryScores: {},
        riskLevel: 'low'
      };
    }
    // Group questions by category
    const categoriesMap = questions.reduce<Record<string, typeof questions>>((acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push(question);
      return acc;
    }, {});
    // Calculate score for each category
    const categoryScores: Record<string, number> = {};
    let totalScore = 0;
    let answeredQuestions = 0;
    Object.entries(categoriesMap).forEach(([category, categoryQuestions]) => {
      let categoryTotal = 0;
      let categoryAnswered = 0;
      categoryQuestions.forEach(question => {
        const answer = state.answers.find(a => a.questionId === question.id);
        if (answer) {
          categoryTotal += answer.value;
          categoryAnswered++;
          totalScore += answer.value;
          answeredQuestions++;
        }
      });
      // Calculate normalized percentage score for the category (0-100)
      // Adjusting for the 1-4 scale to map to 0-100%
      const maxPossible = categoryAnswered * 4; // 4 is max value per question
      const minPossible = categoryAnswered * 1; // 1 is min value per question
      const normalizedScore = (categoryTotal - minPossible) / (maxPossible - minPossible) * 100;
      categoryScores[category] = Math.round(normalizedScore);
    });
    // Calculate normalized overall score (0-100)
    const maxPossibleTotal = answeredQuestions * 4;
    const minPossibleTotal = answeredQuestions * 1;
    const normalizedOverallScore = (totalScore - minPossibleTotal) / (maxPossibleTotal - minPossibleTotal) * 100;
    const overallScore = Math.round(normalizedOverallScore);
    // Determine risk level based on normalized overall score
    let riskLevel = 'low';
    if (overallScore >= 75) {
      riskLevel = 'severe';
    } else if (overallScore >= 50) {
      riskLevel = 'high';
    } else if (overallScore >= 25) {
      riskLevel = 'moderate';
    }
    return {
      overallScore,
      categoryScores,
      riskLevel
    };
  }, [state.answers]);
  const saveAnswers = async (): Promise<void> => {
    try {
      if (!userState.isAuthenticated || !userState.user || !state.currentAssessment) {
        throw new Error('User must be authenticated and have an active assessment');
      }

      dispatch({ type: 'SET_SAVING', payload: true });
      dispatch({ type: 'SET_SAVE_ERROR', payload: null });

      const response = await api.post('/answers/save-answers', {
        assessment_id: state.currentAssessment.id,
        answers: state.answers.map(answer => ({
          question_id: answer.questionId,
          value: answer.value
        }))
      });

      if (response.data.success) {
        dispatch({ type: 'MARK_RESULTS_SAVED' });
        dispatch({ type: 'SET_PROGRESS', payload: response.data.data.progress });
      } else {
        throw new Error(response.data.message || 'Failed to save answers');
      }
    } catch (error: any) {
      console.error('Error saving answers:', error);
      dispatch({ 
        type: 'SET_SAVE_ERROR', 
        payload: error.response?.data?.message || 'Failed to save answers'
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  };
  return <AssessmentContext.Provider value={{
    state,
    currentQuestion,
    totalQuestions,
    progress,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    startAssessment,
    completeAssessment,
    resetAssessment,
    getAnswerForQuestion,
    calculateResults,
    showUserInfoModal,
    hideUserInfoModal,
    setUserInfo,
    markResultsSaved,
    saveAnswers
  }}>
      {children}
    </AssessmentContext.Provider>;
};
// Custom hook for using the assessment context
export const useAssessment = (): AssessmentContextType => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};