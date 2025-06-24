import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, FileText, Download, Sparkles } from 'lucide-react';

const PolicySearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSummarize = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setSummary(`
        **Policy Summary: ${selectedFile.name}**
        
        **Key Points:**
        • This policy establishes new guidelines for sustainable urban development
        • Mandates 30% green space requirement for new residential projects
        • Introduces carbon offset requirements for commercial buildings
        • Sets renewable energy targets of 80% by 2030
        
        **Citizen Impact:**
        • Improved air quality in residential areas
        • Enhanced public transportation infrastructure
        • New green job opportunities in renewable energy sector
        • Reduced utility costs through energy efficiency programs
        
        **Implementation Timeline:**
        • Phase 1: Q1 2024 - Policy framework establishment
        • Phase 2: Q3 2024 - Pilot program launch
        • Phase 3: Q1 2025 - Full implementation
      `);
      setIsProcessing(false);
    }, 2000);
  };

  const searchResults = [
    {
      title: 'Sustainable Transportation Policy 2024',
      type: 'Transportation',
      date: '2024-01-15',
      relevance: 95,
      summary: 'Comprehensive policy for electric vehicle adoption and public transit expansion.'
    },
    {
      title: 'Green Building Standards Amendment',
      type: 'Construction',
      date: '2024-01-10',
      relevance: 88,
      summary: 'Updated requirements for energy-efficient building construction and renovation.'
    },
    {
      title: 'Waste Management Optimization Plan',
      type: 'Environment',
      date: '2024-01-05',
      relevance: 82,
      summary: 'Strategic plan for reducing waste and improving recycling infrastructure.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Policy Search & Summarization</h1>
        <p className="text-gray-600 mt-1">Search existing policies or upload documents for AI-powered summarization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Policies</h3>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search policies by keyword, topic, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{result.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{result.summary}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">{result.type}</span>
                      <span className="text-xs text-gray-500">{result.date}</span>
                      <span className="text-xs text-green-600 font-medium">{result.relevance}% match</span>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 hover:text-primary-600 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Document Upload & Summarization */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Summarization</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Policy Document
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Drop your file here or click to browse</p>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 mr-2" />
                Choose File
              </label>
            </div>
            
            {selectedFile && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Selected:</strong> {selectedFile.name}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleSummarize}
            disabled={!selectedFile || isProcessing}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary-600 to-green-600 text-white rounded-lg hover:from-primary-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing with IBM Granite LLM...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Summary
              </>
            )}
          </button>

          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-green-50 rounded-lg border border-primary-200"
            >
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-primary-600" />
                AI-Generated Summary
              </h4>
              <div className="text-sm text-gray-700 whitespace-pre-line">{summary}</div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PolicySearch;