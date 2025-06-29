import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ResultsHeader } from '../components/results/ResultsHeader';
import { RiskLevelCard } from '../components/results/RiskLevelCard';
import { CategoryBreakdown } from '../components/results/CategoryBreakdown';
import { ActionPlan } from '../components/results/ActionPlan';
import { useAssessment } from '../context/AssessmentContext';
import { useUser } from '../context/UserContext';
import { HomeIcon, ArrowLeftIcon, DownloadIcon, RefreshCwIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}
import api from '../lib/axios';

export const ResultsPage = () => {
  const {
    state,
    calculateResults,
    resetAssessment,
    markResultsSaved,
    startAssessment
  } = useAssessment();
  const { state: _userState } = useUser();
  const navigate = useNavigate();
  const [isComputing, setIsComputing] = useState(true);
  // Calculate results from assessment
  const results = calculateResults();
  // Check if assessment is completed
  useEffect(() => {
    if (!state.isComplete && state.answers.length === 0) {
      // If no assessment data, redirect to assessment page
      navigate('/assessment');
    }
  }, [state, navigate]);
  // Simulate computation time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComputing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  // Save results when computation is complete
  useEffect(() => {
    if (!isComputing && state.isComplete && state.completionTime && !state.resultsSaved) {
      // Check if we have a valid assessment ID
      if (state.currentAssessment?.id) {
        // Save results to the backend
        api.post('/api/results', {
          assessment_id: state.currentAssessment.id,
          overall_score: results.overallScore,
          category_scores: results.categoryScores,
          risk_level: results.riskLevel
        }).then(() => {
          markResultsSaved();
        }).catch(error => {
          console.error('Error saving results:', error);
          // Mark as saved anyway to prevent infinite retries
          markResultsSaved();
        });
      } else {
        // No assessment ID, just mark as saved
        markResultsSaved();
      }
    }
  }, [isComputing, state.isComplete, state.completionTime, state.resultsSaved, results, markResultsSaved, state.currentAssessment]);
  // Handle taking the assessment again
  const handleTakeAgain = async () => {
    try {
      // Reset the assessment state
      resetAssessment();
      
      // Start a new assessment
      await startAssessment();
      
      // Navigate to the assessment page
      navigate('/assessment');
    } catch (error) {
      console.error('Error starting new assessment:', error);
    }
  };
  // Download results functionality
  const handleDownload = () => {
    // Create a new PDF document
    const doc = new jsPDF();
    const firstName = _userState.user?.firstName || '';
    const lastName = _userState.user?.lastName || '';
    const userName = `${firstName} ${lastName}`.trim() || 'User';
    const completionDate = state.completionTime ? state.completionTime.toLocaleDateString() : new Date().toLocaleDateString();
    const riskLevel = results.riskLevel.charAt(0).toUpperCase() + results.riskLevel.slice(1);
    
    // Add logo and header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text('DigiWise Digital Wellness Assessment', 105, 25, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(75, 85, 99); // Gray-600
    doc.text('Your personalized digital wellness report', 105, 35, { align: 'center' });
    
    // Add user info section
    doc.setFontSize(10);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text(`Name: ${userName}`, 20, 55);
    doc.text(`Date: ${completionDate}`, 20, 65);
    doc.text(`Overall Score: ${results.overallScore}%`, 20, 75);
    doc.text(`Risk Level: ${riskLevel}`, 20, 85);
    
    // Add risk level indicator
    const riskLevels = ['Low', 'Moderate', 'High', 'Severe'];
    const riskLevelIndex = riskLevels.findIndex(level => level.toLowerCase() === results.riskLevel.toLowerCase());
    const riskLevelWidth = 160 / riskLevels.length;
    
    riskLevels.forEach((level, index) => {
      const isCurrentLevel = index === riskLevelIndex;
      const x = 20 + (index * riskLevelWidth);
      
      // Draw risk level bar
      doc.setFillColor(isCurrentLevel ? 
        (index === 0 ? '#10B981' : index === 1 ? '#F59E0B' : index === 2 ? '#F97316' : '#EF4444') : 
        '#E5E7EB');
      doc.roundedRect(x, 95, riskLevelWidth - 2, 10, 2, 2, 'F');
      
      // Add risk level label
      doc.setFontSize(8);
      doc.setTextColor(isCurrentLevel ? '#FFFFFF' : '#6B7280');
      const textWidth = doc.getTextWidth(level);
      doc.text(level, x + (riskLevelWidth / 2) - (textWidth / 2), 102);
    });
    
    // Add category breakdown
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.text('Category Breakdown', 20, 125);
    
    // Prepare data for the table
    const categoryData = Object.entries(results.categoryScores).map(([category, score]) => ({
      category,
      score: `${score}%`
    }));
    
    // Add the table
    autoTable(doc, {
      startY: 130,
      head: [['Category', 'Score']],
      body: categoryData.map(item => [item.category, item.score]),
      theme: 'grid' as const,
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: 'bold' as const,
        halign: 'center' as const
      },
      bodyStyles: {
        textColor: [31, 41, 55],
        fontStyle: 'normal' as const,
        lineWidth: 0.1
      },
      alternateRowStyles: {
        fillColor: [243, 244, 246]
      },
      margin: { left: 20, right: 20 },
      styles: {
        fontSize: 10,
        cellPadding: 5,
        overflow: 'linebreak' as const,
        lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 'auto', halign: 'left' as const },
        1: { cellWidth: 30, halign: 'center' as const, fontStyle: 'bold' as const }
      }
    });
    
    // Add recommended actions
    const finalY = (doc as any).lastAutoTable?.finalY || 180;
    doc.setFontSize(14);
    doc.text('Recommended Actions', 20, finalY);
    
    const actions = getRecommendedActions(results.riskLevel);
    let currentY = finalY + 10;
    
    actions.forEach((action) => {
      // Add bullet point
      doc.setFillColor(37, 99, 235);
      doc.circle(25, currentY + 3, 1.5, 'F');
      
      // Add action text
      doc.setFontSize(10);
      doc.setTextColor(31, 41, 55);
      doc.text(`${action.action} (${action.timeframe})`, 30, currentY + 4);
      
      currentY += 8;
    });
    
    // Add footer
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text('Thank you for completing the DigiWise Digital Wellness Assessment.', 105, 280, { align: 'center' });
    doc.text('For more resources and support, visit our website.', 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save(`DigiWise_Results_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };
  // Helper function to get recommended actions based on risk level
  const getRecommendedActions = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return [{
          action: 'Maintain current healthy digital boundaries',
          timeframe: 'Ongoing'
        }, {
          action: 'Set goals for continued improvement',
          timeframe: 'This week'
        }];
      case 'moderate':
        return [{
          action: 'Implement screen time limits on social media apps',
          timeframe: 'Today'
        }, {
          action: 'Create designated tech-free zones',
          timeframe: 'This week'
        }];
      case 'high':
        return [{
          action: 'Schedule regular digital detox periods',
          timeframe: 'Today'
        }, {
          action: 'Use app blocking tools during work hours',
          timeframe: 'This week'
        }];
      case 'severe':
        return [{
          action: 'Set up strict device usage limitations',
          timeframe: 'Today'
        }, {
          action: 'Seek professional support for digital dependency',
          timeframe: 'This week'
        }];
      default:
        return [];
    }
  };
  // If no assessment data, show loading
  if (isComputing) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <motion.div className="text-center" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }}>
          <div className="relative">
            <motion.div className="w-20 h-20 mx-auto mb-6 border-4 border-blue-200 rounded-full" animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            ease: 'linear',
            repeat: Infinity
          }} />
            <motion.div className="w-20 h-20 mx-auto absolute top-0 left-1/2 -ml-10 border-4 border-blue-600 rounded-full border-t-transparent" animate={{
            rotate: -360
          }} transition={{
            duration: 1.5,
            ease: 'linear',
            repeat: Infinity
          }} />
          </div>
          <motion.h2 className="text-2xl font-bold text-gray-800 mb-2" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
            Computing Your Results
          </motion.h2>
          <motion.p className="text-gray-600" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5
        }}>
            Analyzing your responses to generate personalized insights...
          </motion.p>
        </motion.div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" role="main" aria-label="Assessment Results">
      <div className="sticky top-0 z-10 bg-white backdrop-blur-md bg-opacity-95 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-sm mr-2">
              <HomeIcon size={16} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              Digital Wellness Results
            </h1>
          </Link>
          <div className="flex items-center gap-2">
            <motion.button className="flex items-center px-2.5 py-1.5 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors md:px-3.5 md:py-1.5" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={handleTakeAgain}>
              <RefreshCwIcon size={16} className="md:mr-1" />
              <span className="hidden md:inline">Take Again</span>
            </motion.button>
            <motion.button className="flex items-center px-2.5 py-1.5 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors md:px-3.5 md:py-1.5" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={handleDownload}>
              <DownloadIcon size={16} className="md:mr-1" />
              <span className="hidden md:inline">Download</span>
            </motion.button>
            <Link to="/">
              <motion.button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <HomeIcon size={16} className="mr-1.5" />
                <span>Home</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
      <motion.div className="container mx-auto px-4 py-8 max-w-5xl" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.4
    }}>
        <ResultsHeader score={results.overallScore} riskLevel={results.riskLevel} completionDate={state.completionTime || new Date()} firstName={state.userInfo?.firstName} />
        <div className="space-y-6 mt-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1,
          duration: 0.4
        }}>
            <RiskLevelCard riskLevel={results.riskLevel} score={results.overallScore} />
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2,
          duration: 0.4
        }}>
            <CategoryBreakdown categoryScores={results.categoryScores} />
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.4
        }}>
            <ActionPlan riskLevel={results.riskLevel} />
          </motion.div>
        </div>
        <motion.div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.4,
        duration: 0.4
      }}>
          <Link to="/">
            <motion.button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors" whileHover={{
            x: -3
          }}>
              <ArrowLeftIcon size={16} className="mr-1.5" />
              <span>Back to home page</span>
            </motion.button>
          </Link>
          <motion.button onClick={handleTakeAgain} className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors" whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
            <RefreshCwIcon size={16} className="mr-1.5" />
            <span>Take Assessment Again</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>;
};