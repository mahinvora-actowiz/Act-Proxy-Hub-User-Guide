import { ArrowRight, Code, Globe, Search, AlertCircle } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../App";

const DocsOverview = () => {
  const [search, setSearch] = useState('');
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const products = [
    {
      id: 'proxy',
      title: 'Scrapedo Proxy',
      description: 'Enterprise-grade residential & datacenter proxy network with high success rates, geo-targeting, and session control.',
      route: '/act-proxyhub/userguide/details/scrapedo/1',
      icon: Globe
    },
    {
      id: 'scraper',
      title: 'Scraper API',
      description: 'Headless browser rendering, JS execution, automatic CAPTCHA solving, and structured data extraction for complex sites.',
      route: '/act-proxyhub/userguide/details/scraper/1',
      icon: Code
    }
  ];

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [search]);

  const handleNavigate = (route) => navigate(route);
  const handleToggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="mx-auto p-6 w-full flex-1 flex flex-col">
        
        {/* 1. Top Row: Header, Search, and Theme Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold flex-shrink-0">
            Proxy Hub Guidelines
          </h1>

          {/* Search Bar */}
          <div className="relative flex-1 w-full space-x-2">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
            <input
              type="text"
              placeholder="Search products or documentation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-12 pr-4 py-2.5 rounded-xl border text-sm transition-all
                ${darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-blue-500' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

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

        {/* 3. Main Content Wrapper (Pushes bottom card down) */}
        <div className="flex-1 flex flex-col">
          
          {/* Grid */}
          {filtered.length === 0 ? (
            <div className={`text-center py-16 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <p>No products found for "{search}"</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((product) => {
                const Icon = product.icon;
                return (
                  <button
                    key={product.id}
                    onClick={() => handleNavigate(product.route)}
                    className={`cursor-pointer text-left p-5 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 group
                      ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                  >
                    <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-blue-800'}`}>
                      {product.title}
                    </h3>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.description}
                    </p>
                    <div className={`flex items-center text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      Read details <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* 4. Status Code Reference Card (Fixed to the bottom) */}
          <div className="mt-auto pt-10">
            <button
              onClick={() => handleNavigate('/act-proxyhub/userguide/status-codes')}
              className={`w-full cursor-pointer text-left p-6 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 group flex items-center justify-between
                ${darkMode 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-800 border-gray-700 hover:border-blue-500/50' 
                  : 'bg-gradient-to-r from-white to-blue-50 border-gray-200 hover:border-blue-300'}`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <AlertCircle size={28} />
                </div>
                <div>
                  <h3 className={`font-semibold text-xl ${darkMode ? 'text-white' : 'text-blue-800'}`}>
                    HTTP Status Codes Reference
                  </h3>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    View a comprehensive list of all HTTP status codes, error messages, and troubleshooting details returned by the proxy server.
                  </p>
                </div>
              </div>
              <ArrowRight size={24} className={`group-hover:translate-x-2 transition-transform flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DocsOverview;