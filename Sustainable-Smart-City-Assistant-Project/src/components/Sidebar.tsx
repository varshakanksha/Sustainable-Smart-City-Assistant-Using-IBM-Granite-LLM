import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Leaf, 
  AlertTriangle, 
  Bot 
} from 'lucide-react';
import { ActiveModule } from '../App';

interface SidebarProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'City Health Dashboard', icon: LayoutDashboard },
  { id: 'policy', label: 'Policy Search', icon: FileText },
  { id: 'feedback', label: 'Citizen Feedback', icon: MessageSquare },
  { id: 'kpi', label: 'KPI Forecasting', icon: TrendingUp },
  { id: 'eco', label: 'Eco Tips Generator', icon: Leaf },
  { id: 'anomaly', label: 'Anomaly Detection', icon: AlertTriangle },
  { id: 'chat', label: 'Chat Assistant', icon: Bot },
];

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, isOpen }) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveModule(item.id as ActiveModule)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} />
              {isOpen && (
                <span className="font-medium text-sm truncate">{item.label}</span>
              )}
            </motion.button>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;