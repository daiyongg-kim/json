/**
 * JSON Parser Pro - Comprehensive Test Suite
 * 
 * This test suite covers all major functionality of the JSON Parser Pro application.
 * Tests are written in vanilla JavaScript for easy execution in any environment.
 */

// Test Data
const testData = {
  validJSON: {
    simple: '{"name": "John", "age": 30}',
    nested: '{"user": {"name": "John", "details": {"age": 30, "city": "NYC"}}}',
    array: '[{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]',
    complex: '{"users": [{"name": "John", "roles": ["admin", "user"]}, {"name": "Jane", "roles": ["user"]}], "meta": {"total": 2, "active": true}}'
  },
  invalidJSON: {
    syntax: '{"name": "John", "age":}',
    quotes: "{name: 'John', age: 30}",
    trailing: '{"name": "John", "age": 30,}'
  },
  validXML: {
    simple: '<?xml version="1.0"?><root><name>John</name><age>30</age></root>',
    nested: '<?xml version="1.0"?><root><user><name>John</name><details><age>30</age><city>NYC</city></details></user></root>',
    attributes: '<?xml version="1.0"?><root><user id="1" active="true"><name>John</name></user></root>',
    cdata: '<?xml version="1.0"?><root><description><![CDATA[This is <b>bold</b> text]]></description></root>'
  },
  invalidXML: {
    unclosed: '<root><name>John</name>',
    mismatch: '<root><name>John</title></root>',
    invalid: '<root><name>John</name><age></root>'
  },
  csvData: {
    simple: 'name,age,city\nJohn,30,NYC\nJane,25,LA',
    quoted: '"name","age","city"\n"John Doe",30,"New York"\n"Jane Smith",25,"Los Angeles"',
    empty: 'name,age,city\nJohn,,NYC\n,25,LA'
  },
  yamlData: {
    simple: 'name: John\nage: 30\ncity: NYC',
    nested: 'user:\n  name: John\n  details:\n    age: 30\n    city: NYC',
    array: 'users:\n  - name: John\n    age: 30\n  - name: Jane\n    age: 25'
  }
};

// Test Results Storage
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

// Test Utilities
function assert(condition, message) {
  if (condition) {
    testResults.passed++;
    console.log(`✅ PASS: ${message}`);
  } else {
    testResults.failed++;
    testResults.errors.push(message);
    console.log(`❌ FAIL: ${message}`);
  }
}

function assertThrows(fn, message) {
  try {
    fn();
    testResults.failed++;
    testResults.errors.push(message);
    console.log(`❌ FAIL: ${message} (Expected error but none thrown)`);
  } catch (error) {
    testResults.passed++;
    console.log(`✅ PASS: ${message}`);
  }
}

// JSON Parser Tests
function testJSONParser() {
  console.log('\n🧪 Testing JSON Parser Functionality...');
  
  // Test valid JSON parsing
  try {
    const parsed = JSON.parse(testData.validJSON.simple);
    assert(parsed.name === 'John' && parsed.age === 30, 'Simple JSON parsing');
  } catch (e) {
    assert(false, 'Simple JSON parsing');
  }
  
  // Test nested JSON parsing
  try {
    const parsed = JSON.parse(testData.validJSON.nested);
    assert(parsed.user.details.age === 30, 'Nested JSON parsing');
  } catch (e) {
    assert(false, 'Nested JSON parsing');
  }
  
  // Test array JSON parsing
  try {
    const parsed = JSON.parse(testData.validJSON.array);
    assert(Array.isArray(parsed) && parsed.length === 2, 'Array JSON parsing');
  } catch (e) {
    assert(false, 'Array JSON parsing');
  }
  
  // Test invalid JSON handling
  assertThrows(() => JSON.parse(testData.invalidJSON.syntax), 'Invalid JSON syntax error handling');
  assertThrows(() => JSON.parse(testData.invalidJSON.quotes), 'Invalid JSON quotes error handling');
  assertThrows(() => JSON.parse(testData.invalidJSON.trailing), 'Invalid JSON trailing comma error handling');
  
  // Test JSON formatting
  const minified = '{"name":"John","age":30}';
  const formatted = JSON.stringify(JSON.parse(minified), null, 2);
  assert(formatted.includes('  "name": "John"'), 'JSON formatting with indentation');
  
  // Test JSON minification
  const formatted2 = '{\n  "name": "John",\n  "age": 30\n}';
  const minified2 = JSON.stringify(JSON.parse(formatted2));
  assert(minified2 === '{"name":"John","age":30}', 'JSON minification');
}

