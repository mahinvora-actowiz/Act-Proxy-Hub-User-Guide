import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CodeBlock } from '../components/CodeBlock';
import Loader from '../components/Loader';
import { ParameterTable } from '../components/ParameterTable';
import { Sidebar } from '../components/Sidebar';
import { useDocsStore } from '../store/useDocsStore';
import { useTheme } from '../App';

const ProxyDocs = () => {
    const { product, id } = useParams();
    const navigate = useNavigate();

    const { darkMode, setDarkMode } = useTheme();

    const sectionId = parseInt(id, 10);
    const [activeTab, setActiveTab] = useState('curl');
     const [mode, setMode] = useState('proxyMode');

    const validProduct =
        product === 'scraper'
            ? 'scraper'
            : 'scrapedo';

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
        validProduct === 'scraper'
            ? scraperDocs
            : scrapedoDocs;

    const loading =
        validProduct === 'scraper'
            ? scraperLoading
            : scrapedoLoading;

    const error =
        validProduct === 'scraper'
            ? scraperError
            : scrapedoError;

    useEffect(() => {
        if (docsData.length > 0) return;

        if (validProduct === 'scraper') {
            fetchScraperDocs();
        } else {
            fetchScrapedoDocs();
        }
    }, [validProduct]);

    const content = docsData.find(
        (item) => item.section === sectionId
    );

    useEffect(() => {
        if (!loading && docsData.length > 0 && !content) {
            navigate(`/${validProduct}-overview`);
        }
    }, [loading, docsData, content]);

    const handleToggleTheme = () =>
        setDarkMode(prev => !prev);

    // LOADING
    if (loading) {
        return (
            <Loader
                fullScreen
                size="large"
                text="Loading documentation..."
                darkMode={darkMode}
            />
        );
    }

    // ERROR
    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            validProduct === 'scraper'
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

    // NO DATA
    if (!content) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>No documentation found.</p>
            </div>
        );
    }

    return (
        <div className={`flex h-screen ${darkMode
            ? 'bg-gray-900 text-gray-100'
            : 'bg-gray-50 text-gray-900'
            }`}
        >
            <Sidebar
                items={docsData}
                activeSection={sectionId}
                onSectionSelect={(section) =>
                    navigate(`/act-proxyhub/userguide/details/${validProduct}/${section}`)
                }
                onToggleTheme={handleToggleTheme}
                darkMode={darkMode}
                onBack={() =>
                    navigate(`/act-proxyhub/userguide`)
                }
            />

            <main className="flex-1 overflow-y-auto p-6">
                <div className="">

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">
                            {content.title}
                        </h2>

                        <p className={`${darkMode
                            ? 'text-gray-400'
                            : 'text-gray-600'
                            }`}
                        >
                            {content.description}
                        </p>

                        {content.note && (
                            <div
                                className={`mt-4 rounded-lg border px-4 py-3 text-sm ${darkMode
                                    ? 'bg-red-900/20 border-red-800 text-red-300'
                                    : 'bg-red-50 border-red-200 text-red-800'
                                    }`}
                            >
                                <span className="font-semibold">Note:</span>{' '}
                                {content.note}
                            </div>
                        )}
                    </div>

                    {/* Method */}
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${content.method === 'GET'
                            ? (darkMode
                                ? 'bg-green-900/40 text-green-400 border-green-800'
                                : 'bg-green-100 text-green-700 border-green-300')
                            : (darkMode
                                ? 'bg-blue-900/40 text-blue-400 border-blue-800'
                                : 'bg-blue-100 text-blue-700 border-blue-300')
                            }`}
                    >
                        {content.method}
                    </span>

                    {/* Tabs */}
                    {/* <div className={`rounded-xl border ${darkMode
                        ? 'border-gray-800 bg-gray-800/40'
                        : 'border-gray-200 bg-white'
                        } mb-6 overflow-hidden`}
                    >
                        <div className={`flex gap-1 p-2 border-b ${darkMode
                            ? 'border-gray-800 bg-gray-900/30'
                            : 'border-gray-200 bg-gray-50'
                            }`}
                        >
                            {['curl', 'python'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setActiveTab(lang)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-medium uppercase transition-all
                                    ${activeTab === lang
                                            ? 'text-white bg-gray-800'
                                            : darkMode
                                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        <div className="p-4">
                            <CodeBlock
                                code={content.examples?.[activeTab]}
                                language={
                                    activeTab === 'curl'
                                        ? 'bash'
                                        : 'python'
                                }
                                darkMode={darkMode}
                            />
                        </div>
                    </div> */}
                       <div
                        className={`rounded-xl border ${darkMode
                            ? 'border-gray-800 bg-gray-800/40'
                            : 'border-gray-200 bg-white'
                            } mb-6 overflow-hidden`}
                    >
                        <div
                            className={`flex items-center justify-between p-2 border-b ${darkMode
                                ? 'border-gray-800 bg-gray-900/30'
                                : 'border-gray-200 bg-gray-50'
                                }`}
                        >

                            {/* Language Tabs */}
                            <div className="flex gap-1">
                                {['curl', 'python'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setActiveTab(lang)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-medium uppercase transition-all
                                        ${activeTab === lang
                                                ? 'text-white bg-gray-800'
                                                : darkMode
                                                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>

                            {(validProduct == "scrapedo") && (
                                <div className="flex items-center gap-3">

                                    <span
                                        className={`text-xs font-medium transition-colors ${mode === 'proxyMode'
                                            ? darkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-900'
                                            : darkMode
                                                ? 'text-gray-500'
                                                : 'text-gray-400'
                                            }`}
                                    >
                                        Proxy Mode
                                    </span>

                                    <button
                                        onClick={() =>
                                            setMode(prev =>
                                                prev === 'proxyMode'
                                                    ? 'apiMode'
                                                    : 'proxyMode'
                                            )
                                        }
                                        className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${mode === 'apiMode'
                                            ? 'bg-blue-600'
                                            : darkMode
                                                ? 'bg-gray-700'
                                                : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mode === 'apiMode'
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                                }`}
                                        />
                                    </button>

                                    <span
                                        className={`text-xs font-medium transition-colors ${mode === 'apiMode'
                                            ? darkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-900'
                                            : darkMode
                                                ? 'text-gray-500'
                                                : 'text-gray-400'
                                            }`}
                                    >
                                        API Mode
                                    </span>

                                </div>)}
                        </div>

                        <div className="p-4">
                            <CodeBlock
                                code={content.examples?.[mode]?.[activeTab]}
                                language={
                                    activeTab === 'curl'
                                        ? 'bash'
                                        : 'python'
                                }
                                darkMode={darkMode}
                            />
                        </div>
                    </div>

                    {/* Parameters */}
                    {content.parameters &&
                        Object.keys(content.parameters).length > 0 && (
                            <div className={`rounded-xl border ${darkMode
                                ? 'border-gray-800 bg-gray-800/30'
                                : 'border-gray-200 bg-white'
                                } p-4 mb-4`}
                            >
                                <h3 className="text-sm font-semibold mb-3">
                                    Request Parameters
                                </h3>

                                <ParameterTable
                                    activeMode={mode}
                                    params={content.parameters}
                                    darkMode={darkMode}
                                />
                            </div>
                        )}

                    {/* Base URL & Headers */}
                    <div className="mt-8 grid sm:grid-cols-2 gap-4">

                        {/* Base URL */}
                        <div
                            className={`rounded-xl border p-4 ${darkMode
                                ? 'border-gray-800 bg-gray-800/30'
                                : 'border-gray-200 bg-white'
                                }`}
                        >
                            <p
                                className={`text-xs font-medium uppercase tracking-wide mb-2 ${darkMode
                                    ? 'text-gray-400'
                                    : 'text-gray-500'
                                    }`}
                            >
                                Base URL
                            </p>

                            <code className="block text-sm bg-gray-900 text-gray-100 px-3 py-2 rounded-lg break-all">
                                http://15.235.85.189:9090/fetch
                            </code>
                        </div>

                        {/* Required Headers */}
                        <div
                            className={`rounded-xl border p-4 ${darkMode
                                ? 'border-gray-800 bg-gray-800/30'
                                : 'border-gray-200 bg-white'
                                }`}
                        >
                            <p
                                className={`text-xs font-medium uppercase tracking-wide mb-2 ${darkMode
                                    ? 'text-gray-400'
                                    : 'text-gray-500'
                                    }`}
                            >
                                Required Headers
                            </p>

                            <div className="space-y-2">
                                <code className="block text-sm bg-gray-900 text-gray-100 px-3 py-2 rounded-lg break-all">
                                   {
                                    validProduct === 'scrapedo'
                                   ? "scrapedo-key: your_scrapedo_key" : "scraper-api-key: your_scraper_    api_key" }
                                </code>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProxyDocs;