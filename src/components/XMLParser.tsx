import React, { useState, useCallback, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import XMLTreeView from './XMLTreeView';
import Link from 'next/link';
import { InContentAd } from './AdSense';

const MonacoEditor = dynamic(() => import('./MonacoEditorWrapper'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">Loading editor...</div>
});

const XMLParser: React.FC = () => {
  const [inputXML, setInputXML] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsedXML = useMemo(() => {
    if (!inputXML.trim()) {
      setError(null);
      return null;
    }
    
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputXML, 'text/xml');
      
      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        const errorText = parserError.textContent || 'Invalid XML';
        setError(errorText);
        return null;
      }
      
      setError(null);
      return xmlDoc;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Invalid XML');
      }
      return null;
    }
  }, [inputXML]);

  const handleInputChange = useCallback((value: string | undefined) => {
    setInputXML(value || '');
  }, []);

  const handleFormat = useCallback(() => {
    if (parsedXML) {
      // Format XML with proper indentation
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(parsedXML);
      
      // Basic XML formatting with indentation
      let formatted = xmlString;
      let indent = 0;
      formatted = formatted.replace(/></g, '>\n<');
      formatted = formatted.split('\n').map(line => {
        let indentBefore = indent;
        if (line.match(/^<\/\w/)) indent--;
        else if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
          indentBefore = indent;
          indent++;
        } else if (line.match(/^<\w[^>]*\/>/)) {
          // self-closing tag
        }
        return '  '.repeat(Math.max(0, indentBefore)) + line;
      }).join('\n');
      
      setInputXML(formatted);
    }
  }, [parsedXML]);

  const handleMinify = useCallback(() => {
    if (parsedXML) {
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(parsedXML);
      // Remove unnecessary whitespace
      const minified = xmlString.replace(/>\s+</g, '><').trim();
      setInputXML(minified);
    }
  }, [parsedXML]);

  const handleClear = useCallback(() => {
    setInputXML('');
    setError(null);
  }, []);

  const handleCopy = useCallback(() => {
    if (parsedXML) {
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(parsedXML);
      navigator.clipboard.writeText(xmlString);
    }
  }, [parsedXML]);

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
        setInputXML(content);
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
            XML Parser Pro
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Parse, Format, Validate, and Beautify XML Online
          </p>
        </header>

        <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleFormat}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={!parsedXML}
            >
              Format
            </button>
            <button
              onClick={handleMinify}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              disabled={!parsedXML}
            >
              Minify
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              disabled={!parsedXML}
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
                accept=".xml"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href="/converters"
              className={`px-4 py-2 rounded transition-colors ${
                theme === 'dark'
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-teal-500 text-white hover:bg-teal-600'
              }`}
            >
              🔄 Converters
            </Link>
            <Link 
              href="/"
              className={`px-4 py-2 rounded transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              📄 JSON Parser
            </Link>
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
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Input XML
            </h2>
            <div className="h-[600px] border border-gray-600 rounded-lg overflow-hidden">
              <MonacoEditor
                value={inputXML}
                onChange={handleInputChange}
                language="xml"
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
                {parsedXML ? (
                  <XMLTreeView xmlDoc={parsedXML} theme={theme} />
                ) : (
                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {inputXML.trim() ? 'Invalid XML' : 'Enter XML to see formatted output'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* In-Content Ad - Active with real AdSense slot - Placed below XML formatter */}
        <InContentAd />

        <footer className={`mt-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© 2024 XML Parser Pro. Free online XML tools.</p>
        </footer>
      </div>
    </div>
  );
};

export default XMLParser;