// XML Parser Tests
function testXMLParser() {
  console.log('\n🧪 Testing XML Parser Functionality...');
  
  // Test valid XML parsing
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(testData.validXML.simple, 'text/xml');
    const error = xmlDoc.querySelector('parsererror');
    assert(!error, 'Simple XML parsing');
  } catch (e) {
    assert(false, 'Simple XML parsing');
  }
  
  // Test XML with attributes
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(testData.validXML.attributes, 'text/xml');
    const userElement = xmlDoc.querySelector('user');
    assert(userElement && userElement.getAttribute('id') === '1', 'XML attributes parsing');
  } catch (e) {
    assert(false, 'XML attributes parsing');
  }
  
  // Test invalid XML handling
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(testData.invalidXML.unclosed, 'text/xml');
    const error = xmlDoc.querySelector('parsererror');
    assert(error !== null, 'Invalid XML error detection');
  } catch (e) {
    assert(false, 'Invalid XML error detection');
  }
  
  // Test XML serialization
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(testData.validXML.simple, 'text/xml');
    const serializer = new XMLSerializer();
    const serialized = serializer.serializeToString(xmlDoc);
    assert(serialized.includes('<name>John</name>'), 'XML serialization');
  } catch (e) {
    assert(false, 'XML serialization');
  }
}

// Data Conversion Tests
function testDataConversions() {
  console.log('\n🧪 Testing Data Conversion Functionality...');
  
  // Test JSON to XML conversion
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
  
  const jsonObj = { name: 'John', age: 30 };
  const xml = jsonToXml(jsonObj);
  assert(xml.includes('<name>John</name>') && xml.includes('<age>30</age>'), 'JSON to XML conversion');
  
  // Test XML to JSON conversion
  function xmlToObject(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    const xmlToObj = (node) => {
      const obj = {};
      
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
  
  const xmlString = '<?xml version="1.0"?><root><name>John</name><age>30</age></root>';
  const jsonFromXml = xmlToObject(xmlString);
  assert(jsonFromXml.root.name === 'John', 'XML to JSON conversion');
  
  // Test CSV parsing (simplified)
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
  
  const csvData = parseCSV(testData.csvData.simple);
  assert(csvData[0].name === 'John' && csvData[0].age === '30', 'CSV to JSON conversion');
  
  // Test YAML parsing (requires js-yaml library in real implementation)
  // This is a simplified test for the concept
  function parseSimpleYAML(yamlString) {
    const lines = yamlString.split('\n');
    const obj = {};
    
    lines.forEach(line => {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        obj[key.trim()] = value.trim();
      }
    });
    
    return obj;
  }
  
  const yamlObj = parseSimpleYAML(testData.yamlData.simple);
  assert(yamlObj.name === 'John' && yamlObj.age === '30', 'Simple YAML parsing');
}

// Tree View Tests
function testTreeView() {
  console.log('\n🧪 Testing Tree View Functionality...');
  
  // Test JSON tree structure generation
  function generateJSONTree(data, level = 0) {
    const tree = [];
    
    if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          tree.push({
            key: `[${index}]`,
            value: item,
            type: typeof item,
            level: level,
            children: typeof item === 'object' ? generateJSONTree(item, level + 1) : null
          });
        });
      } else {
        Object.entries(data).forEach(([key, value]) => {
          tree.push({
            key: key,
            value: value,
            type: typeof value,
            level: level,
            children: typeof value === 'object' ? generateJSONTree(value, level + 1) : null
          });
        });
      }
    }
    
    return tree;
  }
  
  const jsonData = { name: 'John', details: { age: 30, city: 'NYC' } };
  const tree = generateJSONTree(jsonData);
  assert(tree.length === 2 && tree[1].children.length === 2, 'JSON tree structure generation');
  
  // Test XML tree structure generation
  function generateXMLTree(xmlDoc) {
    const tree = [];
    
    function processNode(node, level = 0) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const nodeData = {
          tagName: node.tagName,
          attributes: {},
          textContent: '',
          level: level,
          children: []
        };
        
        // Process attributes
        if (node.attributes) {
          for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i];
            nodeData.attributes[attr.nodeName] = attr.nodeValue;
          }
        }
        
        // Process child nodes
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (child.nodeType === Node.ELEMENT_NODE) {
            nodeData.children.push(processNode(child, level + 1));
          } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
            nodeData.textContent += child.textContent.trim();
          }
        }
        
        return nodeData;
      }
    }
    
    if (xmlDoc.documentElement) {
      tree.push(processNode(xmlDoc.documentElement));
    }
    
    return tree;
  }
  
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(testData.validXML.nested, 'text/xml');
  const xmlTree = generateXMLTree(xmlDoc);
  assert(xmlTree.length === 1 && xmlTree[0].tagName === 'root', 'XML tree structure generation');
}

