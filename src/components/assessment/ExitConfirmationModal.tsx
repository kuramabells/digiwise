import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangleIcon, XIcon } from 'lucide-react';
interface ExitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={e => {
    // Close modal when clicking outside
    if (e.target === e.currentTarget) onClose();
  }}>
      <motion.div className="bg-white rounded-xl shadow-xl max-w-md w-full" initial={{
      opacity: 0,
      scale: 0.95,
      y: 10
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} transition={{
      duration: 0.2
    }} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-gray-100 p-5">
          <div className="flex items-center">
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <AlertTriangleIcon size={20} className="text-amber-500" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">
              Exit Assessment?
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
            <XIcon size={20} />
          </button>
        </div>
        <div className="p-5">
          <p className="text-gray-600 mb-6">
            Are you sure you want to exit? Your progress will be lost and you'll
            need to start over next time.
          </p>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <motion.button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              Continue Assessment
            </motion.button>
            <motion.button onClick={onConfirm} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition-colors mb-2 sm:mb-0" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              Exit Assessment
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>;
};