import React, { useState } from 'react';
import { UsersIcon, ClipboardListIcon, BookOpenIcon, SettingsIcon, ChevronRightIcon } from 'lucide-react';
export const ManagementSection = () => {
  const [activeTab, setActiveTab] = useState('users');
  const managementSections = [{
    id: 'users',
    name: 'User Management',
    icon: <UsersIcon size={20} className="mr-2" />,
    description: 'View and manage user accounts, permissions, and activity.'
  }, {
    id: 'assessments',
    name: 'Assessment Management',
    icon: <ClipboardListIcon size={20} className="mr-2" />,
    description: 'Manage assessment questions, view responses, and export data.'
  }, {
    id: 'content',
    name: 'Content Management',
    icon: <BookOpenIcon size={20} className="mr-2" />,
    description: 'Update educational resources and DepEd-aligned materials.'
  }, {
    id: 'settings',
    name: 'System Settings',
    icon: <SettingsIcon size={20} className="mr-2" />,
    description: 'Configure assessment scoring algorithms and update site content.'
  }];
  return <div className="mt-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Management Functions
      </h2>
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex overflow-x-auto border-b border-slate-200">
          {managementSections.map(section => <button key={section.id} className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === section.id ? 'border-b-2 border-slate-800 text-slate-800' : 'text-slate-500 hover:text-slate-700'}`} onClick={() => setActiveTab(section.id)}>
              <div className="flex items-center">
                {section.icon}
                {section.name}
              </div>
            </button>)}
        </div>
        <div className="p-6">
          {managementSections.map(section => activeTab === section.id && <div key={section.id} className="space-y-4">
                  <p className="text-slate-600">{section.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {/* Sample action cards based on active tab */}
                    {activeTab === 'users' && <>
                        <ActionCard title="View All Users" description="Browse and search all user accounts" />
                        <ActionCard title="User Analytics" description="View detailed user engagement metrics" />
                        <ActionCard title="User Permissions" description="Manage role-based access control" />
                      </>}
                    {activeTab === 'assessments' && <>
                        <ActionCard title="Question Bank" description="View and edit assessment questions" />
                        <ActionCard title="Response Data" description="View detailed assessment responses" />
                        <ActionCard title="Export Results" description="Download assessment data in various formats" />
                      </>}
                    {activeTab === 'content' && <>
                        <ActionCard title="Educational Resources" description="Manage learning materials and guides" />
                        <ActionCard title="DepEd Materials" description="Update curriculum-aligned content" />
                        <ActionCard title="Resource Categories" description="Organize content into categories" />
                      </>}
                    {activeTab === 'settings' && <>
                        <ActionCard title="Scoring Algorithm" description="Configure assessment scoring parameters" />
                        <ActionCard title="Site Settings" description="Update website configuration" />
                        <ActionCard title="Notification Settings" description="Configure email and in-app notifications" />
                      </>}
                  </div>
                </div>)}
        </div>
      </div>
    </div>;
};
const ActionCard = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => {
  return <div className="bg-slate-50 rounded-md p-4 hover:bg-slate-100 transition-colors cursor-pointer">
      <h3 className="font-medium text-slate-800">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
      <div className="mt-2 flex justify-end">
        <ChevronRightIcon size={16} className="text-slate-400" />
      </div>
    </div>;
};