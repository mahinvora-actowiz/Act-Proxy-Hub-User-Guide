import React from 'react';
import { ArrowLeft, AlertCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../App"; // Adjust path if necessary

const StatusCodesPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const statusCodes = [
    {
      code: 400,
      title: 'Bad Request',
      color: 'text-orange-500',
      bgColor: darkMode ? 'bg-orange-900/10 border-orange-800/50' : 'bg-orange-50/80 border-orange-200',
      messages: [
        'Invalid URL format',
        'Invalid target URL',
        'Invalid setCookies: <error>',
        'Invalid HTTP method',
        'invalid config: <json error>',
        'premium and ultra_premium cannot be used together',
        'unsupported proxyName: <name>'
      ]
    },
    {
      code: 401,
      title: 'Unauthorized',
      color: 'text-red-500',
      bgColor: darkMode ? 'bg-red-900/10 border-red-800/50' : 'bg-red-50/80 border-red-200',
      messages: [
        'Missing required header: api-key',
        'Invalid API key'
      ]
    },
    {
      code: 403,
      title: 'Forbidden',
      color: 'text-rose-600',
      bgColor: darkMode ? 'bg-rose-900/10 border-rose-800/50' : 'bg-rose-50/80 border-rose-200',
      messages: [
        "API key not authorized for proxy type '<proxyName>'",
        'API key is inactive'
      ]
    },
    {
      code: 429,
      title: 'Too Many Requests',
      color: 'text-yellow-500',
      bgColor: darkMode ? 'bg-yellow-900/10 border-yellow-800/50' : 'bg-yellow-50/80 border-yellow-200',
      messages: [
        'Server busy, please try again',
        'Quota exceeded'
      ]
    },
    {
      code: 500,
      title: 'Internal Server Error',
      color: 'text-purple-500',
      bgColor: darkMode ? 'bg-purple-900/10 border-purple-800/50' : 'bg-purple-50/80 border-purple-200',
      messages: [
        'Internal server error',
        'Proxy not configured. Contact support.',
        'Server misconfiguration: unknown proxy type'
      ]
    },
    {
      code: 502,
      title: 'Bad Gateway',
      color: 'text-gray-500',
      bgColor: darkMode ? 'bg-gray-700/30 border-gray-600/50' : 'bg-gray-100/80 border-gray-300',
      messages: [
        'Bad gateway',
        'Proxy error (Upstream returned 502, 503, or 504)'
      ]
    },
    {
      code: 504,
      title: 'Gateway Timeout',
      color: 'text-blue-500',
      bgColor: darkMode ? 'bg-blue-900/10 border-blue-800/50' : 'bg-blue-50/80 border-blue-200',
      messages: [
        'Upstream timeout'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Top Navigation / Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105
              ${darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm'}`}
          >
            <ArrowLeft size={16} /> Back to Overview
          </button>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">HTTP Status Codes</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive reference guide for all HTTP status codes and error messages returned by the Actowiz Proxy Hub.
          </p>
        </div>

        {/* Status Codes Masonry Layout (Eliminates vertical gaps) */}
        <div className="columns-1 md:columns-2 mb-12">
          {statusCodes.map((status) => (
            <div
              key={status.code}
              className={`rounded-2xl border p-6 transition-all hover:shadow-xl hover:-translate-y-1 mb-6 break-inside-avoid ${status.bgColor}`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-lg text-lg font-bold ${status.color} ${darkMode ? 'bg-black/30' : 'bg-white/80'} shadow-sm`}>
                    {status.code}
                  </span>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {status.title}
                  </h2>
                </div>
              </div>

              {/* Messages List */}
              <div className="space-y-3">
                {status.messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-colors
                      ${darkMode 
                        ? 'bg-black/20 border-white/5 hover:bg-black/30' 
                        : 'bg-white/70 border-black/5 hover:bg-white/90'}`}
                  >
                    <AlertCircle size={16} className={`mt-0.5 flex-shrink-0 ${status.color}`} />
                    <code className={`text-xs sm:text-sm font-mono break-all leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {msg}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Note Section */}
        <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-blue-900/10 border-blue-800/50 text-blue-300' : 'bg-blue-50/80 border-blue-200 text-blue-800'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-800/30' : 'bg-blue-100'}`}>
              <Info size={20} />
            </div>
            <h3 className="font-bold text-xl">Note on Upstream/Target Status Codes</h3>
          </div>
          <p className="text-sm sm:text-base leading-relaxed pl-11">
            If the request successfully reaches the upstream proxy provider and the target website without triggering a network error or a 5xx proxy failure, 
            the proxy server acts as a transparent tunnel. In this scenario, it will forward the exact HTTP status code (e.g., <code className={`px-1.5 py-0.5 rounded text-xs font-bold ${darkMode ? 'bg-blue-800/40 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>200 OK</code>, <code className={`px-1.5 py-0.5 rounded text-xs font-bold ${darkMode ? 'bg-blue-800/40 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>404 Not Found</code>) 
            and response body returned by the target website. The custom JSON error messages listed above are only generated for internal validation and network failures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusCodesPage;