import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, TrendingUp, Calendar, BarChart3, Download, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const KPIForecasting: React.FC = () => {
  const [selectedKPI, setSelectedKPI] = useState('energy');
  const [forecastPeriod, setForecastPeriod] = useState('12');
  const [isForecasting, setIsForecasting] = useState(false);

  const historicalData = [
    { month: 'Jan 2023', energy: 2400, water: 1800, waste: 1200, transport: 3200 },
    { month: 'Feb 2023', energy: 2200, water: 1700, waste: 1100, transport: 3100 },
    { month: 'Mar 2023', energy: 2600, water: 1900, waste: 1300, transport: 3400 },
    { month: 'Apr 2023', energy: 2300, water: 1600, waste: 1000, transport: 3000 },
    { month: 'May 2023', energy: 2100, water: 1500, waste: 950, transport: 2900 },
    { month: 'Jun 2023', energy: 2000, water: 1400, waste: 900, transport: 2800 },
    { month: 'Jul 2023', energy: 1950, water: 1350, waste: 850, transport: 2750 },
    { month: 'Aug 2023', energy: 1900, water: 1300, waste: 800, transport: 2700 },
    { month: 'Sep 2023', energy: 1850, water: 1250, waste: 750, transport: 2650 },
    { month: 'Oct 2023', energy: 1800, water: 1200, waste: 700, transport: 2600 },
    { month: 'Nov 2023', energy: 1750, water: 1150, waste: 650, transport: 2550 },
    { month: 'Dec 2023', energy: 1700, water: 1100, waste: 600, transport: 2500 },
  ];

  const forecastData = [
    ...historicalData,
    { month: 'Jan 2024', energy: 1650, water: 1050, waste: 550, transport: 2450, forecast: true },
    { month: 'Feb 2024', energy: 1600, water: 1000, waste: 500, transport: 2400, forecast: true },
    { month: 'Mar 2024', energy: 1550, water: 950, waste: 450, transport: 2350, forecast: true },
    { month: 'Apr 2024', energy: 1500, water: 900, waste: 400, transport: 2300, forecast: true },
    { month: 'May 2024', energy: 1450, water: 850, waste: 350, transport: 2250, forecast: true },
    { month: 'Jun 2024', energy: 1400, water: 800, waste: 300, transport: 2200, forecast: true },
  ];

  const kpiOptions = [
    { value: 'energy', label: 'Energy Consumption', unit: 'MWh', color: '#0ea5e9' },
    { value: 'water', label: 'Water Usage', unit: 'ML', color: '#22c55e' },
    { value: 'waste', label: 'Waste Generation', unit: 'Tons', color: '#f59e0b' },
    { value: 'transport', label: 'Transport Emissions', unit: 'CO2 Tons', color: '#8b5cf6' },
  ];

  const currentKPI = kpiOptions.find(kpi => kpi.value === selectedKPI)!;

  const handleForecast = () => {
    setIsForecasting(true);
    setTimeout(() => {
      setIsForecasting(false);
    }, 2000);
  };

  const insights = [
    {
      title: 'Trend Analysis',
      description: 'Energy consumption shows a consistent 3.2% monthly decrease due to efficiency improvements.',
      type: 'positive'
    },
    {
      title: 'Seasonal Pattern',
      description: 'Water usage typically increases by 15% during summer months (Jun-Aug).',
      type: 'info'
    },
    {
      title: 'Forecast Confidence',
      description: 'Model accuracy: 94.2% based on 24 months of historical data.',
      type: 'success'
    },
    {
      title: 'Anomaly Alert',
      description: 'Waste generation spike detected in March - investigate recycling program impact.',
      type: 'warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KPI Forecasting</h1>
          <p className="text-gray-600 mt-1">AI-powered predictions for city sustainability metrics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedKPI}
            onChange={(e) => setSelectedKPI(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {kpiOptions.map(kpi => (
              <option key={kpi.value} value={kpi.value}>{kpi.label}</option>
            ))}
          </select>
          
          <select
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
            <option value="24">24 Months</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiOptions.map((kpi, index) => {
          const currentValue = historicalData[historicalData.length - 1][kpi.value as keyof typeof historicalData[0]];
          const previousValue = historicalData[historicalData.length - 2][kpi.value as keyof typeof historicalData[0]];
          const change = ((Number(currentValue) - Number(previousValue)) / Number(previousValue) * 100).toFixed(1);
          
          return (
            <motion.div
              key={kpi.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all cursor-pointer ${
                selectedKPI === kpi.value ? 'border-primary-300 bg-primary-50' : 'border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => setSelectedKPI(kpi.value)}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${kpi.color}20` }}>
                  <BarChart3 className="w-6 h-6" style={{ color: kpi.color }} />
                </div>
                <span className={`text-sm font-medium ${
                  Number(change) < 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change}%
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{currentValue}</h3>
                <p className="text-gray-600 text-sm">{kpi.label}</p>
                <p className="text-xs text-gray-500">{kpi.unit}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentKPI.label} - Historical Data & Forecast
          </h3>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleForecast}
              disabled={isForecasting}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-green-600 text-white rounded-lg hover:from-primary-700 hover:to-green-700 transition-all disabled:opacity-50"
            >
              {isForecasting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Forecast
                </>
              )}
            </button>
            
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentKPI.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={currentKPI.color} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey={selectedKPI}
              stroke={currentKPI.color}
              fillOpacity={1}
              fill="url(#colorHistorical)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentKPI.color }}></div>
            <span className="text-sm text-gray-600">Historical Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-gray-600">Forecast</span>
          </div>
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'positive' ? 'border-green-500 bg-green-50' :
                insight.type === 'warning' ? 'border-amber-500 bg-amber-50' :
                insight.type === 'success' ? 'border-blue-500 bg-blue-50' :
                'border-gray-500 bg-gray-50'
              }`}
            >
              <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
              <p className="text-sm text-gray-700">{insight.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default KPIForecasting;