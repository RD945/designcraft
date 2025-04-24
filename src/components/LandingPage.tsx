import React, { useState, useEffect } from 'react';
import { 
  Palette, ArrowRight, User, Mail, Lock, X, LogIn, UserPlus, AlertCircle, EyeOff, LogOut,
  Sparkles, Layers, Code, PenTool, Zap, GitBranch, Cpu, LifeBuoy, CheckCircle, Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { login, signup, resetPassword, currentUser, logout, getUserDisplayName, signInWithGoogle } = useAuth();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState('');

  useEffect(() => {
    if (isLogin) {
      setFormValid(email.includes('@') && password.length >= 6);
    } else {
      setFormValid(email.includes('@') && password.length >= 6 && name.trim().length >= 2);
    }
  }, [email, password, name, isLogin]);

  useEffect(() => {
    if (currentUser) {
      setUserDisplayName(getUserDisplayName());
    }
  }, [currentUser, getUserDisplayName]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setResetSent(true);
    } catch (error: any) {
      setError('Failed to reset password. Please check your email address.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValid) return;
    
    try {
      setError('');
      setLoading(true);
      
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      
      setShowAuthModal(false);
      onGetStarted();
    } catch (error: any) {
      let message = 'Authentication failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please log in instead.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      setShowAuthModal(false);
      onGetStarted();
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      let message = 'Google Sign-In failed. Please try again.';
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Sign-in window closed before completion.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        message = 'An account already exists with the same email address using a different sign-in method.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const switchMode = (mode: boolean) => {
    setIsLogin(mode);
    setError('');
    setPassword('');
  };

  const closeModal = () => {
    setShowAuthModal(false);
    setShowForgotPassword(false);
    setResetSent(false);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  const features = [
    {
      title: "All-in-One Design Suite",
      description: "Access UI design, prototyping, code generation, and asset management in one unified platform.",
      icon: Layers,
      color: "bg-gradient-to-br from-primary-500 to-primary-600"
    },
    {
      title: "AI-Powered Assistance",
      description: "Leverage cutting-edge AI to enhance your designs, automate repetitive tasks, and spark creativity.",
      icon: Sparkles,
      color: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
      title: "Real-time Collaboration",
      description: "Work seamlessly with your team through real-time syncing, comments, and version control.",
      icon: GitBranch,
      color: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
      title: "Code Integration",
      description: "Bridge the gap between design and development with automatic code generation and developer handoff.",
      icon: Code,
      color: "bg-gradient-to-br from-orange-500 to-amber-600"
    },
    {
      title: "Cross-platform Support",
      description: "Design for any device with responsive layouts and cross-platform preview tools.",
      icon: Cpu,
      color: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      title: "Advanced Prototyping",
      description: "Create interactive, high-fidelity prototypes that feel like the real thing.",
      icon: PenTool,
      color: "bg-gradient-to-br from-rose-500 to-pink-600"
    }
  ];

  const testimonials = [
    {
      quote: "Our CS230 prof asked us to build a responsive website from scratch. Most of my group was stuck with CSS issues but I found DesignCraft and finished my part in half the time. The chat helped me fix my grid layout problems without digging through StackOverflow for hours.",
      author: "Shlok Marathe",
      role: "CS Student at Monash Australia",
      avatar: "SM"
    },
    {
      quote: "Got this tool from a senior before my web development practical. It was super helpful for someone with more backend skills like me. The AI understood what I needed and helped me create a clean frontend. The live preview made testing different layouts very quick.",
      author: "Arnesh Batra",
      role: "CS Student at IIIT Delhi",
      avatar: "AB"
    },
    {
      quote: "Used DesignCraft for my web dev final project. Barely had to write any code myself. The AI basically understood what I was trying to build and generated most of it. Finished my project three days early and got good marks. Definitely sharing this with my friends.",
      author: "Aryan Ahmad",
      role: "Student at Bennett University",
      avatar: "AA"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white text-black overflow-y-auto">
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl animate-fade-in relative"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          >
            <div className="h-16 bg-gradient-to-r from-primary-600 to-primary-700 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">
                {showForgotPassword 
                  ? 'Reset Password' 
                  : isLogin 
                    ? 'Sign In' 
                    : 'Create Account'
                }
              </h2>
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-primary-500 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6">
              {showForgotPassword ? (
                <div>
                  {resetSent ? (
                    <div className="text-center py-8">
                      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Mail size={28} className="text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Check your inbox</h3>
                      <p className="text-secondary-600 mb-6">
                        We've sent a password reset link to <span className="font-medium">{email}</span>
                      </p>
                      <button
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetSent(false);
                        }}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Back to login
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleResetPassword}>
                      <p className="text-secondary-600 mb-4">
                        Enter your email address below and we'll send you a link to reset your password.
                      </p>
                      
                      {error && (
                        <div className="p-3 mb-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2 text-sm">
                          <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-red-700">{error}</p>
                        </div>
                      )}
                      
                      <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-3.5 text-secondary-400">
                            <Mail size={18} />
                          </div>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(false)}
                          className="flex-1 py-2.5 px-4 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading || !email.includes('@')}
                          className="flex-1 flex justify-center items-center gap-2 bg-primary-600 text-white py-2.5 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-60 disabled:pointer-events-none font-medium transition-colors"
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            'Send Reset Link'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center p-1 bg-secondary-100 rounded-lg mb-5">
                    <button
                      type="button"
                      onClick={() => switchMode(true)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        isLogin 
                          ? 'bg-white text-secondary-900 shadow-sm' 
                          : 'text-secondary-600 hover:text-secondary-900'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => switchMode(false)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        !isLogin
                          ? 'bg-white text-secondary-900 shadow-sm'
                          : 'text-secondary-600 hover:text-secondary-900'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  <form onSubmit={handleAuthSubmit}>
                    {error && (
                      <div className="p-3 mb-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2 text-sm">
                        <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-red-700">{error}</p>
                      </div>
                    )}
                    
                    {!isLogin && (
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1.5">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-3.5 text-secondary-400">
                            <User size={18} />
                          </div>
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="Your full name"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-3.5 text-secondary-400">
                          <Mail size={18} />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="password" className="block text-sm font-medium text-secondary-700">
                          Password
                        </label>
                        {isLogin && (
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute left-3.5 top-3.5 text-secondary-400">
                          <Lock size={18} />
                        </div>
                        <div className="absolute right-3.5 top-3.5 text-secondary-400">
                          <EyeOff size={18} />
                        </div>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 bg-white rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="••••••••"
                          required
                          minLength={6}
                        />
                      </div>
                      {!isLogin && (
                        <p className="mt-1.5 text-xs text-secondary-500">
                          Password must be at least 6 characters
                        </p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading || !formValid}
                      className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors hover:bg-primary-700 disabled:opacity-60 disabled:pointer-events-none mb-4"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          {isLogin ? (
                            <>
                              <LogIn size={18} />
                              <span>Sign in</span>
                            </>
                          ) : (
                            <>
                              <UserPlus size={18} />
                              <span>Create account</span>
                            </>
                          )}
                        </>
                      )}
                    </button>
                  </form>

                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-secondary-200"></div>
                    <span className="flex-shrink mx-4 text-secondary-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-secondary-200"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white text-secondary-700 py-3 px-4 rounded-lg font-medium transition-colors border border-secondary-300 hover:bg-secondary-50 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <GoogleIcon className="w-5 h-5" />
                        <span>Sign in with Google</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 shadow-sm border-b border-secondary-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg p-2 shadow-sm">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">DesignCraft Studio</span>
          </div>
          
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <span className="hidden md:block text-secondary-700 font-medium">
                  {userDisplayName}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-800 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setIsLogin(true);
                    setShowAuthModal(true);
                    setError('');
                  }}
                  className="hidden md:block px-5 py-2 text-primary-700 hover:text-primary-800 font-medium transition-colors"
                >
                  Log in
                </button>
                <button 
                  onClick={() => {
                    setIsLogin(false);
                    setShowAuthModal(true);
                    setError('');
                  }}
                  className="hidden md:block px-5 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors font-medium"
                >
                  Sign up
                </button>
              </>
            )}
            <button 
              onClick={() => {
                if (!currentUser) {
                  setIsLogin(true);
                  setShowAuthModal(true);
                  setError('');
                } else {
                  onGetStarted();
                }
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:shadow-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 flex items-center gap-2 font-medium"
            >
              Launch Studio
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </header>

      <section className="pt-28 md:pt-40 pb-24 px-6 bg-gradient-to-br from-slate-50 via-indigo-50 to-primary-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary-300/20 to-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-indigo-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/60 backdrop-blur-sm text-primary-700 rounded-full mb-6 font-medium text-sm">
                <Zap size={16} className="text-primary-500" /> 
                <span>The next generation design platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                Your Complete <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">Design Ecosystem</span>
              </h1>
              
              <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
                Seamlessly integrate design, prototyping, and development workflows into a single, powerful platform. Elevate your creative process with AI-powered tools and real-time collaboration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    if (!currentUser) {
                      setIsLogin(false);
                      setShowAuthModal(true);
                      setError('');
                    } else {
                      onGetStarted();
                    }
                  }}
                  className="group px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-lg font-medium rounded-lg 
                           flex items-center justify-center gap-2
                           transition-all duration-300
                           hover:shadow-xl hover:shadow-primary-500/20 hover:from-primary-700 hover:to-primary-600"
                >
                  <span>{currentUser ? 'Launch Studio' : 'Get Started Free'}</span>
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                
                {!currentUser && (
                  <button 
                    onClick={() => {
                      setIsLogin(true);
                      setShowAuthModal(true);
                      setError('');
                    }}
                    className="px-8 py-3.5 bg-white text-primary-700 text-lg font-medium rounded-lg 
                            border border-primary-200 shadow-sm
                            flex items-center justify-center gap-2
                            transition-all duration-300
                            hover:bg-primary-50"
                  >
                    <span>Sign in</span>
                    <LogIn size={20} />
                  </button>
                )}
              </div>
              
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#FBBF24" stroke="none" />
                    ))}
                  </div>
                  <p className="text-sm text-secondary-600">Trusted by creative professionals</p>
                </div>
              </div>
            </div>
            
            <div className="md:ml-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-white/50 backdrop-blur-sm">
                <div className="h-9 bg-secondary-100/80 flex items-center px-4 gap-2 border-b border-secondary-200">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <div className="ml-auto text-xs text-secondary-500 font-medium">DesignCraft Studio</div>
                </div>
                
                <img 
                  src="/design.png" 
                  alt="DesignCraft Studio Interface" 
                  className="w-full object-cover"
                  style={{ minHeight: "350px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Creators</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Everything you need to design, prototype, and deliver exceptional digital experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-6 border border-secondary-200/80 hover:border-primary-300/80 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg mb-5 flex items-center justify-center shadow-sm`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gradient-to-br from-secondary-50 to-secondary-100/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary-200/60 backdrop-blur-sm text-secondary-700 rounded-full mb-4 font-medium text-sm">
              <CheckCircle size={16} className="text-primary-600" /> 
              <span>Trusted by all of our users</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">What Our Users Are Saying</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-secondary-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FBBF24" stroke="none" />
                  ))}
                </div>
                <p className="text-secondary-800 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-medium text-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-secondary-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100/60 text-emerald-700 rounded-full mb-4 font-medium text-sm">
                <Zap size={16} className="text-emerald-500" /> 
                <span>Intelligent workflow</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Streamline Your Creative Process</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 p-1 bg-primary-100 rounded-full">
                    <CheckCircle size={16} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Smart Asset Management</h4>
                    <p className="text-secondary-600">Keep all your design assets organized and accessible</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-3 p-1 bg-primary-100 rounded-full">
                    <CheckCircle size={16} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Real-time Collaboration</h4>
                    <p className="text-secondary-600">Work simultaneously with your team members from anywhere</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-3 p-1 bg-primary-100 rounded-full">
                    <CheckCircle size={16} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Design System Management</h4>
                    <p className="text-secondary-600">Create, maintain and implement consistent design systems</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  if (!currentUser) {
                    setIsLogin(true);
                    setShowAuthModal(true);
                  } else {
                    onGetStarted();
                  }
                }}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 flex items-center gap-2 font-medium"
              >
                <span>Experience DesignCraft</span>
                <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-secondary-200/80 bg-white p-4">
                <img 
                  src="/design.png" 
                  alt="DesignCraft Studio Features" 
                  className="w-full rounded-lg"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg border border-secondary-100">
                  <h3 className="font-bold text-lg mb-1">AI-Powered Design Assistant</h3>
                  <p className="text-secondary-700 text-sm">Intelligently enhances your workflow with smart suggestions</p>
                  <div className="mt-2 flex">
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Available now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-700 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Creative Process?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-xl mx-auto">
            Join thousands of designers and creators who have elevated their work with DesignCraft Studio.
          </p>
          <button 
            onClick={() => {
              if (!currentUser) {
                setIsLogin(false);
                setShowAuthModal(true);
              } else {
                onGetStarted();
              }
            }}
            className="px-10 py-4 bg-white text-primary-600 text-lg font-medium rounded-lg
                      transition-all duration-300 shadow-lg shadow-primary-800/30
                      hover:bg-primary-50 hover:scale-105"
          >
            {currentUser ? 'Launch Design Studio' : 'Create Your Free Account'}
          </button>
          <p className="mt-4 text-sm text-primary-200">No credit card required • Free starter plan available</p>
        </div>
      </section>

      <footer className="pt-16 pb-10 bg-secondary-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg p-2">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 font-bold text-xl">DesignCraft</span>
              </div>
              <p className="text-secondary-400 mb-4 pr-4">
                Your complete design ecosystem for modern creative professionals.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-secondary-700 transition-colors">
                  <span className="text-secondary-400 font-bold">X</span>
                </div>
                <div className="w-8 h-8 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-secondary-700 transition-colors">
                  <span className="text-secondary-400 font-bold">in</span>
                </div>
                <div className="w-8 h-8 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-secondary-700 transition-colors">
                  <span className="text-secondary-400 font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-secondary-700 transition-colors">
                  <span className="text-secondary-400 font-bold">ig</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              &copy; {new Date().getFullYear()} DesignCraft Studio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-secondary-400">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </footer>

      <style>
        {`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
