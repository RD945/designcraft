import React, { useState } from 'react';
import { 
  BarChart, 
  TrendingUp, 
  Clock, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  CheckCircle, 
  PieChartIcon,
  Activity,
  Target,
  Zap,
  Eye,
  MousePointer,
  FileText,
  Image
} from 'lucide-react';

// Define interfaces for component props
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  isPositive?: boolean;
}

// Simple component for stat cards
const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, isPositive = true }) => (
  <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-secondary-600 text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-secondary-900">{value}</h3>
        <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{change}</span>
        </div>
      </div>
      <div className="p-3 bg-secondary-100 rounded-lg">
        <Icon className={`h-6 w-6 ${isPositive ? 'text-primary-600' : 'text-secondary-700'}`} />
      </div>
    </div>
  </div>
);

// Animated Bar Chart with hover effects
const EnhancedBarChart = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  // Using April 2025 data (current date context is April 20, 2025)
  const data = [
    { 
      day: 'Mon', 
      label: 'Apr 14',
      users: 2,
      sessions: 8,
      avgTime: '1.8h',
      value: 72, 
      color: 'from-primary-500 to-primary-600' 
    },
    { 
      day: 'Tue', 
      label: 'Apr 15',
      users: 3,
      sessions: 7,
      avgTime: '1.5h',
      value: 68, 
      color: 'from-primary-500 to-primary-600' 
    },
    { 
      day: 'Wed', 
      label: 'Apr 16',
      users: 4,
      sessions: 9,
      avgTime: '2.1h',
      value: 78, 
      color: 'from-primary-400 to-primary-600' 
    },
    { 
      day: 'Thu', 
      label: 'Apr 17',
      users: 5,
      sessions: 9,
      avgTime: '2.3h',
      value: 85, 
      color: 'from-primary-500 to-primary-600' 
    },
    { 
      day: 'Fri', 
      label: 'Apr 18',
      users: 4,
      sessions: 9,
      avgTime: '1.9h',
      value: 80, 
      color: 'from-primary-500 to-primary-600' 
    },
    { 
      day: 'Sat', 
      label: 'Apr 19',
      users: 3,
      sessions: 6,
      avgTime: '1.4h',
      value: 58, 
      color: 'from-primary-500 to-primary-600' 
    },
    { 
      day: 'Sun', 
      label: 'Apr 20',
      users: 5,
      sessions: 10,
      avgTime: '2.5h',
      value: 92, 
      color: 'from-accent-400 to-accent-600' 
    },
  ];
  
  return (
    <div className="h-64 relative flex items-end justify-between p-4">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-secondary-500 pr-2">
        <span>100%</span>
        <span>75%</span>
        <span>50%</span>
        <span>25%</span>
        <span>0%</span>
      </div>
      
      <div className="ml-8 w-full flex items-end justify-between">
        {data.map((item, i) => (
          <div 
            key={i} 
            className="relative flex flex-col items-center group"
            onMouseEnter={() => setHoveredBar(i)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {/* Enhanced Tooltip with more metrics */}
            {hoveredBar === i && (
              <div className="absolute -top-28 bg-secondary-800 text-white px-4 py-3 rounded text-xs whitespace-nowrap animate-fade-in z-10 shadow-lg">
                <div className="font-bold mb-1.5">{item.day}, {item.label}</div>
                <div className="space-y-1">
                  <div className="flex justify-between gap-4">
                    <span>Activity:</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Users:</span>
                    <span className="font-medium">{item.users}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Sessions:</span>
                    <span className="font-medium">{item.sessions}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Avg time:</span>
                    <span className="font-medium">{item.avgTime}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="w-9 flex-1">
              <div 
                className={`w-full bg-gradient-to-t ${item.color} rounded-t-md transition-all duration-300 ${
                  hoveredBar === i ? 'opacity-100 scale-x-110' : 'opacity-85'
                }`}
                style={{ 
                  height: `${item.value}%`,
                  animation: `grow-up 1s ease-out ${i * 0.1}s both`
                }}
              >
                {/* User count overlay on bar */}
                {item.value > 50 && (
                  <div className="relative w-full flex justify-center -top-6">
                    <span className="bg-white/80 text-[10px] px-1.5 py-0.5 rounded-full font-medium text-primary-700">
                      {item.users}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Day label with special highlight for today */}
            <div className="mt-2 text-center">
              <p className={`text-xs font-medium transition-colors ${
                hoveredBar === i ? 'text-primary-600' : 
                item.day === 'Sun' ? 'text-secondary-900' : 'text-secondary-600'
              }`}>
                {item.day}
              </p>
              <p className="text-[10px] text-secondary-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((val) => (
        <div 
          key={val} 
          className="absolute left-8 right-4 h-px bg-secondary-200"
          style={{ bottom: `${val}%` }}
        ></div>
      ))}
      
      {/* Legend */}
      <div className="absolute top-0 right-4 flex items-center text-xs text-secondary-600">
        <div className="flex items-center mr-4">
          <div className="w-2 h-2 bg-primary-500 rounded-full mr-1.5"></div>
          <span>Regular days</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-accent-500 rounded-full mr-1.5"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

// Interactive Donut Chart Component
const EnhancedDonutChart = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const data = [
    { name: "UI Design", value: 45, color: "bg-primary-500" },
    { name: "Front-end", value: 30, color: "bg-accent-500" },
    { name: "Back-end", value: 15, color: "bg-secondary-700" },
    { name: "Testing", value: 10, color: "bg-emerald-500" },
  ];
  
  // Calculate the rotation for each segment
  const calculateSegments = () => {
    let currentRotation = 0;
    return data.map((item) => {
      const rotation = currentRotation;
      const degrees = (item.value / 100) * 360;
      currentRotation += degrees;
      return {
        ...item,
        rotation,
        degrees
      };
    });
  };
  
  const segments = calculateSegments();
  
  // Convert donut segment to SVG path
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", x, y,
      "Z"
    ].join(" ");
  };
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  return (
    <div className="h-64 flex justify-center items-center relative">
      <svg className="w-48 h-48" viewBox="0 0 100 100">
        {/* Outer circle for reference */}
        <circle cx="50" cy="50" r="45" fill="#f1f5f9" />
        
        {/* Inner circle (hole) */}
        <circle cx="50" cy="50" r="25" fill="white" className="shadow-sm" />
        
        {/* Donut segments */}
        {segments.map((segment, index) => {
          const colorMap = {
            "bg-primary-500": "#6366f1",
            "bg-accent-500": "#14b8a6",
            "bg-secondary-700": "#334155",
            "bg-emerald-500": "#10b981",
          };
          
          // @ts-ignore - Safely accessing colorMap
          const fillColor = colorMap[segment.color] || "#6366f1";
          
          return (
            <path
              key={index}
              d={describeArc(
                50, 50, 45, 
                segment.rotation, 
                segment.rotation + segment.degrees
              )}
              fill={fillColor}
              stroke="white"
              strokeWidth="1"
              className={`transition-all duration-300 cursor-pointer ${
                activeSegment === index ? 'opacity-90 transform scale-105 origin-center' : 'opacity-80'
              }`}
              onMouseEnter={() => setActiveSegment(index)}
              onMouseLeave={() => setActiveSegment(null)}
              style={{
                filter: activeSegment === index ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                transformOrigin: '50% 50%',
                transform: activeSegment === index ? `scale(1.05)` : 'scale(1)',
                // Adding animation with a different delay for each segment
                animation: `fade-in 0.6s ease-out ${index * 0.2}s both`
              }}
            />
          );
        })}
        
        {/* Center content */}
        <g>
          <circle cx="50" cy="50" r="22" fill="white" />
          <text 
            x="50" 
            y="46" 
            textAnchor="middle" 
            fontSize="5" 
            fill="#64748b"
            className="font-medium"
          >
            Total hours
          </text>
          <text 
            x="50" 
            y="55" 
            textAnchor="middle" 
            fontSize="8" 
            fill="#6366f1"
            className="font-bold"
          >
            12h
          </text>
        </g>
      </svg>
      
      {/* Interactive Legend */}
      <div className="absolute bottom-0 flex flex-wrap justify-center w-full gap-3 text-sm">
        {data.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center cursor-pointer transition-all duration-200 ${
              activeSegment === index ? 'transform scale-110' : ''
            }`}
            onMouseEnter={() => setActiveSegment(index)}
            onMouseLeave={() => setActiveSegment(null)}
          >
            <div className={`w-3 h-3 ${item.color} rounded-full mr-2 transition-transform`}></div>
            <span className={`${activeSegment === index ? 'font-medium' : ''}`}>
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Interactive Line Chart with gradient
const EnhancedLineChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const data = [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 60 },
    { month: 'Apr', value: 40 },
    { month: 'May', value: 70 },
    { month: 'Jun', value: 50 },
    { month: 'Jul', value: 80 }
  ];
  
  // Convert data points to SVG coordinates
  const points = data.map((point, i) => {
    const x = (300 / (data.length - 1)) * i;
    const y = 100 - point.value;
    return { x, y, ...point };
  });
  
  // Create SVG path from points
  const linePath = points.map((point, i) => 
    (i === 0 ? 'M' : 'L') + `${point.x},${point.y}`
  ).join(' ');
  
  // Create area path for gradient fill
  const areaPath = linePath + ` L${points[points.length-1].x},100 L${points[0].x},100 Z`;
  
  return (
    <div className="h-64 relative flex items-center p-4">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val) => (
          <line 
            key={val} 
            x1="0" 
            y1={val} 
            x2="300" 
            y2={val} 
            stroke={val === 0 ? "#94a3b8" : "#e2e8f0"} 
            strokeWidth={val === 0 ? "2" : "1"} 
          />
        ))}
        
        {/* Month grid lines */}
        {points.map((point) => (
          <line
            key={`grid-${point.x}`}
            x1={point.x}
            y1="0"
            x2={point.x}
            y2="100"
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
        ))}
        
        {/* Area gradient */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Fill area under line */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
          className="transition-opacity duration-300"
        />
        
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500"
          style={{ animation: 'draw-line 1.5s ease-out forwards' }}
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <g 
            key={i} 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === i ? "6" : "4"}
              fill={hoveredPoint === i ? "#4f46e5" : "#ffffff"}
              stroke="#4f46e5"
              strokeWidth="2"
              className="transition-all duration-200"
            />
            
            {hoveredPoint === i && (
              <g>
                <rect
                  x={point.x - 25}
                  y={point.y - 35}
                  width="50"
                  height="25"
                  fill="#1e293b"
                  rx="4"
                  className="animate-fade-in"
                />
                <text
                  x={point.x}
                  y={point.y - 17}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  className="animate-fade-in"
                >
                  {point.month}: {point.value}%
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
      
      {/* Y-axis labels */}
      <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-secondary-500 py-4">
        <span>100%</span>
        <span>75%</span>
        <span>50%</span>
        <span>25%</span>
        <span>0%</span>
      </div>
    </div>
  );
};

// Heat Map Calendar
const HeatMapCalendar = () => {
  const weeks = Array.from({length: 5}, () => 
    Array.from({length: 7}, () => Math.floor(Math.random() * 5))
  );
  
  const getColorClass = (intensity: number) => {
    const colorClasses = [
      'bg-secondary-100',
      'bg-primary-100',
      'bg-primary-200',
      'bg-primary-300',
      'bg-primary-500'
    ];
    return colorClasses[intensity];
  };
  
  return (
    <div className="p-4">
      <div className="flex mb-2 text-xs text-secondary-600 ml-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="w-8 text-center">{day}</div>
        ))}
      </div>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex items-center mb-1">
          <div className="text-xs text-secondary-600 w-6">W{weekIndex + 1}</div>
          {week.map((day, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`w-8 h-8 rounded-sm mx-0.5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${getColorClass(day)}`}
              title={`${day * 20}% activity`}
            >
              <span className="text-xs">{weekIndex * 7 + dayIndex + 1}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-end mt-3 gap-2 items-center">
        <div className="text-xs text-secondary-600">Less</div>
        {[0, 1, 2, 3, 4].map((level) => (
          <div 
            key={level} 
            className={`w-4 h-4 ${getColorClass(level)}`}
          ></div>
        ))}
        <div className="text-xs text-secondary-600">More</div>
      </div>
    </div>
  );
};

// Content Engagement Chart
const ContentEngagementChart = () => {
  const contentData = [
    { name: "Landing Page", views: 2, clicks: 6, engagement: 85 },
    { name: "Dashboard UI", views: 8, clicks: 4, engagement: 68 },
    { name: "Mobile App", views: 7, clicks: 5, engagement: 92 },
    { name: "Brand Assets", views: 5, clicks: 2, engagement: 51 },
    { name: "Marketing", views: 4, clicks: 1, engagement: 39 },
  ];

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-secondary-200">
            <th className="px-6 py-4 text-left text-sm font-medium text-secondary-500">Content</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-secondary-500">Views</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-secondary-500">Actions</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-secondary-500">Engagement</th>
          </tr>
        </thead>
        <tbody>
          {contentData.map((content, i) => (
            <tr key={i} className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${content.engagement > 70 ? 'bg-emerald-100' : content.engagement > 50 ? 'bg-amber-100' : 'bg-red-100'}`}>
                    {content.engagement > 70 ? (
                      <FileText size={18} className="text-emerald-500" />
                    ) : content.engagement > 50 ? (
                      <Image size={18} className="text-amber-500" />
                    ) : (
                      <FileText size={18} className="text-red-500" />
                    )}
                  </div>
                  <span className="text-secondary-900 font-medium">{content.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Eye size={14} className="text-secondary-400 mr-2" />
                  <span>{content.views.toLocaleString()}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <MousePointer size={14} className="text-secondary-400 mr-2" />
                  <span>{content.clicks.toLocaleString()}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-full max-w-[150px] bg-secondary-200 rounded-full h-2 mr-2">
                    <div
                      className={`h-2 rounded-full ${
                        content.engagement > 70
                          ? 'bg-emerald-500'
                          : content.engagement > 50
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${content.engagement}%` }}
                    ></div>
                  </div>
                  <span className="text-secondary-600 w-8 text-right text-sm">
                    {content.engagement}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  return (
    <div className="animate-fade-in space-y-8">
      {/* Time Range Selector */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-secondary-900">Analytics Dashboard</h2>
          <div className="flex bg-secondary-100 rounded-lg p-1">
            <button 
              className={`px-3 py-1.5 text-sm transition-all ${timeRange === '24h' ? 'bg-white shadow-sm rounded-md text-secondary-800' : 'text-secondary-600'}`}
              onClick={() => setTimeRange('24h')}
            >
              24h
            </button>
            <button 
              className={`px-3 py-1.5 text-sm transition-all ${timeRange === '7d' ? 'bg-white shadow-sm rounded-md text-secondary-800' : 'text-secondary-600'}`}
              onClick={() => setTimeRange('7d')}
            >
              7d
            </button>
            <button 
              className={`px-3 py-1.5 text-sm transition-all ${timeRange === '30d' ? 'bg-white shadow-sm rounded-md text-secondary-800' : 'text-secondary-600'}`}
              onClick={() => setTimeRange('30d')}
            >
              30d
            </button>
            <button 
              className={`px-3 py-1.5 text-sm transition-all ${timeRange === '90d' ? 'bg-white shadow-sm rounded-md text-secondary-800' : 'text-secondary-600'}`}
              onClick={() => setTimeRange('90d')}
            >
              90d
            </button>
            <button 
              className={`px-3 py-1.5 text-sm transition-all ${timeRange === 'custom' ? 'bg-white shadow-sm rounded-md text-secondary-800' : 'text-secondary-600'}`}
              onClick={() => setTimeRange('custom')}
            >
              Custom
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard 
          title="Total Projects" 
          value="4" 
          change="+50% from last period" 
          icon={Target} 
          isPositive={true}
        />
        <StatCard 
          title="Active Users" 
          value="3" 
          change="+100% from last period" 
          icon={Users} 
          isPositive={true}
        />
        <StatCard 
          title="Tasks Completed" 
          value="12" 
          change="30.2% from last period" 
          icon={CheckCircle} 
          isPositive={true}
        />
        <StatCard 
          title="Average Time Spent" 
          value="2.4h" 
          change="+5.1% from last period" 
          icon={Clock} 
          isPositive={true}
        />
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Over Time */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-5 border-b border-secondary-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-secondary-900">Activity Over Time</h3>
              <p className="text-secondary-500 text-sm">Daily user engagement metrics</p>
            </div>
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Activity className="h-5 w-5 text-primary-600" />
            </div>
          </div>
          <EnhancedBarChart />
        </div>
        
        {/* Project Time Distribution */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-5 border-b border-secondary-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-secondary-900">Project Time Distribution</h3>
              <p className="text-secondary-500 text-sm">Hours spent by category</p>
            </div>
            <div className="p-2 bg-secondary-100 rounded-lg">
              <PieChartIcon className="h-5 w-5 text-primary-600" />
            </div>
          </div>
          <EnhancedDonutChart />
        </div>
        
        {/* Growth Trends */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-5 border-b border-secondary-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-secondary-900">Growth Trends</h3>
              <p className="text-secondary-500 text-sm">Monthly performance metrics</p>
            </div>
            <div className="p-2 bg-secondary-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary-600" />
            </div>
          </div>
          <EnhancedLineChart />
        </div>
        
        {/* Activity Calendar */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-5 border-b border-secondary-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-secondary-900">Activity Calendar</h3>
              <p className="text-secondary-500 text-sm">Daily contribution heatmap</p>
            </div>
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Calendar className="h-5 w-5 text-primary-600" />
            </div>
          </div>
          <HeatMapCalendar />
        </div>
      </div>
      
      {/* Content Engagement Analytics */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5 border-b border-secondary-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-secondary-900">Content Engagement</h3>
            <p className="text-secondary-500 text-sm">Performance analysis by content type</p>
          </div>
          <div className="p-2 bg-secondary-100 rounded-lg">
            <Zap className="h-5 w-5 text-primary-600" />
          </div>
        </div>
        <ContentEngagementChart />
      </div>

      <style>{`
        @keyframes grow-up {
          from { height: 0; }
          to { height: 100%; }
        }
        
        @keyframes grow-width {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes draw-line {
          0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Analytics;