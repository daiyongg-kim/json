import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import yaml from 'js-yaml';
import Papa from 'papaparse';
import { InContentAd } from './AdSense';

const MonacoEditor = dynamic(() => import('./MonacoEditorWrapper'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">Loading editor...</div>
});

type ConversionType = 
  | 'json-to-xml' | 'json-to-csv' | 'json-to-yaml' | 'json-to-tsv' | 'json-to-string'
  | 'xml-to-json' | 'xml-to-csv' | 'xml-to-string' | 'xml-to-yaml'
  | 'rss-to-json'
  | 'yaml-to-json' | 'yaml-to-xml' | 'yaml-to-csv'
  | 'csv-to-json' | 'csv-to-xml' | 'csv-to-yaml' | 'csv-to-html'
  | 'string-to-json';

const Converters: React.FC = () => {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [selectedConversion, setSelectedConversion] = useState<ConversionType>('json-to-xml');
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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

  // Helper function to convert JSON to XML
  const jsonToXml = (obj: any, rootName = 'root'): string => {
    const escapeXml = (str: string): string => {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const toXml = (obj: any, name: string): string => {
      let xml = '';
      
      if (obj === null || obj === undefined) {
        return '';
      }
      
      if (Array.isArray(obj)) {
        for (const item of obj) {
          xml += `<${name}>`;
          if (typeof item === 'object' && item !== null) {
            xml += toXml(item, 'item');
          } else {
            xml += escapeXml(String(item));
          }
          xml += `</${name}>`;
        }
      } else if (typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj)) {
          const validKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
          if (Array.isArray(value)) {
            for (const item of value) {
              xml += `<${validKey}>`;
              if (typeof item === 'object' && item !== null) {
                xml += toXml(item, 'item');
              } else {
                xml += escapeXml(String(item));
              }
              xml += `</${validKey}>`;
            }
          } else if (typeof value === 'object' && value !== null) {
            xml += `<${validKey}>${toXml(value, validKey)}</${validKey}>`;
          } else if (value !== null && value !== undefined) {
            xml += `<${validKey}>${escapeXml(String(value))}</${validKey}>`;
          }
        }
      } else {
        xml = escapeXml(String(obj));
      }
      
      return xml;
    };
    
    const content = toXml(obj, rootName);
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>${content}</${rootName}>`;
  };

  // Helper function to parse XML to object
  const xmlToObject = (xmlString: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('Invalid XML: ' + parserError.textContent);
    }
    
    const xmlToObj = (node: Element): any => {
      // If node has no children and no attributes, return its text content
      if (!node.hasChildNodes() && (!node.attributes || node.attributes.length === 0)) {
        return '';
      }
      
      // Check if node only contains text
      let hasElementChildren = false;
      let textContent = '';
      
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
          hasElementChildren = true;
          break;
        } else if (child.nodeType === Node.TEXT_NODE) {
          textContent += child.textContent || '';
        }
      }
      
      if (!hasElementChildren && textContent.trim()) {
        return textContent.trim();
      }
      
      const obj: any = {};
      
      // Handle attributes
      if (node.attributes && node.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj['@attributes'][attr.nodeName] = attr.nodeValue;
        }
      }
      
      // Handle child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        
        if (child.nodeType === Node.ELEMENT_NODE) {
          const childElement = child as Element;
          const childName = childElement.nodeName;
          const childValue = xmlToObj(childElement);
          
          if (obj[childName] === undefined) {
            obj[childName] = childValue;
          } else {
            if (!Array.isArray(obj[childName])) {
              obj[childName] = [obj[childName]];
            }
            obj[childName].push(childValue);
          }
        }
      }
      
      return Object.keys(obj).length > 0 ? obj : '';
    };
    
    const rootElement = xmlDoc.documentElement;
    if (!rootElement) {
      throw new Error('No root element found in XML');
    }
    
    return { [rootElement.nodeName]: xmlToObj(rootElement) };
  };

  // Helper function to format XML with proper indentation
  const formatXml = (xml: string): string => {
    let formatted = '';
    let indent = '';
    const tab = '  ';
    
    xml.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }
      
      formatted += indent + '<' + node + '>\r\n';
      
      if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith("?")) {
        indent += tab;
      }
    });
    
    return formatted.substring(1, formatted.length - 3);
  };

  const handleConvert = useCallback(() => {
    setError(null);
    setOutputData('');
    
    if (!inputData.trim()) {
      setError('Please enter some data to convert');
      return;
    }
    
    try {
      let result = '';
      
      switch (selectedConversion) {
        // JSON conversions
        case 'json-to-xml': {
          const jsonObj = JSON.parse(inputData);
          const xml = jsonToXml(jsonObj);
          result = formatXml(xml);
          break;
        }
        case 'json-to-csv': {
          const jsonObj = JSON.parse(inputData);
          const data = Array.isArray(jsonObj) ? jsonObj : [jsonObj];
          result = Papa.unparse(data);
          break;
        }
        case 'json-to-tsv': {
          const jsonObj = JSON.parse(inputData);
          const data = Array.isArray(jsonObj) ? jsonObj : [jsonObj];
          result = Papa.unparse(data, { delimiter: '\t' });
          break;
        }
        case 'json-to-yaml': {
          const jsonObj = JSON.parse(inputData);
          result = yaml.dump(jsonObj);
          break;
        }
        case 'json-to-string': {
          const jsonObj = JSON.parse(inputData);
          result = JSON.stringify(jsonObj);
          break;
        }
        
        // XML conversions
        case 'xml-to-json': {
          const xmlObj = xmlToObject(inputData);
          result = JSON.stringify(xmlObj, null, 2);
          break;
        }
        case 'xml-to-csv': {
          const xmlObj = xmlToObject(inputData);
          const data = Array.isArray(xmlObj) ? xmlObj : [xmlObj];
          result = Papa.unparse(data);
          break;
        }
        case 'xml-to-string': {
          result = inputData.replace(/>\s+</g, '><').trim();
          break;
        }
        case 'xml-to-yaml': {
          const xmlObj = xmlToObject(inputData);
          result = yaml.dump(xmlObj);
          break;
        }
        
        // RSS to JSON
        case 'rss-to-json': {
          const xmlObj = xmlToObject(inputData);
          result = JSON.stringify(xmlObj, null, 2);
          break;
        }
        
        // YAML conversions
        case 'yaml-to-json': {
          const yamlObj = yaml.load(inputData);
          result = JSON.stringify(yamlObj, null, 2);
          break;
        }
        case 'yaml-to-xml': {
          const yamlObj = yaml.load(inputData);
          const xml = jsonToXml(yamlObj);
          result = formatXml(xml);
          break;
        }
        case 'yaml-to-csv': {
          const yamlObj = yaml.load(inputData);
          const data = Array.isArray(yamlObj) ? yamlObj : [yamlObj];
          result = Papa.unparse(data);
          break;
        }
        
        // CSV conversions
        case 'csv-to-json': {
          const parsed = Papa.parse(inputData, { header: true });
          result = JSON.stringify(parsed.data, null, 2);
          break;
        }
        case 'csv-to-xml': {
          const parsed = Papa.parse(inputData, { header: true });
          const xml = jsonToXml(parsed.data, 'data');
          result = formatXml(xml);
          break;
        }
        case 'csv-to-yaml': {
          const parsed = Papa.parse(inputData, { header: true });
          result = yaml.dump(parsed.data);
          break;
        }
        case 'csv-to-html': {
          const parsed = Papa.parse(inputData, { header: true });
          const headers = parsed.meta.fields || [];
          const rows = parsed.data as any[];
          
          let html = '<table>\n<thead>\n<tr>\n';
          headers.forEach(header => {
            html += `  <th>${header}</th>\n`;
          });
          html += '</tr>\n</thead>\n<tbody>\n';
          
          rows.forEach(row => {
            html += '<tr>\n';
            headers.forEach(header => {
              html += `  <td>${row[header] || ''}</td>\n`;
            });
            html += '</tr>\n';
          });
          html += '</tbody>\n</table>';
          result = html;
          break;
        }
        
        // String to JSON
        case 'string-to-json': {
          result = JSON.stringify(inputData);
          break;
        }
        
        default:
          throw new Error('Conversion type not supported');
      }
      
      setOutputData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during conversion');
      }
    }
  }, [inputData, selectedConversion]);

  const handleClear = useCallback(() => {
    setInputData('');
    setOutputData('');
    setError(null);
  }, []);

  const handleCopy = useCallback(() => {
    if (outputData) {
      navigator.clipboard.writeText(outputData);
    }
  }, [outputData]);

  const getInputLanguage = (): string => {
    const type = selectedConversion.split('-')[0];
    switch (type) {
      case 'json': return 'json';
      case 'xml': case 'rss': return 'xml';
      case 'yaml': return 'yaml';
      case 'csv': return 'plaintext';
      case 'string': return 'plaintext';
      default: return 'plaintext';
    }
  };

  const getOutputLanguage = (): string => {
    const type = selectedConversion.split('-').pop();
    switch (type) {
      case 'json': return 'json';
      case 'xml': return 'xml';
      case 'yaml': return 'yaml';
      case 'csv': case 'tsv': return 'plaintext';
      case 'html': return 'html';
      case 'string': return 'plaintext';
      default: return 'plaintext';
    }
  };

  const conversionButtons: { type: ConversionType; label: string }[] = [
    { type: 'json-to-xml', label: 'JSON to XML' },
    { type: 'json-to-csv', label: 'JSON to CSV' },
    { type: 'json-to-yaml', label: 'JSON to YAML' },
    { type: 'json-to-tsv', label: 'JSON to TSV' },
    { type: 'json-to-string', label: 'JSON to String' },
    { type: 'xml-to-json', label: 'XML to JSON' },
    { type: 'xml-to-csv', label: 'XML to CSV' },
    { type: 'xml-to-string', label: 'XML to String' },
    { type: 'xml-to-yaml', label: 'XML to YAML' },
    { type: 'rss-to-json', label: 'RSS to JSON' },
    { type: 'yaml-to-json', label: 'YAML to JSON' },
    { type: 'yaml-to-xml', label: 'YAML to XML' },
    { type: 'yaml-to-csv', label: 'YAML to CSV' },
    { type: 'csv-to-json', label: 'CSV to JSON' },
    { type: 'csv-to-xml', label: 'CSV to XML' },
    { type: 'csv-to-yaml', label: 'CSV to YAML' },
    { type: 'csv-to-html', label: 'CSV to HTML' },
    { type: 'string-to-json', label: 'String to JSON' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-100 to-gray-200'}`}>
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Data Converters
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Convert Between Different Data Formats
          </p>
        </header>

        <div className="mb-4 flex justify-between items-center gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleConvert}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Convert
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              disabled={!outputData}
            >
              Copy Output
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="flex gap-2">
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
            <Link 
              href="/xml"
              className={`px-4 py-2 rounded transition-colors ${
                theme === 'dark'
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              📋 XML Parser
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
            Error: {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Input
            </h2>
            <div className="h-[400px] border border-gray-600 rounded-lg overflow-hidden">
              <MonacoEditor
                value={inputData}
                onChange={(value) => setInputData(value || '')}
                language={getInputLanguage()}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
              />
            </div>
          </div>
          
          <div>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Output
            </h2>
            <div className="h-[400px] border border-gray-600 rounded-lg overflow-hidden">
              <MonacoEditor
                value={outputData}
                onChange={() => {}}
                language={getOutputLanguage()}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                options={{ readOnly: true }}
              />
            </div>
          </div>
        </div>

        {/* Conversion buttons between the boxes */}
        <div className="mt-6 mb-6">
          <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Select Conversion Type:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {conversionButtons.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setSelectedConversion(type)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  selectedConversion === type
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* In-Content Ad - Placed below converters */}
        <InContentAd />

        <footer className={`mt-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© 2024 Data Converters. Free online conversion tools.</p>
        </footer>
      </div>
    </div>
  );
};

export default Converters;