import { ArrowRight, Globe, Search, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../App";

const DocsOverview = () => {
  const [search, setSearch] = useState('');
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = (route) => navigate(route);
  const handleToggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mx-auto p-6 w-full flex-1 flex flex-col">
        
        {/* 1. Top Row: Header, Search, and Theme Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold flex-shrink-0">
            Actowiz Proxy Hub
          </h1>

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className={`flex-shrink-0 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border
              ${darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700'
                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
              }`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* 2. Description */}
        <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Learn how to integrate, configure, and use Actowiz Proxy Hub services for web scraping, data collection, automation, and API access. Find setup guides, authentication details, code examples, and best practices in one place.
        </p>

        {/* 3. Main Content Wrapper */}
        <div className="flex-1 flex flex-col">
          
          {/* Single Unified Documentation Card */}
          <button
            onClick={() => handleNavigate('/act-proxyhub/userguide/details/1')}
            className={`cursor-pointer text-left p-8 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1 group mb-8
              ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:border-blue-300'}`}
          >
            <div className="flex items-start gap-5">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <Globe size={32} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-2xl mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Proxy Hub User Guide
                </h3>
                <p className={`text-base mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Enterprise-grade residential & datacenter proxy network with high success rates, geo-targeting, session control, and advanced data extraction capabilities. Access comprehensive guides, API references, and code examples.
                </p>
                <div className={`flex items-center text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Read the documentation <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>

          {/* 4. Status Code Reference Card */}
          <button
            onClick={() => handleNavigate('/act-proxyhub/userguide/status-codes')}
            className={`w-full cursor-pointer text-left p-6 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 group flex items-center justify-between
              ${darkMode 
                ? 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50' 
                : 'bg-white border-gray-200 hover:border-purple-300'}`}
          >
            <div className="flex items-center gap-5">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                <AlertCircle size={28} />
              </div>
              <div>
                <h3 className={`font-semibold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  HTTP Status Codes Reference
                </h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  View a comprehensive list of all HTTP status codes, error messages, and troubleshooting details returned by the proxy server.
                </p>
              </div>
            </div>
            <ArrowRight size={24} className={`group-hover:translate-x-2 transition-transform flex-shrink-0 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default DocsOverview;