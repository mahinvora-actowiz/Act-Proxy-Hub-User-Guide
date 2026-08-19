import React from 'react';
import { useTheme } from '../App';

export const Loader = ({
    fullScreen = false,
    size = 'medium',
    color = 'blue',
    text,
    darkMode
}) => {
    // Size mapping for Tailwind classes

    const sizeClasses = {
        small: 'w-5 h-5 border-2',
        medium: 'w-8 h-8 border-3',
        large: 'w-12 h-12 border-4'
    };

    console.log(darkMode)
    // Base container classes
    const containerClasses = fullScreen
        ? 'fixed inset-0 flex items-center justify-center z-50'
        : 'flex items-center justify-center';

    // Background based on dark mode
    const bgClass = fullScreen
        ? (darkMode ? 'bg-gray-900' : 'bg-gray-50/80')
        : 'bg-transparent';

    // Text color based on dark mode
    const textClass = darkMode ? 'text-gray-300' : 'text-gray-600';

    return (
        <div className={`${containerClasses} ${bgClass}`}>
            <div className="flex flex-col items-center gap-3">
                {/* Spinner */}
                <div
                    className={`
            ${sizeClasses[size]}
            border-${color}-500 border-t-transparent
            rounded-full animate-spin
            ${darkMode ? 'border-opacity-80' : ''}
          `}
                    role="status"
                    aria-label="Loading"
                />

                {/* Optional Text */}
                {text && (
                    <span className={`text-sm font-medium ${textClass}`}>
                        {text}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Loader;