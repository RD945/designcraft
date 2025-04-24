import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import WorkspacePage from './components/pages/WorkspacePage';
import Settings from './components/pages/Settings';
import Profile from './components/pages/Profile';
import Analytics from './components/pages/Analytics';
import LandingPage from './components/LandingPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Landing page - accessible even when logged in */}
            <Route path="/landing" element={<LandingPage onGetStarted={() => window.location.href = "/"} />} />
            
            {/* Main application routes */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="workspace" element={<WorkspacePage />} />
                <Route path="projects" element={<Projects />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
