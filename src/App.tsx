import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LandingPage from './components/LandingPage';
import AppRoutes from './routes';
import { SidebarProvider } from './contexts/SidebarContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Inner component to access auth context
const AppContent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true); // Always show welcome/loading page initially
    const [skipWelcomeAnimation, setSkipWelcomeAnimation] = useState(() => {
        // Check localStorage to see if we've shown welcome before
        return localStorage.getItem('welcomeShown') === 'true';
    });
    const [showLanding, setShowLanding] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        // Simulate loading delay to ensure welcome page appears
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // If user is logged out and not in welcome screen, show landing page
        if (!currentUser && !showWelcome && !isLoading) {
            setShowLanding(true);
        } else if (currentUser && !isLoading) {
            // If user is logged in, hide landing page
            setShowLanding(false);
        }
    }, [currentUser, showWelcome, isLoading]);

    // This handles the initial flow from welcome -> landing -> app
    if (isLoading || showWelcome) {
        return <WelcomePage 
            onComplete={() => {
                setShowWelcome(false);
                setShowLanding(!currentUser); // Only show landing if not logged in
                localStorage.setItem('welcomeShown', 'true');
            }}
            skipAnimation={skipWelcomeAnimation} // Pass the skip animation state
        />;
    }

    if (showLanding || !currentUser) {
        return <LandingPage onGetStarted={() => setShowLanding(false)} />;
    }

    // User is logged in, show the main app
    return (
        <SidebarProvider>
            <AppRoutes />
        </SidebarProvider>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;