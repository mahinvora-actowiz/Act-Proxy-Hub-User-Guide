// import { Check, Copy, TicketMinus } from 'lucide-react';
// import React, { useState } from 'react';
// import { oneLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// export const CodeBlock = ({ code, language, darkMode = true }) => {
//     const [copied, setCopied] = useState(false);

//     const handleCopy = async () => {
//         await navigator.clipboard.writeText(code);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 1500);
//     };

//     return (
//         <div className="relative group">
//             <SyntaxHighlighter
//                 language={language}
//                 style={darkMode ? vscDarkPlus : oneLight}
//                 customStyle={{
//                     margin: 0,
//                     borderRadius: '8px',
//                     fontSize: '13px',
//                     lineHeight: '1.4',
//                     background: darkMode ? '#1e1e1e' : '#f8f8f8'
//                 }}
//                 showLineNumbers
//             >
//                 {code}
//             </SyntaxHighlighter>

//             <button
//                 onClick={handleCopy}
//                 className={`cursor-pointer absolute top-3 right-3 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100
//     ${copied
//                         ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
//                         : darkMode
//                             ? 'bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white'
//                             : 'bg-gray-200/80 hover:bg-gray-300 text-gray-600 hover:text-gray-900'
//                     }`}
//                 title="Copy code"
//             >
//                 {copied ? (
//                     <Check size={14} />
//                 ) : (
//                     <Copy size={14} />
//                 )}
//             </button>
//         </div>
//     );
// };

import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';
import { oneLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export const CodeBlock = ({ code, language, darkMode = true }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            // Modern Clipboard API (requires HTTPS or localhost)
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(code);
            } else {
                // Fallback for HTTP or older browsers
                const textArea = document.createElement("textarea");
                textArea.value = code;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy code:", err);
            // Optional: show a toast/notification to the user
        }
    };

    return (
        <div className="relative group">
            <SyntaxHighlighter
                language={language}
                style={darkMode ? vscDarkPlus : oneLight}
                customStyle={{
                    margin: 0,
                    borderRadius: '8px',
                    fontSize: '13px',
                    lineHeight: '1.4',
                    background: darkMode ? '#1e1e1e' : '#f8f8f8'
                }}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter>

            <button
                onClick={handleCopy}
                className={`cursor-pointer absolute top-3 right-3 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100
                    ${copied
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : darkMode
                            ? 'bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white'
                            : 'bg-gray-200/80 hover:bg-gray-300 text-gray-600 hover:text-gray-900'
                    }`}
                title="Copy code"
                aria-label={copied ? "Copied!" : "Copy code"}
            >
                {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
        </div>
    );
};