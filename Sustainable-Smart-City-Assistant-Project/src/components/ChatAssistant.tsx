import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Lightbulb, FileText, TrendingUp } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your Smart City Assistant powered by IBM Granite LLM. I can help you with sustainability questions, policy information, city planning insights, and environmental recommendations. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "How can my city reduce carbon emissions?",
    "What are the best practices for waste management?",
    "How to improve public transportation sustainability?",
    "What renewable energy options are available?",
    "How to increase citizen engagement in green initiatives?"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "carbon emissions": "To reduce carbon emissions, cities can implement several strategies:\n\n🌱 **Green Transportation**: Expand electric public transit, bike lanes, and EV charging infrastructure\n\n🏢 **Building Efficiency**: Mandate energy-efficient building codes and retrofit programs\n\n🌳 **Urban Forestry**: Increase tree coverage by 20% to absorb CO2 and reduce urban heat\n\n⚡ **Renewable Energy**: Transition to solar and wind power for municipal operations\n\n📊 **Data-Driven Monitoring**: Use IoT sensors to track emissions in real-time\n\nThese measures can reduce city emissions by 40-60% within 10 years.",
        
        "waste management": "Effective waste management strategies include:\n\n♻️ **Circular Economy**: Implement comprehensive recycling and composting programs\n\n🗂️ **Smart Collection**: Use IoT-enabled bins with fill-level sensors for optimized routes\n\n🏭 **Waste-to-Energy**: Convert non-recyclable waste into renewable energy\n\n📱 **Citizen Engagement**: Mobile apps for waste sorting education and pickup scheduling\n\n🎯 **Zero Waste Goals**: Target 90% waste diversion from landfills by 2030\n\nThese approaches can reduce waste costs by 30% while improving environmental outcomes.",
        
        "public transportation": "Sustainable public transportation improvements:\n\n🚌 **Electric Fleet**: Transition to electric buses and trains powered by renewable energy\n\n📱 **Smart Systems**: Real-time tracking, mobile payments, and route optimization\n\n🚇 **Integrated Networks**: Connect buses, trains, bikes, and walking paths seamlessly\n\n💰 **Affordable Access**: Subsidized fares for low-income residents\n\n🌍 **Carbon Neutral**: Achieve net-zero emissions for all public transit by 2030\n\nThese upgrades can increase ridership by 40% while reducing transportation emissions.",
        
        "renewable energy": "Renewable energy options for cities:\n\n☀️ **Solar Power**: Rooftop solar on municipal buildings and solar farms\n\n💨 **Wind Energy**: Urban wind turbines and offshore wind partnerships\n\n🔋 **Energy Storage**: Battery systems for grid stability and peak demand\n\n⚡ **Microgrids**: Localized energy networks for resilience\n\n🏠 **Community Solar**: Shared solar programs for residents without suitable rooftops\n\nCities can achieve 80% renewable energy within 15 years with proper planning.",
        
        "citizen engagement": "Strategies to increase citizen participation:\n\n📱 **Digital Platforms**: Mobile apps for reporting issues and tracking progress\n\n🎓 **Education Programs**: Workshops on sustainability and environmental awareness\n\n🏆 **Incentive Programs**: Rewards for eco-friendly behaviors and participation\n\n🤝 **Community Partnerships**: Collaborate with local organizations and schools\n\n📊 **Transparent Reporting**: Regular updates on city sustainability metrics\n\nThese approaches can increase citizen engagement by 60% and improve program success rates."
      };

      let response = "I understand you're asking about city sustainability. Here are some key insights:\n\n";
      
      // Find relevant response based on keywords
      const lowerInput = inputMessage.toLowerCase();
      for (const [keyword, content] of Object.entries(responses)) {
        if (lowerInput.includes(keyword)) {
          response = content;
          break;
        }
      }
      
      // Default response if no specific match
      if (response === "I understand you're asking about city sustainability. Here are some key insights:\n\n") {
        response = "I'd be happy to help with your smart city question! I can provide insights on:\n\n🌱 **Environmental Sustainability**: Carbon reduction, renewable energy, green infrastructure\n\n🏙️ **Urban Planning**: Smart transportation, efficient buildings, waste management\n\n👥 **Citizen Services**: Digital engagement, feedback systems, community programs\n\n📊 **Data & Analytics**: KPI monitoring, predictive modeling, anomaly detection\n\nCould you be more specific about what aspect you'd like to explore?";
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chat Assistant</h1>
          <p className="text-gray-600 mt-1">Powered by IBM Granite LLM for smart city insights</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-green-50 px-4 py-2 rounded-lg border border-blue-200">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 font-medium">AI Assistant Active</span>
        </div>
      </div>

      <div className="flex-1 flex space-x-6">
        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-green-500 to-blue-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg p-4 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-50 text-gray-900 border border-gray-200'
                  }`}>
                    <div className="whitespace-pre-line">{message.content}</div>
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex space-x-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about sustainability, policies, city planning..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="w-80 space-y-6">
          {/* Quick Questions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Quick Questions
            </h3>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Capabilities</h3>
            <div className="space-y-3">
              {[
                { icon: FileText, title: 'Policy Analysis', desc: 'Summarize and explain city policies' },
                { icon: TrendingUp, title: 'Data Insights', desc: 'Analyze KPIs and trends' },
                { icon: Lightbulb, title: 'Recommendations', desc: 'Suggest sustainability improvements' },
                { icon: Bot, title: 'Real-time Support', desc: '24/7 assistance for city staff' }
              ].map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{capability.title}</h4>
                      <p className="text-xs text-gray-600">{capability.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;