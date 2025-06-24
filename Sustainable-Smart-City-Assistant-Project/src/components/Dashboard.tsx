import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Zap, 
  Droplets, 
  TreePine, 
  TrendingUp, 
  TrendingDown,
  Activity,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const kpiData = [
    { name: 'Jan', energy: 2400, water: 1800, waste: 1200, air: 85 },
    { name: 'Feb', energy: 2200, water: 1700, waste: 1100, air: 88 },
    { name: 'Mar', energy: 2600, water: 1900, waste: 1300, air: 82 },
    { name: 'Apr', energy: 2300, water: 1600, waste: 1000, air: 90 },
    { name: 'May', energy: 2100, water: 1500, waste: 950, air: 92 },
    { name: 'Jun', energy: 2000, water: 1400, waste: 900, air: 94 },
  ];

  const pieData = [
    { name: 'Renewable', value: 65, color: '#22c55e' },
    { name: 'Natural Gas', value: 25, color: '#f59e0b' },
    { name: 'Coal', value: 10, color: '#ef4444' },
  ];

  const stats = [
    {
      title: 'Population',
      value: '2.4M',
      change: '+2.3%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Energy Efficiency',
      value: '94%',
      change: '+5.2%',
      trend: 'up',
      icon: Zap,
      color: 'yellow'
    },
    {
      title: 'Water Conservation',
      value: '87%',
      change: '+3.1%',
      trend: 'up',
      icon: Droplets,
      color: 'blue'
    },
    {
      title: 'Green Coverage',
      value: '42%',
      change: '+1.8%',
      trend: 'up',
      icon: TreePine,
      color: 'green'
    }
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'High energy consumption detected in Sector 12', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New policy document uploaded for review', time: '4 hours ago' },
    { id: 3, type: 'success', message: 'Water quality improved by 15% this month', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">City Health Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time insights into your smart city's sustainability metrics</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
          <Activity className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">All Systems Operational</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center space-x-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy & Water Consumption */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Consumption Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="energy" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="water" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Energy Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Sources Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alerts & Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts & Activity</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
              <AlertCircle className={`w-5 h-5 mt-0.5 ${
                alert.type === 'warning' ? 'text-amber-500' :
                alert.type === 'success' ? 'text-green-500' : 'text-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{alert.message}</p>
                <p className="text-gray-500 text-sm mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;