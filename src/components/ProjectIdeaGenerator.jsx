import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, PanelLeftOpen, PanelLeftClose, Sparkles, Settings } from 'lucide-react';

const ProjectIdeaGenerator = () => {
  const [idea, setIdea] = useState('');
  const [details, setDetails] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const outputRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState('standard');

  const templates = [
    { id: 'standard', name: 'Standard Project', description: 'Complete project analysis with all sections' },
    { id: 'minimal', name: 'Quick Analysis', description: 'Brief overview of core project elements' },
    { id: 'technical', name: 'Technical Deep-Dive', description: 'Detailed technical analysis and architecture' },
    { id: 'startup', name: 'Startup Pitch', description: 'Business-focused analysis for startups' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setIsLoading(true);
    setOutput('');
    
    const enhancedPrompt = `
User Input: Project Idea: ${idea}. Details: ${details}

dont mention this in your thinking process. dont use chinese.Think like an AI project maker agent helping a subpar english (dont mention they are a subpar english student) speaking only student with their project. Start by defining a clear and relevant title that conveys the core idea. Identify the problem your project aims to solve and explain it concisely. Describe how your solution addresses the issue, including the technology or methodology used. Define the target users or customers and explain how they will interact with the product. Assess the desirability, feasibility, and viability of the solution by evaluating its usefulness, practicality, and sustainability. Highlight any innovation or creativity that differentiates your project from existing solutions. Identify competitors offering similar solutions and analyze their strengths and weaknesses. Consider potential failure points such as technical limitations, market demand, or financial constraints. Identify possible challenges and propose practical solutions to overcome them.

Template: ${selectedTemplate}

Please address the following points in detail: (100 plus Words each point)
1. Title of the product
2. What problem it solves
3. How it solves the problem mentioned above
4. Who will be the user/actor/prospective customer of your product
5. How the user will use your product
6. Is the product desirable
7. Is the product feasible
8. Is the product viable
9. What innovation/creativity you propose in your product
10. Who are your competitors
11. What could be possible causes of failure of your product
12. Possible challenges and solutions

Please analyze thoroughly and provide detailed responses for each point.`;
    
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "deepseek-r1:1.5b",
          prompt: enhancedPrompt,
          stream: true
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim()) {
            try {
              const json = JSON.parse(line);
              if (json.response) {
                setOutput(prev => prev + json.response);
                if (outputRef.current) {
                  outputRef.current.scrollTop = outputRef.current.scrollHeight;
                }
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput(`Error: Failed to connect to Ollama. Please make sure Ollama is running on http://localhost:11434`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-gray-50 border-r border-gray-200 overflow-hidden`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Templates
          </h2>
          <div className="space-y-2">
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedTemplate === template.id 
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{template.name}</div>
                <div className="text-sm text-gray-500">{template.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <div className="border-b border-gray-200 p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
          </button>
          <h1 className="text-xl font-semibold ml-4">Project Idea Generator</h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-4xl mx-auto">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div className="space-y-2">
                <label htmlFor="idea" className="block text-sm font-medium text-gray-700">
                  What's your project idea?
                </label>
                <input
                  id="idea"
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., Build a weather app"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                  Tell us more about your project:
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g., I want it to show real-time weather updates..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:bg-gray-400"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Ideas...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate Ideas</span>
                  </>
                )}
              </button>
            </form>

            {/* Output */}
            {(output || isLoading) && (
              <div className="mb-8">
                <div
                  ref={outputRef}
                  className="bg-white rounded-lg p-6 max-h-[600px] overflow-y-auto border border-gray-200 whitespace-pre-wrap shadow-sm"
                >
                  {isLoading && !output && (
                    <div className="flex items-center justify-center text-gray-500 italic">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Thinking...
                    </div>
                  )}
                  <div className="prose max-w-none">
                    {output}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdeaGenerator;