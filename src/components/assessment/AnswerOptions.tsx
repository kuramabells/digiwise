import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
interface AnswerOptionsProps {
  selectedValue?: number;
  onChange: (value: number) => void;
}
export const AnswerOptions = ({
  selectedValue,
  onChange
}: AnswerOptionsProps) => {
  const options = [{
    value: 4,
    label: 'Always',
    description: 'This completely describes me'
  }, {
    value: 3,
    label: 'Often',
    description: 'This somewhat describes me'
  }, {
    value: 2,
    label: 'Sometimes',
    description: "This doesn't really describe me"
  }, {
    value: 1,
    label: 'Never',
    description: "This doesn't describe me at all"
  }];
  // Reference to hold all radio buttons
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = index - 1 >= 0 ? index - 1 : options.length - 1;
        radioRefs.current[prevIndex]?.focus();
        onChange(options[prevIndex].value);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = index + 1 < options.length ? index + 1 : 0;
        radioRefs.current[nextIndex]?.focus();
        onChange(options[nextIndex].value);
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        onChange(options[index].value);
        break;
    }
  };
  // Focus management
  useEffect(() => {
    if (selectedValue === undefined && radioRefs.current[0]) {
      radioRefs.current[0].focus();
    }
  }, []);
  return <div className="space-y-2.5" role="radiogroup" aria-required="true" aria-label="Answer options" tabIndex={-1}>
      {options.map((option, index) => <motion.button key={option.value} ref={el => radioRefs.current[index] = el} onClick={() => onChange(option.value)} onKeyDown={e => handleKeyDown(e, index)} className={`w-full p-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
            ${selectedValue === option.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`} role="radio" type="button" aria-checked={selectedValue === option.value} tabIndex={selectedValue === option.value ? 0 : -1} whileHover={{
      scale: 1.005
    }} whileTap={{
      scale: 0.995
    }} initial={{
      opacity: 0,
      y: 5
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.2,
      delay: index * 0.05
    }}>
          <div className="flex items-start">
            <div className={`w-5 h-5 rounded-full border-2 mt-0.5 mr-2.5 flex-shrink-0 transition-colors flex items-center justify-center
                ${selectedValue === option.value ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
              {selectedValue === option.value && <motion.div className="w-2 h-2 bg-white rounded-full" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            duration: 0.1
          }} />}
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-800">{option.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {option.description}
              </div>
            </div>
          </div>
        </motion.button>)}
    </div>;
};