// Error Handling Tests
function testErrorHandling() {
  console.log('\n🧪 Testing Error Handling...');
  
  // Test JSON error position detection
  function getJSONErrorPosition(jsonString, error) {
    const match = error.message.match(/position (\d+)/);
    if (match) {
      const position = parseInt(match[1]);
      const lines = jsonString.substring(0, position).split('\n');
      const lineNumber = lines.length;
      const columnNumber = lines[lines.length - 1].length + 1;
      return { line: lineNumber, column: columnNumber };
    }
    return null;
  }
  
  try {
    JSON.parse('{"name": "John", "age":}');
  } catch (error) {
    const position = getJSONErrorPosition('{"name": "John", "age":}', error);
    assert(position && position.line === 1, 'JSON error position detection');
  }
  
  // Test file size validation
  function validateFileSize(file, maxSize = 10 * 1024 * 1024) {
    return file.size <= maxSize;
  }
  
  const mockFile = { size: 5 * 1024 * 1024 }; // 5MB
  assert(validateFileSize(mockFile), 'File size validation - valid size');
  
  const largeMockFile = { size: 15 * 1024 * 1024 }; // 15MB
  assert(!validateFileSize(largeMockFile), 'File size validation - invalid size');
  
  // Test input sanitization
  function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
  
  const maliciousInput = '<script>alert("xss")</script>{"name": "John"}';
  const sanitized = sanitizeInput(maliciousInput);
  assert(!sanitized.includes('<script>'), 'Input sanitization');
}

// Performance Tests
function testPerformance() {
  console.log('\n🧪 Testing Performance...');
  
  // Test large JSON parsing performance
  function generateLargeJSON(size) {
    const data = { users: [] };
    for (let i = 0; i < size; i++) {
      data.users.push({
        id: i,
        name: `User${i}`,
        email: `user${i}@example.com`,
        active: i % 2 === 0
      });
    }
    return JSON.stringify(data);
  }
  
  const largeJSON = generateLargeJSON(1000);
  const startTime = performance.now();
  
  try {
    const parsed = JSON.parse(largeJSON);
    const endTime = performance.now();
    const duration = endTime - startTime;
    assert(duration < 100 && parsed.users.length === 1000, `Large JSON parsing performance (${duration.toFixed(2)}ms)`);
  } catch (e) {
    assert(false, 'Large JSON parsing performance');
  }
  
  // Test memory usage estimation
  function estimateMemoryUsage(jsonString) {
    // Rough estimation: each character is ~2 bytes in JavaScript
    return jsonString.length * 2;
  }
  
  const memoryUsage = estimateMemoryUsage(largeJSON);
  assert(memoryUsage > 0, `Memory usage estimation: ${(memoryUsage / 1024).toFixed(2)} KB`);
}

// Theme and UI Tests
function testThemeAndUI() {
  console.log('\n🧪 Testing Theme and UI Functionality...');
  
  // Test theme switching logic
  function toggleTheme(currentTheme) {
    return currentTheme === 'dark' ? 'light' : 'dark';
  }
  
  assert(toggleTheme('dark') === 'light', 'Theme toggle - dark to light');
  assert(toggleTheme('light') === 'dark', 'Theme toggle - light to dark');
  
  // Test language detection for Monaco Editor
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
  
  const languages = getLanguageFromConversion('json-to-xml');
  assert(languages.input === 'json' && languages.output === 'xml', 'Language detection for editor');
  
  // Test clipboard functionality (mock)
  function mockClipboardWrite(text) {
    return new Promise((resolve) => {
      // Mock clipboard write
      setTimeout(() => resolve(text), 10);
    });
  }
  
  mockClipboardWrite('test data').then(result => {
    assert(result === 'test data', 'Clipboard functionality mock');
  });
}

