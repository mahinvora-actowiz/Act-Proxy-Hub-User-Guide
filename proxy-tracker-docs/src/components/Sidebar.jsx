import { ArrowLeft, Search } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

export const Sidebar = ({
    items = [],
    activeSection,
    onSectionSelect,
    onToggleTheme,
    darkMode,
    onBack
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const PRODUCT_META = {
        scrapedo: {
            title: 'Scrapedo'
        },
        scraper: {
            title: 'Scraper API'
        }
    };

    const pathname = location.pathname;
    const validProduct = pathname.includes('scraper') ? 'scraper' : 'scrapedo';
    const meta = PRODUCT_META[validProduct];

    const filteredItems = (items || []).filter((item) => {
        const fullText = `${item.section}. ${item.title}`.toLowerCase();
        return fullText.includes(searchQuery.toLowerCase());
    });

    return (
        <aside className={`w-64 border-r ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} flex flex-col`}>

            {/* Logo + Back */}
            <div className={`p-5 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <button
                        className="p-2 bg-gray-800 rounded-lg cursor-pointer text-gray-200 hover:bg-gray-700"
                        onClick={onBack}
                        type="button"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <h1 className="font-bold text-sm">{meta.title}</h1>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>API Docs</p>
                    </div>
                </div>
            </div>
            
            {/* Search Bar */}
            <div className={`p-3 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="relative">
                    <Search
                        size={16} 
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} 
                    />
                    <input
                        type="text"
                        placeholder="Search endpoints..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm transition-all outline-none
                            ${darkMode 
                                ? 'bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                                : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            }`}
                    />
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 p-3 overflow-y-auto">
                {/* <p className={`text-xs font-semibold uppercase tracking-wider mb-2 px-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Endpoints
                </p> */}
                <ul className="space-y-1">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => {
                            const isActive = activeSection === item.section;
                            const fullText = `${item.section}. ${item.title}`;

                            return (
                                <li key={item.section}>
                                    <button
                                        onClick={() => onSectionSelect(item.section)}
                                        title={fullText}
                                        className={`cursor-pointer w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                                            ${isActive
                                                ? `${darkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-600/20 text-gray-800'} border-l-2 ${darkMode ? 'border-blue-500' : 'border-gray-800'}`
                                                : `${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800 border-l-2 border-transparent' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-l-2 border-transparent'}`
                                            }`}
                                    >
                                        <ChevronRight size={12} className="flex-shrink-0" style={{ visibility: isActive ? 'visible' : 'hidden' }} />
                                        <span className="truncate" title={fullText}>
                                            {fullText}
                                        </span>
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <li className={`px-3 py-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            No results found
                        </li>
                    )}
                </ul>
            </nav>

            {/* Theme Toggle */}
            <div className={`p-3 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <button
                    onClick={onToggleTheme}
                    className={`cursor-pointer w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors
                        ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>
        </aside>
    );
};