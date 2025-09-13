import React, { useState, useCallback, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import JSONTreeView from './JSONTreeView';
// AdSense imports - only InContentAd is active with real slot ID
import { InContentAd } from './AdSense';
// import { HeaderBannerAd, SidebarAd, MobileInlineAd, StickyBottomAd } from './AdSense';

const MonacoEditor = dynamic(() => import('./MonacoEditorWrapper'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">Loading editor...</div>
});

const JSONParser: React.FC = () => {
  const [inputJSON, setInputJSON] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsedJSON = useMemo(() => {
    if (!inputJSON.trim()) {
      setError(null);
      return null;
    }
    
    try {
      const parsed = JSON.parse(inputJSON);
      setError(null);
      return parsed;
    } catch (e) {
      if (e instanceof Error) {
        const match = e.message.match(/position (\d+)/);
        if (match) {
          const position = parseInt(match[1]);
          const lines = inputJSON.substring(0, position).split('\n');
          const lineNumber = lines.length;
          const columnNumber = lines[lines.length - 1].length + 1;
          setError(`Error at line ${lineNumber}, column ${columnNumber}: ${e.message}`);
        } else {
          setError(e.message);
        }
      } else {
        setError('Invalid JSON');
      }
      return null;
    }
  }, [inputJSON]);

  const handleInputChange = useCallback((value: string | undefined) => {
    setInputJSON(value || '');
  }, []);

  const handleFormat = useCallback(() => {
    if (parsedJSON) {
      setInputJSON(JSON.stringify(parsedJSON, null, 2));
    }
  }, [parsedJSON]);

  const handleMinify = useCallback(() => {
    if (parsedJSON) {
      setInputJSON(JSON.stringify(parsedJSON));
    }
  }, [parsedJSON]);

  const handleClear = useCallback(() => {
    setInputJSON('');
    setError(null);
  }, []);

  const handleCopy = useCallback(() => {
    if (parsedJSON) {
      navigator.clipboard.writeText(JSON.stringify(parsedJSON, null, 2));
    }
  }, [parsedJSON]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputJSON(content);
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsText(file);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      return newTheme;
    });
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-100 to-gray-200'}`}>
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            JSON Parser Pro
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Parse, Format, Validate, and Beautify JSON Online
          </p>
        </header>

        {/* Header Banner Ad - Temporarily disabled */}
        {/* <HeaderBannerAd /> */}

        <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleFormat}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={!parsedJSON}
            >
              Format
            </button>
            <button
              onClick={handleMinify}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              disabled={!parsedJSON}
            >
              Minify
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              disabled={!parsedJSON}
            >
              Copy
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Clear
            </button>
            <label className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors cursor-pointer">
              Upload File (Max 10MB)
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded transition-colors ${
              theme === 'dark' 
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Mobile Inline Ad - Temporarily disabled */}
        {/* <MobileInlineAd /> */}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Input JSON
            </h2>
            <div className="h-[600px] border border-gray-600 rounded-lg overflow-hidden">
              <MonacoEditor
                value={inputJSON}
                onChange={handleInputChange}
                language="json"
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
              />
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-1">
              <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Formatted Output
              </h2>
              <div className={`h-[600px] border rounded-lg overflow-auto p-4 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}>
                {parsedJSON ? (
                  <JSONTreeView data={parsedJSON} theme={theme} />
                ) : (
                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {inputJSON.trim() ? 'Invalid JSON' : 'Enter JSON to see formatted output'}
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar Ad - Temporarily disabled */}
            {/* <SidebarAd theme={theme} /> */}
          </div>
        </div>

        {/* In-Content Ad - Active with real AdSense slot - Placed below JSON formatter */}
        <InContentAd />

        <footer className={`mt-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© 2024 JSON Parser Pro. Free online JSON tools.</p>
        </footer>
      </div>
      
      {/* Sticky Bottom Ad - Temporarily disabled */}
      {/* <StickyBottomAd /> */}
    </div>
  );
};

export default JSONParser;