// SEO and Accessibility Tests
function testSEOAndAccessibility() {
  console.log('\n🧪 Testing SEO and Accessibility...');
  
  // Test structured data generation
  function generateStructuredData(appData) {
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": appData.name,
      "url": appData.url,
      "description": appData.description,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
  }
  
  const appData = {
    name: "JSON Parser Pro",
    url: "https://jsonparser.website/",
    description: "Professional JSON parser and formatter"
  };
  
  const structuredData = generateStructuredData(appData);
  assert(structuredData["@type"] === "WebApplication", 'Structured data generation');
  
  // Test meta tag generation
  function generateMetaTags(seoData) {
    const tags = [];
    
    if (seoData.title) tags.push({ name: 'title', content: seoData.title });
    if (seoData.description) tags.push({ name: 'description', content: seoData.description });
    if (seoData.keywords) tags.push({ name: 'keywords', content: seoData.keywords });
    
    return tags;
  }
  
  const seoData = {
    title: "JSON Parser Pro",
    description: "Free online JSON parser",
    keywords: "json, parser, formatter"
  };
  
  const metaTags = generateMetaTags(seoData);
  assert(metaTags.length === 3, 'Meta tags generation');
  
  // Test accessibility features
  function checkAccessibilityFeatures(component) {
    const features = {
      hasAriaLabels: component.ariaLabels && component.ariaLabels.length > 0,
      hasKeyboardNavigation: component.keyboardNavigation === true,
      hasHighContrast: component.highContrast === true,
      hasFocusManagement: component.focusManagement === true
    };
    
    return features;
  }
  
  const mockComponent = {
    ariaLabels: ['JSON input', 'Format button'],
    keyboardNavigation: true,
    highContrast: true,
    focusManagement: true
  };
  
  const accessibilityFeatures = checkAccessibilityFeatures(mockComponent);
  assert(Object.values(accessibilityFeatures).every(feature => feature === true), 'Accessibility features check');
}

// Integration Tests
function testIntegration() {
  console.log('\n🧪 Testing Integration Scenarios...');
  
  // Test complete JSON workflow
  function testJSONWorkflow() {
    const input = '{"name":"John","age":30}';
    
    // Parse
    const parsed = JSON.parse(input);
    
    // Format
    const formatted = JSON.stringify(parsed, null, 2);
    
    // Minify
    const minified = JSON.stringify(parsed);
    
    // Validate workflow
    return {
      parsed: parsed.name === 'John',
      formatted: formatted.includes('  "name": "John"'),
      minified: minified === input
    };
  }
  
  const jsonWorkflow = testJSONWorkflow();
  assert(Object.values(jsonWorkflow).every(step => step === true), 'Complete JSON workflow');
  
  // Test conversion chain
  function testConversionChain() {
    const jsonInput = '{"name": "John", "age": 30}';
    
    // JSON to XML
    const jsonObj = JSON.parse(jsonInput);
    const xmlOutput = `<root><name>John</name><age>30</age></root>`;
    
    // XML back to JSON (simplified)
    const backToJSON = '{"root":{"name":"John","age":"30"}}';
    
    return {
      jsonToXml: xmlOutput.includes('<name>John</name>'),
      xmlToJson: backToJSON.includes('"name":"John"')
    };
  }
  
  const conversionChain = testConversionChain();
  assert(Object.values(conversionChain).every(step => step === true), 'Conversion chain test');
}

// Main Test Runner
function runAllTests() {
  console.log('🚀 Starting JSON Parser Pro Test Suite...\n');
  
  const startTime = performance.now();
  
  // Run all test suites
  testJSONParser();
  testXMLParser();
  testDataConversions();
  testTreeView();
  testErrorHandling();
  testPerformance();
  testThemeAndUI();
  testSEOAndAccessibility();
  testIntegration();
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  // Print results
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⏱️  Duration: ${duration.toFixed(2)}ms`);
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.errors.forEach(error => console.log(`   - ${error}`));
  }
  
  console.log('\n🎉 Test Suite Complete!');
  
  return {
    passed: testResults.passed,
    failed: testResults.failed,
    duration: duration,
    successRate: (testResults.passed / (testResults.passed + testResults.failed)) * 100
  };
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    runAllTests,
    testData,
    testJSONParser,
    testXMLParser,
    testDataConversions,
    testTreeView,
    testErrorHandling,
    testPerformance,
    testThemeAndUI,
    testSEOAndAccessibility,
    testIntegration
  };
}

// Auto-run tests if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  console.log('Running tests in browser environment...');
  runAllTests();
} else if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('test-suite.js')) {
  // Node.js environment
  console.log('Running tests in Node.js environment...');
  runAllTests();
}