import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Calendar, Clock, Github, Dribbble, Twitter } from 'lucide-react';

const Profile: React.FC = () => {
    const { getUserDisplayName } = useAuth();
    
    // Dummy activity data
    const activities = [
        { id: 1, type: "Project created", name: "Brand Redesign", time: "Today, 10:30 AM" },
        { id: 2, type: "File uploaded", name: "logo-final-v3.png", time: "Yesterday, 4:15 PM" },
        { id: 3, type: "Comment added", name: "Marketing Website", time: "Apr 17, 2025, 11:22 AM" },
        { id: 4, type: "Project shared", name: "Product Roadmap", time: "Apr 15, 2025, 9:45 AM" },
        { id: 5, type: "Project completed", name: "UI Component Library", time: "Apr 10, 2025, 3:20 PM" },
    ];

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-secondary-900 mb-8">Profile</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-primary-500 to-primary-400"></div>
                        <div className="p-8 pt-0 relative">
                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden absolute -mt-12 ring-4 ring-white shadow-md">
                                <div className="w-full h-full bg-gradient-to-br from-secondary-700 to-secondary-900 flex items-center justify-center">
                                    <User size={48} className="text-white" />
                                </div>
                            </div>
                            
                            <div className="ml-28 mb-4">
                                <h2 className="text-2xl font-bold text-secondary-900">{getUserDisplayName()}</h2>
                                <p className="text-secondary-600">Designer & Developer</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-secondary-700 mt-6">
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4 text-secondary-500" />
                                    <span>danreetam@gmail.com</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-secondary-500" />
                                    <span>Member since: Apr 2025</span>
                                </div>
                            </div>
                            
                            <p className="mt-6 text-secondary-700">
                                Product designer and front-end developer specializing in user interface design and creating intuitive, accessible web experiences.
                            </p>
                            
                            <div className="mt-6 pt-6 border-t border-secondary-200">
                                <div className="flex gap-4">
                                    <button className="px-5 py-2 bg-gradient-primary text-white rounded-lg font-medium text-sm shadow-sm hover:opacity-90 transition-opacity">
                                        Edit Profile
                                    </button>
                                    <button className="px-5 py-2 bg-secondary-100 text-secondary-700 border border-secondary-300 rounded-lg font-medium text-sm hover:bg-secondary-200 transition-colors">
                                        Change Avatar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b border-secondary-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-secondary-900">Recent Activity</h3>
                            <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">View All</button>
                        </div>
                        <div className="divide-y divide-secondary-200">
                            {activities.map(activity => (
                                <div key={activity.id} className="p-4 hover:bg-secondary-50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-secondary-900">{activity.type}</p>
                                            <p className="text-secondary-600">{activity.name}</p>
                                        </div>
                                        <div className="text-sm text-secondary-500 flex items-center">
                                            <Clock size={14} className="mr-1" />
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Connected Accounts */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b border-secondary-200">
                            <h3 className="text-lg font-semibold text-secondary-900">Connected Accounts</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Github className="h-5 w-5 text-secondary-700 mr-3" />
                                    <span className="font-medium text-secondary-700">GitHub</span>
                                </div>
                                <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full font-medium">Connected</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Dribbble className="h-5 w-5 text-secondary-700 mr-3" />
                                    <span className="font-medium text-secondary-700">Dribbble</span>
                                </div>
                                <button className="text-xs bg-secondary-100 text-secondary-700 py-1 px-2 rounded-full font-medium hover:bg-secondary-200 transition-colors">Connect</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Twitter className="h-5 w-5 text-secondary-700 mr-3" />
                                    <span className="font-medium text-secondary-700">Twitter</span>
                                </div>
                                <button className="text-xs bg-secondary-100 text-secondary-700 py-1 px-2 rounded-full font-medium hover:bg-secondary-200 transition-colors">Connect</button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Skills */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b border-secondary-200">
                            <h3 className="text-lg font-semibold text-secondary-900">Skills</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-wrap gap-2">
                                {['UI Design', 'UX Research', 'Prototyping', 'HTML/CSS', 'React', 'Figma', 'Sketch', 'Typography'].map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;