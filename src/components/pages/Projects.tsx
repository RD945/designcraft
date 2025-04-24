import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Clock, Star, Plus, Filter, Search, List, Grid } from 'lucide-react';

const Projects: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data for projects
    const projects = [
        { id: 1, name: "Brand Redesign", type: "Design", date: "2023-03-15", starred: true },
        { id: 2, name: "Mobile App UI", type: "Design", date: "2023-03-10", starred: false },
        { id: 3, name: "Marketing Website", type: "Development", date: "2023-03-05", starred: true },
        { id: 4, name: "Product Roadmap", type: "Planning", date: "2023-02-28", starred: false },
        { id: 5, name: "User Flow Diagrams", type: "UX", date: "2023-02-20", starred: false },
        { id: 6, name: "E-commerce Platform", type: "Development", date: "2023-02-15", starred: true },
    ];

    // Filter projects based on search term
    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-secondary-900">Projects</h1>
                    <p className="text-secondary-600 mt-1">Manage all your creative projects</p>
                </div>
                <Link
                    to="/workspace?new=true"
                    className="px-5 py-2.5 bg-gradient-primary text-white rounded-lg font-medium text-sm transition-opacity hover:opacity-90 shadow-md flex items-center gap-2"
                >
                    <Plus size={16} />
                    <span>New Project</span>
                </Link>
            </div>

            {/* Toolbar: Search, Filter, View Toggle */}
            <div className="mb-6 p-4 bg-white border border-secondary-200/80 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-auto flex-grow max-w-sm">
                    <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-secondary-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-secondary-50/50 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-inner-soft text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 border border-secondary-300 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors flex items-center gap-1.5 text-sm">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    {/* View Mode Toggle */}
                    <div className="flex items-center p-1 bg-secondary-100 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-secondary-500 hover:text-secondary-800'}`}
                            aria-label="Grid View"
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-secondary-500 hover:text-secondary-800'}`}
                            aria-label="List View"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Project List/Grid */}
            {filteredProjects.length === 0 ? (
                <div className="text-center py-16 bg-white border border-secondary-200/80 rounded-xl shadow-sm">
                    <FolderOpen size={48} className="mx-auto text-secondary-400 mb-4" />
                    <h3 className="text-xl font-semibold text-secondary-700 mb-2">No projects found</h3>
                    <p className="text-secondary-500">{searchTerm ? 'Try adjusting your search or filter.' : 'Get started by creating a new project.'}</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map(project => (
                        <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="block bg-white border border-secondary-200/80 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg-soft hover:border-primary-300/50 group"
                        >
                            {/* Placeholder for project thumbnail */}
                            <div className="aspect-video bg-secondary-100 flex items-center justify-center">
                                <FolderOpen size={32} className="text-secondary-400" />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors truncate mr-2">{project.name}</h3>
                                    {project.starred && (
                                        <Star size={16} fill="currentColor" className="text-yellow-400 flex-shrink-0 transition-transform hover:scale-125" />
                                    )}
                                </div>
                                <p className="text-xs text-secondary-500 mb-2">{project.type}</p>
                                <div className="flex items-center text-xs text-secondary-500">
                                    <Clock size={12} className="mr-1" />
                                    <span>{new Date(project.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-secondary-200/80 rounded-xl overflow-hidden shadow-md">
                    <table className="min-w-full divide-y divide-secondary-200/80">
                        <thead className="bg-secondary-50/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider w-2/5">Project</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Last Modified</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary-200/50">
                            {filteredProjects.map(project => (
                                <tr key={project.id} className="hover:bg-secondary-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-secondary-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                                                <FolderOpen size={16} className="text-secondary-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link to={`/projects/${project.id}`} className="text-sm font-medium text-secondary-900 hover:text-primary-600 truncate flex items-center">
                                                    {project.name}
                                                    {project.starred && (
                                                        <Star size={14} fill="currentColor" className="ml-2 text-yellow-400 transition-transform hover:scale-125 flex-shrink-0" />
                                                    )}
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800">
                                            {project.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                                        <div className="flex items-center">
                                            <Clock size={14} className="mr-1.5" />
                                            {new Date(project.date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link to={`/projects/${project.id}`} className="text-primary-600 hover:text-primary-800 hover:underline">
                                            Open
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Projects;
