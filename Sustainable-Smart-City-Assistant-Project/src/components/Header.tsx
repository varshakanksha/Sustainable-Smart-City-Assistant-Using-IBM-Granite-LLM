import React from 'react';
import { Menu, Bell, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16"
    >
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Smart City Assistant</h1>
              <p className="text-xs text-gray-500">Powered by IBM Granite LLM</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">City Administrator</p>
              <p className="text-xs text-gray-500">admin@smartcity.gov</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;