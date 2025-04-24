import React, { useState, useContext } from 'react';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { SidebarContext } from '../contexts/SidebarContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { currentUser, logout, getUserDisplayName } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      // Instead of using navigate('/'), we'll use window.location
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleSettings = () => {
    // Use window.location instead of navigate
    window.location.href = '/settings';
    setShowMenu(false);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">DesignCraft Studio</h1>
      </div>

      <div className="relative">
        <button 
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {getUserDisplayName()}
          </span>
        </button>

        {showMenu && (
          <div 
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
            style={{ 
              animation: 'fadeIn 0.2s ease-in-out',
              transformOrigin: 'top right'
            }}
          >
            <button
              onClick={handleSettings}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;