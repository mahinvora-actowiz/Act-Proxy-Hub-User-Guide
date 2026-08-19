import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import { useDocsStore } from '../store/useDocsStore';
import { useTheme } from "../App";

// Product metadata for UI
const PRODUCT_META = {
    scrapedo: {
        title: 'Scrapedo Proxy Documentation',
        description: 'Explore all proxy gateway features and ready-to-use code examples.',
        searchPlaceholder: 'Search endpoints...',
        overviewRoute: '/scrapedo-overview'
    },
    scraper: {
        title: 'Scraper API Documentation',
        description: 'Headless browser rendering, JS execution, and structured data extraction guides.',
        searchPlaceholder: 'Search API methods...',
        overviewRoute: '/scraper-overview'
    }
};

const ProductOverview = () => {
    const location = useLocation();
    const [search, setSearch] = useState('');
    const { darkMode, setDarkMode } = useTheme();
    const navigate = useNavigate();

    const pathname = location.pathname;
    const validProduct = pathname.includes('scraper-overview') ? 'scraper' : 'scrapedo';
    const meta = PRODUCT_META[validProduct];

    const {
        scrapedoDocs,
        scraperDocs,
        scrapedoLoading,
        scraperLoading,
        scrapedoError,
        scraperError,
        fetchScrapedoDocs,
        fetchScraperDocs,
    } = useDocsStore();

    const docsData =
        validProduct === "scraper"
            ? scraperDocs
            : scrapedoDocs;

    const loading =
        validProduct === "scraper"
            ? scraperLoading
            : scrapedoLoading;

    const error =
        validProduct === "scraper"
            ? scraperError
            : scrapedoError;

    useEffect(() => {
        if (docsData.length > 0) return;

        if (validProduct === "scraper") {
            fetchScraperDocs();
        } else {
            fetchScrapedoDocs();
        }
    }, [validProduct]);

    // Filter results
    const filtered = useMemo(() => {
        if (!search.trim()) return docsData;
        const q = search.toLowerCase();
        return docsData.filter(item =>
            item.title?.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q) ||
            String(item.section)?.includes(q)
        );
    }, [docsData, search]);

    const handleNavigate = (section) => navigate(`/act-proxyhub/userguide/details/${validProduct}/${section}`);
    const handleToggleTheme = () => setDarkMode(prev => !prev);

    if (loading) {
        return (
            <Loader
                fullScreen
                size="large"
                text={`Loading ${validProduct} docs...`}
                darkMode={darkMode}
            />
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>

                    <button
                        onClick={() =>
                            validProduct === "scraper"
                                ? fetchScraperDocs()
                                : fetchScrapedoDocs()
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <div className=" mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-4">
                        {/* Left Side */}
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 bg-gray-800 rounded-lg cursor-pointer text-gray-200 hover:bg-gray-700"
                                onClick={() => navigate(`/act-proxyhub/userguide`)}
                                type="button"
                            >
                                <ArrowLeft size={16} />
                            </button>

                            <h1 className="text-3xl md:text-4xl font-bold">
                                {meta.title}
                            </h1>
                        </div>

                        {/* Theme Button */}
                        <button
                            onClick={handleToggleTheme}
                            className={`cursor-pointer px-3 py-2 rounded-lg text-xs font-medium transition-colors
            ${darkMode
                                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>

                    {/* Description */}
                    <p
                        className={`text-lg max-w-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                    >
                        {meta.description}
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                    <input
                        type="text"
                        placeholder={meta.searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm transition-all
                            ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-blue-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                </div>

                {/* Results Grid */}
                {filtered.length === 0 ? (
                    <div className={`text-center py-16 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <p>No Data Found</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((item) => (
                            <button
                                key={item.section}
                                onClick={() => handleNavigate(item.section)}
                                className={`cursor-pointer text-left p-5 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 group
                                    ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${item.method === 'GET'
                                        ? (darkMode ? 'bg-green-900/40 text-green-400 border-green-800' : 'bg-green-100 text-green-700 border-green-300')
                                        : (darkMode ? 'bg-blue-900/40 text-blue-400 border-blue-800' : 'bg-blue-100 text-blue-700 border-blue-300')}`}>
                                        {item.method}
                                    </span>
                                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>#{item.section}</span>
                                </div>
                                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-blue-800'}`}>{item.title}</h3>
                                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
                                <div className={`flex items-center text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                    Read details <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductOverview;