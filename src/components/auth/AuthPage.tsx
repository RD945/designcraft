import React, { useState } from 'react';
import { Palette, User, Mail, Lock, ArrowRight, LogIn, UserPlus } from 'lucide-react';

interface AuthPageProps {
  onComplete: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Left panel - Brand info */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-900 text-white flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white rounded-lg p-2">
              <Palette className="h-8 w-8 text-primary-900" />
            </div>
            <span className="font-bold text-2xl">DesignCraft Studio</span>
          </div>
          
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">Unlock your creative potential</h1>
          <p className="text-xl text-primary-100 mb-8 max-w-md">
            Join thousands of designers and creators who have elevated their work with DesignCraft Studio.
          </p>
          
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="bg-primary-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-1">Professional Tools</h3>
              <p className="text-sm text-primary-200">Access to industry-standard design tools</p>
            </div>
            <div className="bg-primary-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-1">Seamless Workflow</h3>
              <p className="text-sm text-primary-200">Everything in one integrated environment</p>
            </div>
            <div className="bg-primary-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-1">Cloud Storage</h3>
              <p className="text-sm text-primary-200">Access your projects from anywhere</p>
            </div>
            <div className="bg-primary-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-1">Collaboration</h3>
              <p className="text-sm text-primary-200">Work together with your team in real time</p>
            </div>
          </div>
        </div>
        
        <p className="text-primary-300 text-sm">
          &copy; {new Date().getFullYear()} DesignCraft Studio. All rights reserved.
        </p>
      </div>
      
      {/* Right panel - Auth forms */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
              <div className="bg-primary-600 rounded-lg p-2">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <span className="font-bold text-2xl text-secondary-900">DesignCraft Studio</span>
            </div>
            
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-secondary-600">
              {isLogin 
                ? 'Log in to access your DesignCraft workspace'
                : 'Join DesignCraft Studio and start creating amazing designs'
              }
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-secondary-400">
                    <User size={20} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-secondary-400">
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-secondary-400">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••••"
                  required
                />
              </div>
            </div>
            
            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-primary-600 hover:text-primary-800 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <LogIn size={20} />
                      <span>Log in</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      <span>Create account</span>
                    </>
                  )}
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-secondary-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-medium text-primary-600 hover:text-primary-800 transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={onComplete}
              className="font-medium text-primary-600 hover:text-primary-800 transition-colors flex items-center justify-center mx-auto gap-1"
            >
              <span>Skip for now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;