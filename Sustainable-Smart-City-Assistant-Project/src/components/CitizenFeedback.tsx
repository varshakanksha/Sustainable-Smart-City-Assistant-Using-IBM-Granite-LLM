import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, TrendingUp, Users, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CitizenFeedback: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const feedbackData = [
    { category: 'Transportation', positive: 85, negative: 15, total: 234 },
    { category: 'Environment', positive: 92, negative: 8, total: 189 },
    { category: 'Public Safety', positive: 78, negative: 22, total: 156 },
    { category: 'Infrastructure', positive: 71, negative: 29, total: 203 },
    { category: 'Healthcare', positive: 88, negative: 12, total: 167 },
  ];

  const sentimentData = [
    { name: 'Very Positive', value: 35, color: '#22c55e' },
    { name: 'Positive', value: 40, color: '#84cc16' },
    { name: 'Neutral', value: 15, color: '#f59e0b' },
    { name: 'Negative', value: 8, color: '#f97316' },
    { name: 'Very Negative', value: 2, color: '#ef4444' },
  ];

  const recentFeedback = [
    {
      id: 1,
      citizen: 'Sarah Johnson',
      category: 'Transportation',
      rating: 5,
      comment: 'The new bike lanes have made commuting so much safer and more enjoyable!',
      date: '2 hours ago',
      sentiment: 'positive'
    },
    {
      id: 2,
      citizen: 'Mike Chen',
      category: 'Environment',
      rating: 4,
      comment: 'Love the new recycling program, but pickup times could be more consistent.',
      date: '5 hours ago',
      sentiment: 'positive'
    },
    {
      id: 3,
      citizen: 'Emily Rodriguez',
      category: 'Public Safety',
      rating: 3,
      comment: 'Street lighting in downtown area needs improvement for evening safety.',
      date: '1 day ago',
      sentiment: 'neutral'
    },
    {
      id: 4,
      citizen: 'David Kim',
      category: 'Infrastructure',
      rating: 5,
      comment: 'The smart traffic system has significantly reduced congestion!',
      date: '1 day ago',
      sentiment: 'positive'
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Citizen Feedback Analysis</h1>
          <p className="text-gray-600 mt-1">AI-powered sentiment analysis and feedback insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="transportation">Transportation</option>
            <option value="environment">Environment</option>
            <option value="safety">Public Safety</option>
            <option value="infrastructure">Infrastructure</option>
          </select>
          
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Feedback', value: '1,249', change: '+12%', icon: MessageSquare, color: 'blue' },
          { title: 'Avg. Rating', value: '4.2', change: '+0.3', icon: Star, color: 'yellow' },
          { title: 'Response Rate', value: '89%', change: '+5%', icon: TrendingUp, color: 'green' },
          { title: 'Active Citizens', value: '856', change: '+18%', icon: Users, color: 'purple' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
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
        {/* Feedback by Category */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="positive" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="negative" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sentiment Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
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
          <div className="grid grid-cols-2 gap-2 mt-4">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          {recentFeedback.map((feedback) => (
            <div key={feedback.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{feedback.citizen}</h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{feedback.category}</span>
                    <span className={`text-xs px-2 py-1 rounded ${getSentimentColor(feedback.sentiment)}`}>
                      {feedback.sentiment}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{feedback.comment}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{feedback.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CitizenFeedback;