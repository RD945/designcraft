import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import TabSystem from '../TabSystem';
import WorkspaceView from '../WorkspaceView';
import { SidebarContext } from '../../contexts/SidebarContext';

const WorkspacePage: React.FC = () => {
    const { sidebarOpen } = useContext(SidebarContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    
    // Map URL params to actual tab names
    const tabMap: Record<string, string> = {
        'design-studio': 'Design Studio',
        'creative-lab': 'Creative Lab',
        'workshop': 'Workshop',
        'designcraft-browser': 'DesignCraft Browser'
    };
    
    const [activeTab, setActiveTab] = useState<string>(
        tabParam && tabMap[tabParam] ? tabMap[tabParam] : 'Design Studio'
    );
    
    // Update URL when tab changes
    useEffect(() => {
        // Find the URL-friendly version of the activeTab
        const urlParam = Object.entries(tabMap).find(
            ([_, value]) => value === activeTab
        )?.[0];
        
        if (urlParam) {
            // Create new URLSearchParams object instead of using an object literal
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('tab', urlParam);
            setSearchParams(newSearchParams);
        }
    }, [activeTab, setSearchParams, searchParams]);
    
    // Handle tab selection
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    
    return (
        <div className="flex flex-col h-full"> {/* Ensure full height */}
            <TabSystem activeTab={activeTab} setActiveTab={handleTabChange} />
            <div className="flex-1 pt-4"> {/* Add padding top to separate from tabs */}
                <WorkspaceView activeTab={activeTab} />
            </div>
        </div>
    );
};

export default WorkspacePage;
