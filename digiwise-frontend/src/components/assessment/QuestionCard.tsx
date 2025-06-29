import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { AnswerOptions } from './AnswerOptions';
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, BrainIcon, ClockIcon } from 'lucide-react';
import { Question } from './questions';

export interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | undefined;
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  categoryProgress: {
    current: number;
    total: number;
  };
  isSaving?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  currentQuestionIndex,
  totalQuestions,
  categoryProgress,
  isSaving = false
}) => {
  // Animation variants - faster and more subtle
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  // Category icon mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Screen Time':
        return <ClockIcon size={18} className="mr-2" />;
      case 'Mental Health Effects':
        return <BrainIcon size={18} className="mr-2" />;
      case 'Digital Well-being':
        return <BookOpenIcon size={18} className="mr-2" />;
      default:
        return <BookOpenIcon size={18} className="mr-2" />;
    }
  };
  // Category color mapping
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Screen Time':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Mental Health Effects':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Digital Well-being':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  return <motion.div className="bg-white rounded-xl shadow-md p-5 md:p-6 border border-gray-100" role="form" aria-labelledby="question-title" variants={containerVariants} initial="hidden" animate="visible">
      {/* Enhanced Category Header */}
      <motion.div className={`mb-5 p-3 rounded-lg ${getCategoryColor(question.category)}`} variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getCategoryIcon(question.category)}
            <span className="font-medium">{question.category}</span>
          </div>
          <div className="text-sm">
            Question {categoryProgress.current} of {categoryProgress.total} in
            this category
          </div>
        </div>
        <div className="mt-2 bg-white bg-opacity-50 h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-current opacity-70" style={{
          width: `${categoryProgress.current / categoryProgress.total * 100}%`
        }}></div>
        </div>
      </motion.div>
      <motion.div className="mb-5" variants={itemVariants}>
        <div className="flex items-center justify-between mb-2">
          <h2 id="question-title" className="text-lg md:text-xl font-semibold text-gray-800">
            {question.text}
          </h2>
        </div>
        <div className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {totalQuestions} overall
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <AnswerOptions selectedValue={selectedAnswer} onChange={onAnswer} />
      </motion.div>
      <motion.div className="flex justify-between mt-6" variants={itemVariants}>
        <motion.button onClick={onPrevious} disabled={isFirst || isSaving} className={`flex items-center px-3 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isFirst || isSaving ? 'text-gray-400 cursor-not-allowed opacity-50' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`} aria-label="Previous question" whileHover={!isFirst ? {
        scale: 1.02
      } : {}} whileTap={!isFirst ? {
        scale: 0.98
      } : {}}>
          <ArrowLeftIcon size={16} className="mr-1.5" aria-hidden="true" />
          Previous
        </motion.button>
        <motion.button onClick={onNext} disabled={!selectedAnswer || isSaving} className={`flex items-center px-5 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
            ${!selectedAnswer || isSaving ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'}`} aria-label={isLast ? 'Finish assessment' : 'Next question'} whileHover={selectedAnswer !== undefined ? {
        scale: 1.02
      } : {}} whileTap={selectedAnswer !== undefined ? {
        scale: 0.98
      } : {}}>
          {isLast ? 'Complete Assessment' : 'Next Question'}
          {!isLast && <ArrowRightIcon size={16} className="ml-1.5" aria-hidden="true" />}
        </motion.button>
      </motion.div>
      {isSaving && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center text-sm text-gray-500">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving your answer...
          </div>
        </div>
      )}
    </motion.div>;
};