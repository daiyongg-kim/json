# JSON Parser Pro - Usage Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [JSON Parser](#json-parser)
3. [XML Parser](#xml-parser)
4. [Data Converters](#data-converters)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Getting Started

### Accessing the Application
- **Live Demo**: [https://jsonparser.website/](https://jsonparser.website/)
- **Local Development**: `npm run dev` (after installation)

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Internet connection (for initial load and ads)

### Interface Overview
The application features a clean, responsive interface with:
- **Header**: Navigation and tool selection
- **Control Panel**: Action buttons and theme toggle
- **Main Area**: Input/output panels with Monaco Editor
- **Tree View**: Interactive data visualization
- **Footer**: Copyright and links

## JSON Parser

### Basic Usage

#### 1. Parsing JSON
```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "active": true
}
```

**Steps:**
1. Paste or type JSON in the left panel
2. View real-time validation and formatting
3. See parsed structure in the right panel tree view
4. Use action buttons for formatting operations

#### 2. Formatting JSON
**Before (minified):**
```json
{"name":"John","age":30,"email":"john@example.com"}
```

**After (formatted):**
```json
{
  "name": "John",
  "age": 30,
  "email": "john@example.com"
}
```

**How to format:**
1. Enter minified JSON
2. Click the **Format** button
3. JSON will be beautified with proper indentation

#### 3. Minifying JSON
**Before (formatted):**
```json
{
  "name": "John",
  "age": 30,
  "email": "john@example.com"
}
```

**After (minified):**
```json
{"name":"John","age":30,"email":"john@example.com"}
```

**How to minify:**
1. Enter formatted JSON
2. Click the **Minify** button
3. JSON will be compressed to minimal size

### Advanced JSON Features

#### Error Detection
The parser provides detailed error information:
- **Line number** where error occurs
- **Column position** of the error
- **Error description** explaining the issue

**Example Error:**
```
Error at line 3, column 15: Unexpected token } in JSON at position 45
```

#### File Upload
- **Supported formats**: .json files
- **Maximum size**: 10MB
- **How to use**:
  1. Click "Upload File" button
  2. Select JSON file from your computer
  3. File content loads automatically

#### Tree View Navigation
- **Expand/Collapse**: Click arrows to navigate nested structures
- **Type indicators**: Different colors for strings, numbers, booleans, null
- **Array indices**: Clearly marked with [0], [1], etc.
- **Object properties**: Displayed with proper nesting

## XML Parser

### Basic Usage

#### 1. Parsing XML
```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <user id="1">
    <name>John Doe</name>
    <email>john@example.com</email>
    <active>true</active>
  </user>
</root>
```

**Steps:**
1. Enter XML in the left panel
2. View validation results instantly
3. Explore structure in the tree view
4. Use formatting tools as needed

#### 2. XML Validation
The parser checks for:
- **Well-formed XML**: Proper tag structure
- **Matching tags**: Opening and closing tags match
- **Attribute syntax**: Proper attribute formatting
- **Character encoding**: Valid XML characters

#### 3. XML Formatting
**Before:**
```xml
<root><user><name>John</name><age>30</age></user></root>
```

**After:**
```xml
<root>
  <user>
    <name>John</name>
    <age>30</age>
  </user>
</root>
```

### XML Features

#### Attribute Handling
- Attributes are displayed in the tree view
- Proper escaping of special characters
- Support for quoted and unquoted values

#### CDATA Support
```xml
<description><![CDATA[This is <b>bold</b> text]]></description>
```

#### Namespace Support
```xml
<root xmlns:ns="http://example.com/namespace">
  <ns:element>Content</ns:element>
</root>
```

## Data Converters

### Available Conversions

#### JSON Conversions
1. **JSON to XML**
   ```json
   {"name": "John", "age": 30}
   ```
   ↓
   ```xml
   <root>
     <name>John</name>
     <age>30</age>
   </root>
   ```

2. **JSON to CSV**
   ```json
   [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
   ```
   ↓
   ```csv
   name,age
   John,30
   Jane,25
   ```

3. **JSON to YAML**
   ```json
   {"name": "John", "details": {"age": 30, "city": "NYC"}}
   ```
   ↓
   ```yaml
   name: John
   details:
     age: 30
     city: NYC
   ```

#### XML Conversions
1. **XML to JSON**
2. **XML to CSV**
3. **XML to YAML**
4. **XML to String** (minified)

#### CSV Conversions
1. **CSV to JSON**
   ```csv
   name,age,city
   John,30,NYC
   Jane,25,LA
   ```
   ↓
   ```json
   [
     {"name": "John", "age": "30", "city": "NYC"},
     {"name": "Jane", "age": "25", "city": "LA"}
   ]
   ```

2. **CSV to HTML Table**
   ```csv
   name,age
   John,30
   ```
   ↓
   ```html
   <table>
     <thead>
       <tr>
         <th>name</th>
         <th>age</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>John</td>
         <td>30</td>
       </tr>
     </tbody>
   </table>
   ```

### Using the Converter

#### Step-by-Step Process
1. **Select Conversion Type**: Choose from 18+ available conversions
2. **Enter Input Data**: Paste or type data in the left panel
3. **Click Convert**: Process the conversion
4. **View Results**: See converted data in the right panel
5. **Copy Output**: Use the copy button to get results

#### Conversion Tips
- **Validate input**: Ensure input data is properly formatted
- **Check data types**: Some conversions may change data types
- **Handle special characters**: Be aware of escaping requirements
- **Test with samples**: Try small datasets first

## Advanced Features

### Theme Switching
- **Dark Theme**: Default, easier on the eyes
- **Light Theme**: Better for printing and bright environments
- **Toggle**: Click the theme button in the top-right
- **Persistence**: Theme preference is remembered

### Monaco Editor Features
- **Syntax Highlighting**: Color-coded for different data types
- **Auto-completion**: Intelligent suggestions while typing
- **Error Highlighting**: Real-time error detection
- **Find/Replace**: Ctrl+F for search, Ctrl+H for replace
- **Multi-cursor**: Alt+Click for multiple cursors
- **Code Folding**: Collapse/expand code sections

### Keyboard Shortcuts
- **Ctrl+A**: Select all
- **Ctrl+C**: Copy
- **Ctrl+V**: Paste
- **Ctrl+Z**: Undo
- **Ctrl+Y**: Redo
- **Ctrl+F**: Find
- **Ctrl+H**: Replace
- **Tab**: Indent
- **Shift+Tab**: Unindent

### File Operations
- **Upload**: Support for JSON, XML, CSV, YAML files
- **Size Limit**: 10MB maximum file size
- **Encoding**: UTF-8 encoding support
- **Error Handling**: Clear messages for file issues

## Troubleshooting

### Common Issues

#### JSON Parsing Errors
**Problem**: "Unexpected token" error
**Solution**: 
- Check for missing commas
- Verify quote marks are properly closed
- Remove trailing commas
- Ensure proper bracket/brace matching

**Example Fix:**
```json
// ❌ Incorrect
{
  "name": "John",
  "age": 30,  // trailing comma
}

// ✅ Correct
{
  "name": "John",
  "age": 30
}
```

#### XML Parsing Errors
**Problem**: "parsererror" in output
**Solution**:
- Check all tags are properly closed
- Verify attribute syntax
- Ensure proper XML declaration
- Check for invalid characters

**Example Fix:**
```xml
<!-- ❌ Incorrect -->
<root>
  <name>John
  <age>30</age>
</root>

<!-- ✅ Correct -->
<root>
  <name>John</name>
  <age>30</age>
</root>
```

#### File Upload Issues
**Problem**: File won't upload
**Solutions**:
- Check file size (must be under 10MB)
- Verify file format is supported
- Ensure file isn't corrupted
- Try a different browser

#### Performance Issues
**Problem**: Slow processing with large files
**Solutions**:
- Break large files into smaller chunks
- Use minified format when possible
- Close other browser tabs
- Try a different browser

### Browser Compatibility
- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Internet Explorer**: Not supported

### Mobile Usage
- **Responsive Design**: Works on all screen sizes
- **Touch Support**: Tap and swipe gestures
- **Virtual Keyboard**: Optimized for mobile typing
- **Performance**: May be slower on older devices

## Best Practices

### Data Security
- **Client-side Processing**: All data stays in your browser
- **No Server Storage**: Data is never sent to external servers
- **HTTPS**: Secure connection for the application
- **Privacy**: No tracking of your data content

### Performance Optimization
- **File Size**: Keep files under 5MB for best performance
- **Browser Memory**: Close unused tabs to free memory
- **Network**: Use local development for large files
- **Caching**: Browser caches the application for faster loading

### Data Validation
- **Test Small**: Start with small data samples
- **Validate Structure**: Ensure proper data format before conversion
- **Backup Original**: Keep original data before conversion
- **Check Output**: Verify converted data is correct

### Workflow Tips
1. **Start Simple**: Begin with basic JSON/XML structures
2. **Use Tree View**: Explore complex data structures visually
3. **Format First**: Format data before sharing or storing
4. **Test Conversions**: Verify conversion results are accurate
5. **Save Work**: Copy important results to external storage

### Common Use Cases

#### API Development
- **Request/Response Testing**: Validate API payloads
- **Documentation**: Format examples for documentation
- **Debugging**: Parse error responses
- **Schema Validation**: Check data structure compliance

#### Data Migration
- **Format Conversion**: Convert between different data formats
- **Structure Analysis**: Understand data organization
- **Validation**: Ensure data integrity during migration
- **Batch Processing**: Handle multiple files systematically

#### Configuration Management
- **Config Files**: Validate and format configuration files
- **Environment Setup**: Convert configs between environments
- **Documentation**: Create readable config documentation
- **Version Control**: Format configs for better diffs

#### Learning and Education
- **JSON/XML Learning**: Understand data structure concepts
- **Syntax Practice**: Practice with different data formats
- **Error Analysis**: Learn from parsing errors
- **Best Practices**: Develop good data formatting habits

### Tips for Developers
- **Use in CI/CD**: Validate data files in build pipelines
- **Code Reviews**: Format data for better readability
- **Testing**: Generate test data in different formats
- **Documentation**: Create formatted examples for docs
- **Debugging**: Parse and analyze API responses

### Integration Ideas
- **Browser Bookmarks**: Bookmark for quick access
- **Development Workflow**: Include in daily development tools
- **Team Sharing**: Share formatted data with team members
- **Documentation**: Link to tool in project documentation
- **Training**: Use for team training on data formats