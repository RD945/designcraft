import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Palette,
  Code,
  Layers,
  Clock,
  Star,
  FileText,
  PieChart,
  ArrowRight,
  Home
} from 'lucide-react';

const tileClasses = "bg-black text-white rounded-xl p-6 transition-transform hover:scale-[1.02] group";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Navigate back to landing without logging out
  const handleBackToLanding = () => {
    navigate('/landing');
  };

  // Dummy data for recent projects
  const recentProjects = [
    { id: 1, name: "Brand Redesign", type: "Design", date: "Today", starred: true },
    { id: 2, name: "Mobile App UI", type: "Design", date: "Yesterday", starred: false },
    { id: 3, name: "Marketing Website", type: "Development", date: "3 days ago", starred: true },
    { id: 4, name: "Product Roadmap", type: "Planning", date: "Last week", starred: false },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Reetam!</h1>
          <p className="text-gray-600">Here's an overview of your creative workspaces</p>
        </div>
        <button
          onClick={handleBackToLanding}
          className="flex items-center bg-gray-200 text-black rounded-lg px-4 py-2 hover:bg-gray-300 transition"
        >
          <Home size={20} className="mr-2" />
          Back to Home
        </button>
      </div>

      {/* Quick access tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link to="/workspace" className={tileClasses}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold mb-3">Continue Working</h2>
              <p className="text-gray-300 mb-6">Resume your latest workspace</p>
              <div className="flex items-center">
                <span>Open Workspace</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <Layers size={24} />
            </div>
          </div>
        </Link>

        <Link to="/workspace?new=true" className={tileClasses}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold mb-3">Start New Project</h2>
              <p className="text-gray-300 mb-6">Create from scratch or template</p>
              <div className="flex items-center">
                <span>Create Project</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <FileText size={24} />
            </div>
          </div>
        </Link>

        <Link to="/analytics" className={tileClasses}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold mb-3">View Analytics</h2>
              <p className="text-gray-300 mb-6">Track progress across projects</p>
              <div className="flex items-center">
                <span>See Details</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <PieChart size={24} />
            </div>
          </div>
        </Link>
      </div>

      {/* Workspace cards */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-5">Workspaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/workspace?tab=design-studio"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-4 p-3 bg-black text-white rounded-lg inline-flex">
              <Palette size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Design Studio</h3>
            <p className="text-gray-600 mb-4">Create visual designs, layouts, and graphics</p>
            <div className="text-sm text-black font-medium flex items-center">
              Open Studio <ArrowRight size={14} className="ml-1" />
            </div>
          </Link>

          <Link
            to="/workspace?tab=creative-lab"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-4 p-3 bg-black text-white rounded-lg inline-flex">
              <Code size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Creative Lab</h3>
            <p className="text-gray-600 mb-4">Experiment with creative coding and prototypes</p>
            <div className="text-sm text-black font-medium flex items-center">
              Open Lab <ArrowRight size={14} className="ml-1" />
            </div>
          </Link>

          <Link
            to="/workspace?tab=workshop"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-4 p-3 bg-black text-white rounded-lg inline-flex">
              <Layers size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Workshop</h3>
            <p className="text-gray-600 mb-4">Build and finalize your creative projects</p>
            <div className="text-sm text-black font-medium flex items-center">
              Open Workshop <ArrowRight size={14} className="ml-1" />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent projects */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Recent Projects</h2>
          <Link to="/projects" className="text-sm text-black font-medium flex items-center">
            View All <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentProjects.map(project => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {project.name}
                          {project.starred && (
                            <Star size={16} fill="currentColor" className="ml-2 text-yellow-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{project.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />{project.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/projects/${project.id}`} className="text-black hover:text-gray-700">Open</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
