import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Upload, Eye, TrendingUp, MapPin, Clock, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const AnomalyDetection: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState('energy');
  const [detectionSensitivity, setDetectionSensitivity] = useState('medium');

  const energyData = [
    { time: '00:00', consumption: 1200, normal: 1180, anomaly: false },
    { time: '02:00', consumption: 1100, normal: 1120, anomaly: false },
    { time: '04:00', consumption: 1050, normal: 1080, anomaly: false },
    { time: '06:00', consumption: 1300, normal: 1250, anomaly: false },
    { time: '08:00', consumption: 1800, normal: 1600, anomaly: false },
    { time: '10:00', consumption: 2100, normal: 1900, anomaly: false },
    { time: '12:00', consumption: 3200, normal: 2000, anomaly: true }, // Anomaly
    { time: '14:00', consumption: 2800, normal: 2100, anomaly: true }, // Anomaly
    { time: '16:00', consumption: 2200, normal: 2000, anomaly: false },
    { time: '18:00', consumption: 2400, normal: 2200, anomaly: false },
    { time: '20:00', consumption: 2000, normal: 1900, anomaly: false },
    { time: '22:00', consumption: 1600, normal: 1500, anomaly: false },
  ];

  const anomalies = [
    {
      id: 1,
      type: 'Energy Spike',
      location: 'Sector 12',
      severity: 'High',
      value: '3,200 MWh',
      expected: '2,000 MWh',
      deviation: '+60%',
      timestamp: '2024-01-15 12:00',
      description: 'Unusual energy consumption spike detected in commercial district',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'Water Usage',
      location: 'Sector 7',
      severity: 'Medium',
      value: '850 ML',
      expected: '600 ML',
      deviation: '+42%',
      timestamp: '2024-01-15 08:30',
      description: 'Higher than normal water consumption in residential area',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'Waste Collection',
      location: 'Sector 3',
      severity: 'Low',
      value: '45 Tons',
      expected: '60 Tons',
      deviation: '-25%',
      timestamp: '2024-01-14 16:45',
      description: 'Lower waste generation than expected - possible collection issue',
      status: 'monitoring'
    },
    {
      id: 4,
      type: 'Air Quality',
      location: 'Downtown',
      severity: 'High',
      value: '85 AQI',
      expected: '45 AQI',
      deviation: '+89%',
      timestamp: '2024-01-14 14:20',
      description: 'Significant air quality degradation detected',
      status: 'investigating'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'investigating': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { title: 'Active Anomalies', value: '3', change: '+2', icon: AlertTriangle, color: 'red' },
    { title: 'Detection Accuracy', value: '94.2%', change: '+1.2%', icon: Eye, color: 'green' },
    { title: 'Avg Response Time', value: '12 min', change: '-3 min', icon: Clock, color: 'blue' },
    { title: 'Sectors Monitored', value: '24', change: '+2', icon: MapPin, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Anomaly Detection</h1>
          <p className="text-gray-600 mt-1">AI-powered monitoring for unusual patterns in city data</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="energy">Energy Consumption</option>
            <option value="water">Water Usage</option>
            <option value="waste">Waste Generation</option>
            <option value="air">Air Quality</option>
          </select>
          
          <select
            value={detectionSensitivity}
            onChange={(e) => setDetectionSensitivity(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="low">Low Sensitivity</option>
            <option value="medium">Medium Sensitivity</option>
            <option value="high">High Sensitivity</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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

      {/* Real-time Monitoring Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Anomaly Detection</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Anomaly</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Expected</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="normal" 
              stroke="#9ca3af" 
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="consumption" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={payload.anomaly ? 6 : 4}
                    fill={payload.anomaly ? "#ef4444" : "#3b82f6"}
                    stroke={payload.anomaly ? "#dc2626" : "#2563eb"}
                    strokeWidth={2}
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Anomaly List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Detected Anomalies</h3>
        
        <div className="space-y-4">
          {anomalies.map((anomaly, index) => (
            <motion.div
              key={anomaly.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{anomaly.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(anomaly.status)}`}>
                      {anomaly.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{anomaly.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <p className="font-medium">{anomaly.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Detected Value:</span>
                      <p className="font-medium text-red-600">{anomaly.value}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Expected:</span>
                      <p className="font-medium">{anomaly.expected}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Deviation:</span>
                      <p className="font-medium text-orange-600">{anomaly.deviation}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {anomaly.timestamp}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                    Investigate
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnomalyDetection;