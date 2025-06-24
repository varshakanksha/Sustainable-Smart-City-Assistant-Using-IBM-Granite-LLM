import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PolicySearch from './components/PolicySearch';
import CitizenFeedback from './components/CitizenFeedback';
import KPIForecasting from './components/KPIForecasting';
import EcoTips from './components/EcoTips';
import AnomalyDetection from './components/AnomalyDetection';
import ChatAssistant from './components/ChatAssistant';

export type ActiveModule = 'dashboard' | 'policy' | 'feedback' | 'kpi' | 'eco' | 'anomaly' | 'chat';

function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'policy':
        return <PolicySearch />;
      case 'feedback':
        return <CitizenFeedback />;
      case 'kpi':
        return <KPIForecasting />;
      case 'eco':
        return <EcoTips />;
      case 'anomaly':
        return <AnomalyDetection />;
      case 'chat':
        return <ChatAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        } pt-16`}>
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {renderActiveModule()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;