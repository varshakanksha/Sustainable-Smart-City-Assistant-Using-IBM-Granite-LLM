import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Search, Lightbulb, Recycle, Droplets, Zap, Car, Home, Sparkles } from 'lucide-react';

const EcoTips: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTips, setGeneratedTips] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Categories', icon: Leaf },
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'water', label: 'Water', icon: Droplets },
    { id: 'waste', label: 'Waste', icon: Recycle },
    { id: 'transport', label: 'Transport', icon: Car },
    { id: 'home', label: 'Home', icon: Home },
  ];

  const predefinedTips = [
    {
      category: 'energy',
      title: 'Smart Thermostat Usage',
      tip: 'Set your thermostat 7-10 degrees lower when away from home to save up to 10% on heating and cooling costs.',
      impact: 'Saves 15% energy',
      difficulty: 'Easy'
    },
    {
      category: 'water',
      title: 'Rainwater Harvesting',
      tip: 'Install rain barrels to collect water for garden irrigation. A 1-inch rainfall on a 1,000 sq ft roof yields about 600 gallons.',
      impact: 'Saves 40% water',
      difficulty: 'Medium'
    },
    {
      category: 'waste',
      title: 'Composting Kitchen Scraps',
      tip: 'Start composting fruit and vegetable scraps to reduce household waste by 30% and create nutrient-rich soil.',
      impact: 'Reduces 30% waste',
      difficulty: 'Easy'
    },
    {
      category: 'transport',
      title: 'Bike Commuting',
      tip: 'Replace short car trips (under 3 miles) with cycling. This can reduce your carbon footprint by 2,400 lbs of CO2 annually.',
      impact: 'Saves 2.4 tons CO2',
      difficulty: 'Medium'
    },
    {
      category: 'home',
      title: 'LED Light Conversion',
      tip: 'Replace incandescent bulbs with LED lights. LEDs use 75% less energy and last 25 times longer.',
      impact: 'Saves 75% energy',
      difficulty: 'Easy'
    },
    {
      category: 'energy',
      title: 'Solar Panel Installation',
      tip: 'Consider installing solar panels. A typical home system can offset 80% of electricity usage and pay for itself in 6-8 years.',
      impact: 'Saves 80% electricity',
      difficulty: 'Hard'
    }
  ];

  const handleGenerateTips = async () => {
    if (!searchKeyword.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const aiTips = [
        `Switch to ${searchKeyword}-efficient appliances to reduce energy consumption by up to 30%.`,
        `Create a ${searchKeyword} monitoring system to track and optimize your usage patterns.`,
        `Join community ${searchKeyword} initiatives to amplify your environmental impact.`,
        `Educate others about ${searchKeyword} sustainability practices to create a ripple effect.`,
        `Invest in ${searchKeyword}-friendly alternatives that align with your lifestyle and budget.`
      ];
      
      setGeneratedTips(aiTips);
      setIsGenerating(false);
    }, 2000);
  };

  const filteredTips = predefinedTips.filter(tip => 
    (selectedCategory === 'all' || tip.category === selectedCategory) &&
    (searchKeyword === '' || tip.title.toLowerCase().includes(searchKeyword.toLowerCase()) || 
     tip.tip.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Eco Tips Generator</h1>
        <p className="text-gray-600 mt-1">AI-powered personalized sustainability recommendations</p>
      </div>

      {/* Search and Generate Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-green-600" />
          Generate Custom Eco Tips
        </h3>
        
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter keyword (e.g., plastic, solar, recycling)..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateTips()}
            />
          </div>
          
          <button
            onClick={handleGenerateTips}
            disabled={!searchKeyword.trim() || isGenerating}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 mr-2" />
                Generate Tips
              </>
            )}
          </button>
        </div>

        {/* Generated Tips */}
        {generatedTips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-3"
          >
            <h4 className="font-semibold text-gray-900">AI-Generated Tips for "{searchKeyword}":</h4>
            {generatedTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-white rounded-lg border border-green-200 flex items-start space-x-3"
              >
                <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{tip}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip, index) => {
          const categoryInfo = categories.find(cat => cat.id === tip.category);
          const Icon = categoryInfo?.icon || Leaf;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                    <span className="text-xs text-gray-500 capitalize">{tip.category}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                  {tip.difficulty}
                </span>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{tip.tip}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">{tip.impact}</span>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Learn More →
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tips found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default EcoTips;