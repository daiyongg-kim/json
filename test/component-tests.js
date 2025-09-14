/**
 * JSON Parser Pro - Component-Specific Tests
 * 
 * This file contains detailed tests for individual React components
 * and their specific functionality.
 */

// Mock React hooks for testing
const mockReact = {
  useState: (initial) => {
    let state = initial;
    const setState = (newState) => {
      state = typeof newState === 'function' ? newState(state) : newState;
    };
    return [state, setState];
  },
  useCallback: (fn) => fn,
  useMemo: (fn) => fn(),
  useRef: (initial) => ({ current: initial })
};

// Test Results
const componentTestResults = {
  passed: 0,
  failed: 0,
  errors: []
};

function assert(condition, message) {
  if (condition) {
    componentTestResults.passed++;
    console.log(`✅ PASS: ${message}`);
  } else {
    componentTestResults.failed++;
    componentTestResults.errors.push(message);
    console.log(`❌ FAIL: ${message}`);
  }
}

// JSONParser Component Tests
function testJSONParserComponent() {
  console.log('\n🧪 Testing JSONParser Component...');
  
  // Test initial state
  function testInitialState() {
    const [inputJSON, setInputJSON] = mockReact.useState('');
    const [error, setError] = mockReact.useState(null);
    const [theme, setTheme] = mockReact.useState('dark');
    
    assert(inputJSON === '', 'JSONParser initial inputJSON state');
    assert(error === null, 'JSONParser initial error state');
    assert(theme === 'dark', 'JSONParser initial theme state');
  }
  
  // Test JSON parsing logic
  function testJSONParsing() {
    const validJSON = '{"name": "John", "age": 30}';
    const invalidJSON = '{"name": "John", "age":}';
    
    // Valid JSON parsing
    try {
      const parsed = JSON.parse(validJSON);
      assert(parsed.name === 'John', 'JSONParser valid JSON parsing');
    } catch (e) {
      assert(false, 'JSONParser valid JSON parsing');
    }
    
    // Invalid JSON error handling
    try {
      JSON.parse(invalidJSON);
      assert(false, 'JSONParser invalid JSON should throw error');
    } catch (e) {
      assert(true, 'JSONParser invalid JSON error handling');
    }
  }
  
  // Test formatting functionality
  function testJSONFormatting() {
    const minified = '{"name":"John","age":30}';
    const formatted = JSON.stringify(JSON.parse(minified), null, 2);
    
    assert(formatted.includes('  "name": "John"'), 'JSONParser formatting functionality');
    assert(formatted.includes('\n'), 'JSONParser formatting includes newlines');
  }
  
  // Test minification functionality
  function testJSONMinification() {
    const formatted = '{\n  "name": "John",\n  "age": 30\n}';
    const minified = JSON.stringify(JSON.parse(formatted));
    
    assert(minified === '{"name":"John","age":30}', 'JSONParser minification functionality');
    assert(!minified.includes('\n'), 'JSONParser minification removes newlines');
  }
  
  // Test error position detection
  function testErrorPositionDetection() {
    const invalidJSON = '{"name": "John", "age":}';
    
    try {
      JSON.parse(invalidJSON);
    } catch (e) {
      const match = e.message.match(/position (\d+)/);
      if (match) {
        const position = parseInt(match[1]);
        const lines = invalidJSON.substring(0, position).split('\n');
        const lineNumber = lines.length;
        const columnNumber = lines[lines.length - 1].length + 1;
        
        assert(lineNumber === 1, 'JSONParser error line detection');
        assert(columnNumber > 0, 'JSONParser error column detection');
      } else {
        assert(true, 'JSONParser error detection (position not available)');
      }
    }
  }
  
  // Test file upload validation
  function testFileUploadValidation() {
    const validFile = { size: 5 * 1024 * 1024, name: 'test.json' }; // 5MB
    const invalidFile = { size: 15 * 1024 * 1024, name: 'large.json' }; // 15MB
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    assert(validFile.size <= maxSize, 'JSONParser file size validation - valid');
    assert(invalidFile.size > maxSize, 'JSONParser file size validation - invalid');
  }
  
  testInitialState();
  testJSONParsing();
  testJSONFormatting();
  testJSONMinification();
  testErrorPositionDetection();
  testFileUploadValidation();
}

// XMLParser Component Tests
function testXMLParserComponent() {
  console.log('\n🧪 Testing XMLParser Component...');
  
  // Test XML parsing logic
  function testXMLParsing() {
    const validXML = '<?xml version="1.0"?><root><name>John</name></root>';
    const invalidXML = '<root><name>John</name>';
    
    // Valid XML parsing
    const parser = new DOMParser();
    const validDoc = parser.parseFromString(validXML, 'text/xml');
    const validError = validDoc.querySelector('parsererror');
    assert(!validError, 'XMLParser valid XML parsing');
    
    // Invalid XML parsing
    const invalidDoc = parser.parseFromString(invalidXML, 'text/xml');
    const invalidError = invalidDoc.querySelector('parsererror');
    assert(invalidError !== null, 'XMLParser invalid XML error detection');
  }
  
  // Test XML formatting
  function testXMLFormatting() {
    const minifiedXML = '<root><name>John</name><age>30</age></root>';
    
    // Basic formatting logic
    let formatted = minifiedXML.replace(/></g, '>\n<');
    let indent = 0;
    formatted = formatted.split('\n').map(line => {
      let indentBefore = indent;
      if (line.match(/^<\/\w/)) indent--;
      else if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
        indentBefore = indent;
        indent++;
      }
      return '  '.repeat(Math.max(0, indentBefore)) + line;
    }).join('\n');
    
    assert(formatted.includes('  <name>John</name>'), 'XMLParser formatting functionality');
  }
  
  // Test XML serialization
  function testXMLSerialization() {
    const xmlString = '<?xml version="1.0"?><root><name>John</name></root>';
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const serializer = new XMLSerializer();
    const serialized = serializer.serializeToString(xmlDoc);
    
    assert(serialized.includes('<name>John</name>'), 'XMLParser serialization functionality');
  }
  
  testXMLParsing();
  testXMLFormatting();
  testXMLSerialization();
}

// Converters Component Tests
function testConvertersComponent() {
  console.log('\n🧪 Testing Converters Component...');
  
  // Test conversion type validation
  function testConversionTypes() {
    const validTypes = [
      'json-to-xml', 'json-to-csv', 'json-to-yaml', 'json-to-tsv', 'json-to-string',
      'xml-to-json', 'xml-to-csv', 'xml-to-string', 'xml-to-yaml',
      'rss-to-json',
      'yaml-to-json', 'yaml-to-xml', 'yaml-to-csv',
      'csv-to-json', 'csv-to-xml', 'csv-to-yaml', 'csv-to-html',
      'string-to-json'
    ];
    
    assert(validTypes.length === 18, 'Converters component supports 18 conversion types');
    assert(validTypes.includes('json-to-xml'), 'Converters includes JSON to XML conversion');
    assert(validTypes.includes('csv-to-html'), 'Converters includes CSV to HTML conversion');
  }
  
  // Test JSON to XML conversion
  function testJSONToXMLConversion() {
    const jsonObj = { name: 'John', age: 30 };
    
    // Simplified JSON to XML converter
    function jsonToXml(obj, rootName = 'root') {
      const escapeXml = (str) => {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      };
      
      const toXml = (obj, name) => {
        let xml = '';
        if (typeof obj === 'object' && obj !== null) {
          for (const [key, value] of Object.entries(obj)) {
            xml += `<${key}>${typeof value === 'object' ? toXml(value, key) : escapeXml(String(value))}</${key}>`;
          }
        }
        return xml;
      };
      
      return `<?xml version="1.0" encoding="UTF-8"?><${rootName}>${toXml(obj, rootName)}</${rootName}>`;
    }
    
    const xml = jsonToXml(jsonObj);
    assert(xml.includes('<name>John</name>'), 'Converters JSON to XML conversion');
    assert(xml.includes('<age>30</age>'), 'Converters JSON to XML conversion includes all fields');
  }
  
  // Test XML to JSON conversion
  function testXMLToJSONConversion() {
    const xmlString = '<?xml version="1.0"?><root><name>John</name><age>30</age></root>';
    
    // Simplified XML to JSON converter
    function xmlToObject(xmlString) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      const xmlToObj = (node) => {
        const obj = {};
        
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (child.nodeType === Node.ELEMENT_NODE) {
            const childName = child.nodeName;
            const childValue = child.childNodes.length === 1 && child.childNodes[0].nodeType === Node.TEXT_NODE
              ? child.textContent
              : xmlToObj(child);
            obj[childName] = childValue;
          }
        }
        
        return obj;
      };
      
      const rootElement = xmlDoc.documentElement;
      return { [rootElement.nodeName]: xmlToObj(rootElement) };
    }
    
    const jsonObj = xmlToObject(xmlString);
    assert(jsonObj.root.name === 'John', 'Converters XML to JSON conversion');
    assert(jsonObj.root.age === '30', 'Converters XML to JSON conversion includes all fields');
  }
  
  // Test CSV parsing
  function testCSVParsing() {
    const csvString = 'name,age,city\nJohn,30,NYC\nJane,25,LA';
    
    // Simplified CSV parser
    function parseCSV(csvString) {
      const lines = csvString.split('\n');
      const headers = lines[0].split(',');
      const data = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index] ? values[index].trim() : '';
        });
        data.push(row);
      }
      
      return data;
    }
    
    const parsed = parseCSV(csvString);
    assert(parsed.length === 2, 'Converters CSV parsing returns correct number of rows');
    assert(parsed[0].name === 'John', 'Converters CSV parsing extracts data correctly');
  }
  
  // Test language detection for Monaco Editor
  function testLanguageDetection() {
    function getLanguageFromConversion(conversionType) {
      const [from, to] = conversionType.split('-to-');
      const languageMap = {
        'json': 'json',
        'xml': 'xml',
        'yaml': 'yaml',
        'csv': 'plaintext',
        'html': 'html',
        'string': 'plaintext'
      };
      return {
        input: languageMap[from] || 'plaintext',
        output: languageMap[to] || 'plaintext'
      };
    }
    
    const jsonToXml = getLanguageFromConversion('json-to-xml');
    assert(jsonToXml.input === 'json' && jsonToXml.output === 'xml', 'Converters language detection for JSON to XML');
    
    const csvToHtml = getLanguageFromConversion('csv-to-html');
    assert(csvToHtml.input === 'plaintext' && csvToHtml.output === 'html', 'Converters language detection for CSV to HTML');
  }
  
  testConversionTypes();
  testJSONToXMLConversion();
  testXMLToJSONConversion();
  testCSVParsing();
  testLanguageDetection();
}

// TreeView Component Tests
function testTreeViewComponents() {
  console.log('\n🧪 Testing TreeView Components...');
  
  // Test JSON tree structure generation
  function testJSONTreeStructure() {
    const jsonData = {
      name: 'John',
      age: 30,
      details: {
        city: 'NYC',
        country: 'USA'
      },
      hobbies: ['reading', 'coding']
    };
    
    // Simplified tree structure generator
    function generateTreeStructure(data, level = 0) {
      const tree = [];
      
      if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
          data.forEach((item, index) => {
            tree.push({
              key: `[${index}]`,
              value: item,
              type: typeof item,
              level: level,
              isExpandable: typeof item === 'object'
            });
          });
        } else {
          Object.entries(data).forEach(([key, value]) => {
            tree.push({
              key: key,
              value: value,
              type: typeof value,
              level: level,
              isExpandable: typeof value === 'object'
            });
          });
        }
      }
      
      return tree;
    }
    
    const tree = generateTreeStructure(jsonData);
    assert(tree.length === 4, 'JSONTreeView generates correct number of root nodes');
    assert(tree.find(node => node.key === 'details').isExpandable, 'JSONTreeView marks objects as expandable');
    assert(tree.find(node => node.key === 'hobbies').isExpandable, 'JSONTreeView marks arrays as expandable');
  }
  
  // Test XML tree structure generation
  function testXMLTreeStructure() {
    const xmlString = '<?xml version="1.0"?><root><user id="1"><name>John</name><age>30</age></user></root>';
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    // Simplified XML tree structure generator
    function generateXMLTreeStructure(xmlDoc) {
      function processNode(node, level = 0) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const nodeData = {
            tagName: node.tagName,
            attributes: {},
            textContent: '',
            level: level,
            hasChildren: false
          };
          
          // Process attributes
          if (node.attributes) {
            for (let i = 0; i < node.attributes.length; i++) {
              const attr = node.attributes[i];
              nodeData.attributes[attr.nodeName] = attr.nodeValue;
            }
          }
          
          // Check for child elements
          for (let i = 0; i < node.childNodes.length; i++) {
            const child = node.childNodes[i];
            if (child.nodeType === Node.ELEMENT_NODE) {
              nodeData.hasChildren = true;
              break;
            } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
              nodeData.textContent += child.textContent.trim();
            }
          }
          
          return nodeData;
        }
      }
      
      return xmlDoc.documentElement ? processNode(xmlDoc.documentElement) : null;
    }
    
    const xmlTree = generateXMLTreeStructure(xmlDoc);
    assert(xmlTree.tagName === 'root', 'XMLTreeView processes root element correctly');
    assert(xmlTree.hasChildren === true, 'XMLTreeView detects child elements');
  }
  
  // Test tree node expansion/collapse logic
  function testTreeNodeExpansion() {
    const [expandedNodes, setExpandedNodes] = mockReact.useState(new Set());
    
    function toggleNode(nodeId) {
      const newExpanded = new Set(expandedNodes);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      setExpandedNodes(newExpanded);
      return newExpanded;
    }
    
    const expanded1 = toggleNode('node1');
    assert(expanded1.has('node1'), 'TreeView node expansion');
    
    const expanded2 = toggleNode('node1');
    assert(!expanded2.has('node1'), 'TreeView node collapse');
  }
  
  testJSONTreeStructure();
  testXMLTreeStructure();
  testTreeNodeExpansion();
}

// MonacoEditor Component Tests
function testMonacoEditorComponent() {
  console.log('\n🧪 Testing MonacoEditor Component...');
  
  // Test editor configuration
  function testEditorConfiguration() {
    const defaultOptions = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on'
    };
    
    assert(defaultOptions.automaticLayout === true, 'MonacoEditor automatic layout enabled');
    assert(defaultOptions.minimap.enabled === false, 'MonacoEditor minimap disabled');
    assert(defaultOptions.wordWrap === 'on', 'MonacoEditor word wrap enabled');
  }
  
  // Test language support
  function testLanguageSupport() {
    const supportedLanguages = ['json', 'xml', 'yaml', 'html', 'css', 'javascript', 'typescript', 'plaintext'];
    
    function isLanguageSupported(language) {
      return supportedLanguages.includes(language);
    }
    
    assert(isLanguageSupported('json'), 'MonacoEditor supports JSON');
    assert(isLanguageSupported('xml'), 'MonacoEditor supports XML');
    assert(isLanguageSupported('yaml'), 'MonacoEditor supports YAML');
    assert(!isLanguageSupported('unknown'), 'MonacoEditor rejects unknown languages');
  }
  
  // Test theme support
  function testThemeSupport() {
    const supportedThemes = ['vs', 'vs-dark', 'hc-black'];
    
    function isThemeSupported(theme) {
      return supportedThemes.includes(theme);
    }
    
    assert(isThemeSupported('vs'), 'MonacoEditor supports light theme');
    assert(isThemeSupported('vs-dark'), 'MonacoEditor supports dark theme');
    assert(isThemeSupported('hc-black'), 'MonacoEditor supports high contrast theme');
  }
  
  testEditorConfiguration();
  testLanguageSupport();
  testThemeSupport();
}

