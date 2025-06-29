import React, { useMemo, useState } from 'react';
import { XIcon, HelpCircleIcon, BookOpenIcon, BrainIcon, ClockIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExitConfirmationModal } from './ExitConfirmationModal';
import { questions } from './questions';
interface ProgressHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}
export const ProgressHeader = ({
  currentQuestion,
  totalQuestions,
  progress
}: ProgressHeaderProps) => {
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  // Calculate category percentages
  const categoryPercentages = useMemo(() => {
    const categories = [...new Set(questions.map(q => q.category))];
    const result: Record<string, {
      count: number;
      color: string;
      icon: JSX.Element;
    }> = {};
    categories.forEach(category => {
      const count = questions.filter(q => q.category === category).length;
      let color, icon;
      switch (category) {
        case 'Screen Time':
          color = 'bg-blue-600';
          icon = <ClockIcon size={14} className="mr-1" />;
          break;
        case 'Mental Health Effects':
          color = 'bg-purple-600';
          icon = <BrainIcon size={14} className="mr-1" />;
          break;
        case 'Digital Well-being':
          color = 'bg-emerald-600';
          icon = <BookOpenIcon size={14} className="mr-1" />;
          break;
        default:
          color = 'bg-gray-600';
          icon = <BookOpenIcon size={14} className="mr-1" />;
      }
      result[category] = {
        count,
        color,
        icon
      };
    });
    return result;
  }, []);
  const handleExit = () => {
    setShowExitModal(true);
  };
  const confirmExit = () => {
    setShowExitModal(false);
    navigate('/');
  };
  return <header className="sticky top-0 bg-white shadow-sm z-10" role="banner" aria-label="Assessment progress">
      <div className="container mx-auto px-4 py-3 max-w-3xl">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              Digital Wellness Assessment
            </h1>
            <div className="flex items-center mt-0.5">
              <motion.div className="text-sm text-blue-600 font-medium" key={currentQuestion} initial={{
              opacity: 0.7
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.2
            }}>
                Question {currentQuestion} of {totalQuestions}
              </motion.div>
              <div className="mx-2 text-gray-400">•</div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">{progress}%</span> complete
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label="Get help" title="Get help">
              <HelpCircleIcon size={18} />
            </button>
            <button className="flex items-center px-2 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleExit} aria-label="Save and exit assessment">
              <XIcon size={16} className="mr-1" aria-hidden="true" />
              <span className="font-medium">Exit</span>
            </button>
          </div>
        </div>
        {/* Category Progress Indicators */}
        <div className="flex mb-3 space-x-2">
          {Object.entries(categoryPercentages).map(([category, data]) => {
          const questionCount = data.count;
          const percentage = questionCount / totalQuestions * 100;
          return <div key={category} className="flex items-center text-xs">
                {data.icon}
                <span className="text-gray-700">{category}</span>
                <span className="text-gray-500 ml-1">({questionCount})</span>
              </div>;
        })}
        </div>
        {/* Single-colored progress bar instead of category segments */}
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress}% complete`}>
          <motion.div className="h-full bg-blue-600" style={{
          width: `${progress}%`
        }} initial={{
          width: 0
        }} animate={{
          width: `${progress}%`
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }} />
        </div>
      </div>
      {/* Exit Confirmation Modal */}
      <ExitConfirmationModal isOpen={showExitModal} onClose={() => setShowExitModal(false)} onConfirm={confirmExit} />
    </header>;
};