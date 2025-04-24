import React from 'react';

interface StatusBarProps {
  activeTab: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ activeTab }) => {
  return (
    <div className="bg-white shadow-md p-2 text-center">
      <p className="text-gray-700">Active Workspace: {activeTab}</p>
    </div>
  );
};

export default StatusBar;