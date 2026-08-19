import React from 'react';

export const ParameterTable = ({ activeMode, params, darkMode = true }) => {
    if (!params || Object.keys(params).length === 0) return null;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`text-left py-2 px-3 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Parameter</th>
                        <th className={`text-left py-2 px-3 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Value</th>
                        <th className={`text-left py-2 px-3 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(params).map(([key, value]) => (
                        <tr key={key} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                            <td className="py-2 px-3">
                                <code className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                                    {key}
                                </code>
                            </td>
                            <td className={`py-2 px-3 font-mono text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </td>
                            <td className="py-2 px-3">
                                <span className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                                    {typeof value}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {(activeMode == "apiMode")&&(
                        <tr key={"mode"} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                            <td className="py-2 px-3">
                                <code className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                                    mode
                                </code>
                            </td>
                            <td className={`py-2 px-3 font-mono text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                               api
                            </td>
                            <td className="py-2 px-3">
                                <span className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                                    string
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};