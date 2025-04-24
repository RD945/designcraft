import React from 'react';

interface TabSystemProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabSystem: React.FC<TabSystemProps> = ({ activeTab, setActiveTab }) => {
    const tabs = ['Design Studio', 'Creative Lab', 'Workshop', 'DesignCraft Browser'];
    
    return (
        <div className="flex justify-center h-8 border-b bg-secondary-50">
            <div className="flex">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`px-3 h-full flex items-center text-xs font-medium transition-colors relative
                            ${activeTab === tab 
                                ? 'text-primary-700 border-b-2 border-primary-600' 
                                : 'text-secondary-500 hover:text-secondary-800 hover:bg-secondary-100'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabSystem;