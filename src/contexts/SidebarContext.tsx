import React, { createContext, useState, useMemo, ReactNode } from 'react';

interface SidebarContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  sidebarOpen: true,
  toggleSidebar: () => {},
  setSidebarOpen: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  
  const value = useMemo(() => ({
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
  }), [sidebarOpen]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};