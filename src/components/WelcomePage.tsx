import React, { useEffect, useState, useRef } from 'react';
import { Palette, Code, Layers, ChevronRight } from 'lucide-react';

interface WelcomePageProps {
  onComplete: () => void;
  skipAnimation?: boolean;
}

const LOADING_DURATION = 3000; // 3 seconds loading time

const WelcomePage: React.FC<WelcomePageProps> = ({ onComplete, skipAnimation = false }) => {
  const [animationStage, setAnimationStage] = useState(0);
  const [skipClicked, setSkipClicked] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // Handle initial animation sequence
  useEffect(() => {
    // If skipAnimation prop is true or skip button was clicked, go to the end quickly
    if (skipAnimation || skipClicked) {
      // Show all content immediately and auto-complete after a short delay
      setAnimationStage(4); 
      setProgressValue(100); // Set progress to full
      setTimeout(onComplete, 500);
      return;
    }
    
    // Normal animation sequence
    const timer1 = setTimeout(() => setAnimationStage(1), 500); // Logo appearance
    const timer2 = setTimeout(() => setAnimationStage(2), 1000); // Welcome text
    const timer3 = setTimeout(() => setAnimationStage(3), 1500); // Brand name
    const timer4 = setTimeout(() => setAnimationStage(4), 2200); // Subtext & icons
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [skipAnimation, skipClicked, onComplete]);
  
  // Handle loading animation and transition
  useEffect(() => {
    if (animationStage < 4 || skipAnimation || skipClicked) {
      return;
    }
    
    // Reset progress
    setProgressValue(0);
    startTimeRef.current = null;
    
    // Animation function for smooth progress
    const animate = (timestamp: number) => {
      // Initialize start time on first frame
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      // Calculate progress
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(100, (elapsed / LOADING_DURATION) * 100);
      
      // Update state
      setProgressValue(progress);
      
      // Continue animation or complete
      if (progress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // When animation completes (reaches 100%), transition out
        setTimeout(() => {
          setAnimationStage(5);
          setTimeout(onComplete, 500);
        }, 200); // Small pause at 100% before transition
      }
    };
    
    // Start the animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationStage, skipAnimation, skipClicked, onComplete]);
  
  return (
    <div className={`fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-all duration-1000
      ${animationStage === 5 ? 'opacity-0' : 'opacity-100'}`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50px 50px, #f9f9f9 10px, transparent 10px), radial-gradient(circle at 100px 100px, #f9f9f9 10px, transparent 10px)',
        backgroundSize: '120px 120px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
    >
      {/* Only show skip button if not already in skip mode */}
      {!skipAnimation && animationStage < 4 && (
        <button 
          onClick={() => setSkipClicked(true)}
          className="absolute top-8 right-8 text-black/50 hover:text-black transition-colors flex items-center gap-1 group"
        >
          Skip <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      <div className="relative text-center max-w-3xl px-6">
        {/* Logo animation */}
        <div className={`mb-12 transform transition-all duration-700 ease-out 
          ${animationStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-900 to-black shadow-lg">
            <Palette size={64} className="text-white" />
          </div>
        </div>

        {/* Welcome text - now larger */}
        <h1 className="text-6xl font-light mb-6 tracking-tight">
          <span className={`inline-block transition-all duration-500 delay-100 ease-out
            ${animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Welcome to
          </span>
        </h1>

        {/* Brand name - now larger */}
        <div className="my-8">
          <h2 className={`text-8xl font-extrabold tracking-tight transition-all duration-500 delay-100 ease-out
            ${animationStage >= 3 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-black to-slate-700">
              DesignCraft
            </span>
          </h2>
          <div className={`h-1.5 w-40 mx-auto mt-6 bg-black rounded transition-all duration-500 delay-300
            ${animationStage >= 3 ? 'opacity-100 transform scale-x-100' : 'opacity-0 transform scale-x-0'}`}>
          </div>
        </div>

        {/* Subtext and features */}
        <div className={`mt-12 transition-all duration-700 delay-200
          ${animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-2xl text-gray-700 mb-12 font-light">Your professional creative environment</p>
          
          <div className="flex justify-center gap-16 mt-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white mb-3">
                <Palette size={28} />
              </div>
              <span className="text-base font-medium">Design</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white mb-3">
                <Code size={28} />
              </div>
              <span className="text-base font-medium">Create</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white mb-3">
                <Layers size={28} />
              </div>
              <span className="text-base font-medium">Build</span>
            </div>
          </div>
          
          {/* Progress indicator - filling up over 5 seconds with improved UI */}
          <div className="mt-16">
            <div className="relative w-64 h-3 bg-gray-100 rounded-full mx-auto overflow-hidden shadow-inner">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 rounded-full"
                style={{ 
                  width: `${progressValue}%`,
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.7)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
