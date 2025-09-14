# JSON Parser Pro - Test Suite

This directory contains comprehensive tests for the JSON Parser Pro application.

## 📁 Test Files

### Core Test Suites
- **`node-test-suite.js`** - Node.js compatible tests for core functionality
- **`test-suite.js`** - Browser-based tests (original comprehensive suite)
- **`component-tests.js`** - React component-specific tests

### Test Runners
- **`run-tests.js`** - Command-line test runner with multiple options
- **`run-tests.html`** - Interactive browser-based test runner

## 🚀 Running Tests

### Command Line (Recommended)

```bash
# Run Node.js tests (fastest, most reliable)
npm test
# or
node test/run-tests.js node

# Open browser test suite
npm run test:browser
# or
node test/run-tests.js browser

# Run all tests
npm run test:all
# or
node test/run-tests.js all

# Show available test files
npm run test:files
# or
node test/run-tests.js files
```

### Browser Testing

1. Open `test/run-tests.html` in your browser
2. Click "Run All Tests" to execute the full test suite
3. View real-time results with statistics and error reporting

## 📊 Test Coverage

### Current Test Results
- **✅ Passed**: 66 tests
- **❌ Failed**: 1 test
- **📈 Success Rate**: 98.5%

### Test Categories

#### 1. Project Structure (19 tests)
- File existence validation
- Package.json configuration
- Dependency verification
- Script availability

#### 2. JSON Functionality (9 tests)
- Valid JSON parsing (simple, nested, array, complex)
- Invalid JSON error handling
- JSON formatting and minification

#### 3. Data Conversion Logic (4 tests)
- JSON to XML conversion
- CSV parsing and conversion
- YAML parsing (simplified)

#### 4. Component Structure (12 tests)
- TypeScript interfaces
- React hooks usage
- Component functionality
- AdSense integration

#### 5. Configuration (6 tests)
- Next.js configuration
- TypeScript configuration
- AdSense configuration

#### 6. Error Handling (4 tests)
- JSON error position detection
- File size validation
- Input sanitization

#### 7. Performance (2 tests)
- Large JSON parsing performance
- Memory usage estimation

#### 8. UI Logic (6 tests)
- Theme switching
- Language detection
- Conversion type validation

#### 9. SEO & Accessibility (4 tests)
- Structured data generation
- Meta tags generation

## 🔧 Test Development

### Adding New Tests

1. **Node.js Tests**: Add to `node-test-suite.js`
   ```javascript
   function testNewFeature() {
     console.log('\n🧪 Testing New Feature...');
     assert(condition, 'Test description');
   }
   ```

2. **Browser Tests**: Add to `test-suite.js` or `component-tests.js`
   ```javascript
   function testBrowserFeature() {
     // Browser-specific tests using DOM APIs
   }
   ```

### Test Utilities

```javascript
// Assertion helpers
assert(condition, message)          // Pass/fail assertion
assertThrows(fn, message)          // Expect error assertion

// Test data
testData.validJSON.simple          // Valid JSON samples
testData.invalidJSON.syntax        // Invalid JSON samples
testData.csvData.simple           // CSV test data
testData.yamlData.simple          // YAML test data
```

## 🐛 Known Issues

### Failed Tests
1. **JSON error position detection** - Browser vs Node.js error message format differences

### Limitations
- XML parsing tests require browser DOM APIs
- Some Monaco Editor features can't be tested in Node.js
- AdSense functionality requires browser environment

## 📈 Performance Benchmarks

### Current Performance
- **Large JSON parsing**: ~0.2ms for 1000 records
- **Memory usage**: ~70KB for test data
- **Test execution**: ~5ms for full Node.js suite

### Performance Targets
- JSON parsing: < 100ms for files up to 10MB
- Memory usage: < 50MB for large files
- Test execution: < 10ms for Node.js suite

## 🔍 Debugging Tests

### Verbose Output
```bash
# Run with detailed output
DEBUG=1 node test/node-test-suite.js

# Check specific test category
node -e "require('./test/node-test-suite.js').testJSONFunctionality()"
```

### Browser Debugging
1. Open browser developer tools
2. Run `test/run-tests.html`
3. Check console for detailed error messages
4. Use breakpoints in test functions

## 📝 Test Maintenance

### Regular Tasks
- [ ] Update test data with new edge cases
- [ ] Add tests for new features
- [ ] Monitor performance benchmarks
- [ ] Update browser compatibility tests

### Before Releases
- [ ] Run full test suite
- [ ] Check performance benchmarks
- [ ] Validate browser compatibility
- [ ] Update test documentation

## 🤝 Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure tests pass in both Node.js and browser
3. Update test documentation
4. Maintain >95% success rate

### Test Guidelines
- Use descriptive test names
- Include both positive and negative test cases
- Test edge cases and error conditions
- Keep tests independent and isolated
- Document complex test logic

## 📚 Resources

- [Jest Documentation](https://jestjs.io/) - For advanced testing patterns
- [Testing Library](https://testing-library.com/) - For React component testing
- [Node.js Testing](https://nodejs.org/api/test.html) - Built-in Node.js testing
- [Browser Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing) - Cross-browser testing guide