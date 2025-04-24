import React, { useContext, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import {
    Palette,
    Layers,
    Settings,
    FolderOpen,
    Home,
    ChevronRight,
    Menu,
    X,
    User,
    Bell,
    HelpCircle,
    PanelLeft,
    ChevronLeft,
    LogOut
} from 'lucide-react';
import { SidebarContext } from '../../contexts/SidebarContext';
import { useAuth } from '../../contexts/AuthContext';
import { NavLinkProps } from 'react-router-dom';

const MainLayout: React.FC = () => {
    const { sidebarOpen, toggleSidebar, setSidebarOpen } = useContext(SidebarContext);
    const { currentUser, getUserDisplayName, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/workspace') {
            setSidebarOpen(false);
        }
    }, [location.pathname, setSidebarOpen]);

    const pathSegments = location.pathname.split('/').filter((seg: string) => seg);
    const isRoot = pathSegments.length === 0;

    const getPageTitle = () => {
        if (isRoot) return 'Dashboard';

        const currentSegment = pathSegments[pathSegments.length - 1];
        return currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1).replace(/-/g, ' ');
    };

    const sidebarWidth = sidebarOpen ? '240px' : '64px';

    const handleLogout = async () => {
        try {
            await logout();
            // No need to navigate manually - the App component will handle this 
            // based on auth state changes
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-main-layout">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out
                          bg-gradient-to-b from-secondary-900 to-secondary-800 text-white flex flex-col shadow-xl-soft`}
                style={{ width: sidebarWidth }}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-secondary-700/50 h-14">
                    <div className="flex items-center overflow-hidden">
                        <Palette className="h-6 w-6 min-w-6 text-primary-300" />
                        {sidebarOpen && <h1 className="ml-2 text-lg font-bold truncate text-secondary-100">DesignCraft</h1>}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="text-secondary-300 hover:text-white hover:bg-secondary-700/50 p-1 rounded-md transition-colors"
                        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {sidebarOpen ? <ChevronLeft size={18} /> : <PanelLeft size={18} />}
                    </button>
                </div>

                <nav className="flex-1 py-4 px-2 space-y-1 overflow-hidden">
                    {[
                        { to: "/", icon: Home, label: "Dashboard" },
                        { to: "/workspace", icon: Layers, label: "Workspace" },
                        { to: "/projects", icon: FolderOpen, label: "Projects" },
                        { to: "/settings", icon: Settings, label: "Settings" },
                    ].map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={(props) =>
                                `flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group ${
                                    props.isActive
                                        ? 'bg-primary-500/20 text-white shadow-inner-soft'
                                        : 'text-secondary-300 hover:bg-secondary-700/50 hover:text-white'
                                } ${
                                    !sidebarOpen ? 'justify-center' : ''
                                }`
                            }
                            end={item.to === "/"}
                        >
                            <item.icon size={18} className={sidebarOpen ? "mr-3 group-hover:scale-110 transition-transform" : "mx-auto group-hover:scale-110 transition-transform"} />
                            {sidebarOpen && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className={`p-3 border-t border-secondary-700/50 transition-all duration-300 ${
                    sidebarOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="flex items-center justify-between">
                        <Link to="/profile" className="flex items-center group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mr-3 ring-2 ring-white/20 group-hover:ring-white/40 transition-all">
                                <User size={16} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-secondary-100 group-hover:text-white transition-colors">{getUserDisplayName()}</p>
                            </div>
                        </Link>
                        <button 
                            onClick={handleLogout}
                            title="Logout"
                            className="text-secondary-400 hover:text-white p-1.5 rounded-md hover:bg-secondary-700/50 transition-colors"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>

                <div className={`py-3 border-t border-secondary-700/50 flex justify-center transition-all duration-300 ${
                    !sidebarOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'
                }`}>
                    <Link to="/profile" className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center ring-2 ring-white/20 hover:ring-white/40 transition-all">
                        <User size={16} className="text-white" />
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div
                className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
                style={{ marginLeft: sidebarWidth }}
            >
                <header className="bg-glass-bg backdrop-blur-sm border-b border-white/20 z-10 h-14 flex-shrink-0">
                    <div className="px-4 h-full flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="hidden md:flex items-center text-sm text-secondary-600">
                                <NavLink to="/" className="hover:text-primary-600">
                                    Dashboard
                                </NavLink>
                                {pathSegments.map((segment: string, index: number) => (
                                    <React.Fragment key={segment}>
                                        <ChevronRight size={16} className="mx-1 text-secondary-400" />
                                        <NavLink
                                            to={`/${pathSegments.slice(0, index + 1).join('/')}`}
                                            className="hover:text-primary-600 capitalize"
                                        >
                                            {segment.replace(/-/g, ' ')}
                                        </NavLink>
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="md:hidden text-base font-medium text-secondary-900">{getPageTitle()}</div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-white/50 rounded-full transition-colors">
                                <HelpCircle size={18} />
                            </button>
                            <button className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-white/50 rounded-full transition-colors relative">
                                <Bell size={18} />
                                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full ring-1 ring-white"></div>
                            </button>
                            <div className="h-6 border-r border-secondary-200/50 mx-1 hidden md:block"></div>
                            <Link to="/profile" className="flex items-center">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center ring-1 ring-primary-200 hover:ring-2 transition-all">
                                    <User size={15} className="text-white" />
                                </div>
                                <span className="ml-2 text-sm font-medium text-secondary-800 hidden md:inline">{getUserDisplayName()}</span>
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-white/50 rounded-full transition-colors hidden md:flex"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto bg-transparent p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
