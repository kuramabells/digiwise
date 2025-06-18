import React, { createElement } from 'react';
import { DownloadIcon, BellIcon, FileTextIcon, DatabaseIcon } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
export const QuickActions = () => {
  const {
    state
  } = useAdmin();
  const handleExportData = () => {
    // Create CSV content from assessment results
    const headers = ['User ID', 'Assessment ID', 'Completion Date', 'Overall Score', 'Risk Level', 'Screen Time', 'Mental Health Effects', 'Digital Well-being'];
    const rows = state.userResults.map(result => [result.userId, result.assessmentId, new Date(result.completedAt).toLocaleDateString(), result.overallScore, result.riskLevel, result.categoryScores['Screen Time'] || 'N/A', result.categoryScores['Mental Health Effects'] || 'N/A', result.categoryScores['Digital Well-being'] || 'N/A']);
    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    // Create and download the CSV file
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `digiwise_assessment_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const quickActions = [{
    id: 1,
    name: 'Export Data',
    description: 'Download assessment results as CSV',
    icon: <DownloadIcon size={20} className="text-blue-600" />,
    color: 'bg-blue-50 text-blue-800 hover:bg-blue-100',
    onClick: handleExportData
  }, {
    id: 2,
    name: 'Send Notifications',
    description: 'Communicate with users',
    icon: <BellIcon size={20} className="text-purple-600" />,
    color: 'bg-purple-50 text-purple-800 hover:bg-purple-100'
  }, {
    id: 3,
    name: 'Generate Reports',
    description: 'Create summary reports',
    icon: <FileTextIcon size={20} className="text-green-600" />,
    color: 'bg-green-50 text-green-800 hover:bg-green-100'
  }, {
    id: 4,
    name: 'Backup Data',
    description: 'System backup options',
    icon: <DatabaseIcon size={20} className="text-amber-600" />,
    color: 'bg-amber-50 text-amber-800 hover:bg-amber-100'
  }];
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Quick Actions
      </h2>
      <div className="space-y-3">
        {quickActions.map(action => <button key={action.id} className={`w-full p-3 rounded-md transition-colors flex items-start ${action.color}`} onClick={action.onClick}>
            <div className="mr-3 mt-0.5">{action.icon}</div>
            <div className="text-left">
              <div className="font-medium">{action.name}</div>
              <div className="text-xs opacity-75">{action.description}</div>
            </div>
          </button>)}
      </div>
    </div>;
};