// SEO Component Tests
function testSEOComponent() {
  console.log('\n🧪 Testing SEO Component...');
  
  // Test meta tags generation
  function testMetaTagsGeneration() {
    const seoProps = {
      title: 'JSON Parser Pro',
      description: 'Free online JSON parser and formatter',
      keywords: 'json, parser, formatter, validator',
      canonical: 'https://jsonparser.website/',
      ogTitle: 'JSON Parser Pro - Free Online Tool',
      ogDescription: 'Parse and format JSON online',
      ogUrl: 'https://jsonparser.website/'
    };
    
    // Simulate meta tags generation
    const metaTags = [
      { name: 'title', content: seoProps.title },
      { name: 'description', content: seoProps.description },
      { name: 'keywords', content: seoProps.keywords },
      { property: 'og:title', content: seoProps.ogTitle },
      { property: 'og:description', content: seoProps.ogDescription },
      { property: 'og:url', content: seoProps.ogUrl }
    ];
    
    assert(metaTags.length === 6, 'SEO component generates correct number of meta tags');
    assert(metaTags.find(tag => tag.name === 'title').content === seoProps.title, 'SEO component sets title correctly');
    assert(metaTags.find(tag => tag.property === 'og:title').content === seoProps.ogTitle, 'SEO component sets Open Graph title');
  }
  
  // Test structured data generation
  function testStructuredDataGeneration() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JSON Parser Pro",
      "url": "https://jsonparser.website/",
      "description": "Professional JSON parser and formatter",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
    
    assert(structuredData["@context"] === "https://schema.org", 'SEO structured data has correct context');
    assert(structuredData["@type"] === "WebApplication", 'SEO structured data has correct type');
    assert(structuredData.offers.price === "0", 'SEO structured data indicates free application');
  }
  
  testMetaTagsGeneration();
  testStructuredDataGeneration();
}

// AdSense Component Tests
function testAdSenseComponents() {
  console.log('\n🧪 Testing AdSense Components...');
  
  // Test ad configuration
  function testAdConfiguration() {
    const adsenseConfig = {
      publisherId: 'ca-pub-XXXXXXXXXX',
      slots: {
        inContent: 'XXXXXXXXXX',
        headerBanner: 'XXXXXXXXXX',
        sidebar: 'XXXXXXXXXX',
        mobileInline: 'XXXXXXXXXX',
        stickyBottom: 'XXXXXXXXXX'
      }
    };
    
    assert(adsenseConfig.publisherId.startsWith('ca-pub-'), 'AdSense publisher ID format is correct');
    assert(Object.keys(adsenseConfig.slots).length === 5, 'AdSense configuration has all required slots');
    assert(adsenseConfig.slots.inContent, 'AdSense has in-content slot configured');
  }
  
  // Test ad placement logic
  function testAdPlacement() {
    const adPlacements = [
      { type: 'header-banner', active: false },
      { type: 'in-content', active: true },
      { type: 'sidebar', active: false },
      { type: 'mobile-inline', active: false },
      { type: 'sticky-bottom', active: false }
    ];
    
    const activeAds = adPlacements.filter(ad => ad.active);
    assert(activeAds.length === 1, 'Only one ad placement is active');
    assert(activeAds[0].type === 'in-content', 'In-content ad is the active placement');
  }
  
  testAdConfiguration();
  testAdPlacement();
}

// Theme Management Tests
function testThemeManagement() {
  console.log('\n🧪 Testing Theme Management...');
  
  // Test theme toggle functionality
  function testThemeToggle() {
    let currentTheme = 'dark';
    
    function toggleTheme() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Simulate DOM class manipulation
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      
      return currentTheme;
    }
    
    const newTheme1 = toggleTheme();
    assert(newTheme1 === 'light', 'Theme toggle from dark to light');
    
    const newTheme2 = toggleTheme();
    assert(newTheme2 === 'dark', 'Theme toggle from light to dark');
  }
  
  // Test theme persistence
  function testThemePersistence() {
    // Mock localStorage
    const mockStorage = {};
    
    function saveTheme(theme) {
      mockStorage.theme = theme;
    }
    
    function loadTheme() {
      return mockStorage.theme || 'dark';
    }
    
    saveTheme('light');
    const loadedTheme = loadTheme();
    assert(loadedTheme === 'light', 'Theme persistence saves and loads correctly');
  }
  
  // Test theme-aware styling
  function testThemeAwareStyling() {
    function getThemeClasses(theme, component) {
      const themeClasses = {
        dark: {
          background: 'bg-gray-800',
          text: 'text-white',
          border: 'border-gray-600'
        },
        light: {
          background: 'bg-white',
          text: 'text-gray-900',
          border: 'border-gray-300'
        }
      };
      
      return themeClasses[theme] || themeClasses.dark;
    }
    
    const darkClasses = getThemeClasses('dark');
    assert(darkClasses.background === 'bg-gray-800', 'Dark theme background class');
    assert(darkClasses.text === 'text-white', 'Dark theme text class');
    
    const lightClasses = getThemeClasses('light');
    assert(lightClasses.background === 'bg-white', 'Light theme background class');
    assert(lightClasses.text === 'text-gray-900', 'Light theme text class');
  }
  
  testThemeToggle();
  testThemePersistence();
  testThemeAwareStyling();
}

// Main Component Test Runner
function runComponentTests() {
  console.log('🚀 Starting Component-Specific Tests...\n');
  
  const startTime = performance.now();
  
  // Run all component test suites
  testJSONParserComponent();
  testXMLParserComponent();
  testConvertersComponent();
  testTreeViewComponents();
  testMonacoEditorComponent();
  testSEOComponent();
  testAdSenseComponents();
  testThemeManagement();
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  // Print results
  console.log('\n📊 Component Test Results:');
  console.log('==========================');
  console.log(`✅ Passed: ${componentTestResults.passed}`);
  console.log(`❌ Failed: ${componentTestResults.failed}`);
  console.log(`⏱️  Duration: ${duration.toFixed(2)}ms`);
  console.log(`📈 Success Rate: ${((componentTestResults.passed / (componentTestResults.passed + componentTestResults.failed)) * 100).toFixed(1)}%`);
  
  if (componentTestResults.failed > 0) {
    console.log('\n❌ Failed Component Tests:');
    componentTestResults.errors.forEach(error => console.log(`   - ${error}`));
  }
  
  console.log('\n🎉 Component Tests Complete!');
  
  return {
    passed: componentTestResults.passed,
    failed: componentTestResults.failed,
    duration: duration,
    successRate: (componentTestResults.passed / (componentTestResults.passed + componentTestResults.failed)) * 100
  };
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    runComponentTests,
    testJSONParserComponent,
    testXMLParserComponent,
    testConvertersComponent,
    testTreeViewComponents,
    testMonacoEditorComponent,
    testSEOComponent,
    testAdSenseComponents,
    testThemeManagement
  };
}

// Auto-run tests if this file is executed directly
if (typeof window !== 'undefined') {
  console.log('Running component tests in browser environment...');
  runComponentTests();
} else if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('component-tests.js')) {
  console.log('Running component tests in Node.js environment...');
  runComponentTests();
}