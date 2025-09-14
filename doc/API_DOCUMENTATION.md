# JSON Parser Pro - API Documentation

## Component APIs

### JSONParser Component

#### Props
```typescript
interface JSONParserProps {
  // No props - self-contained component
}
```

#### State Management
```typescript
const [inputJSON, setInputJSON] = useState<string>('');
const [error, setError] = useState<string | null>(null);
const [theme, setTheme] = useState<'dark' | 'light'>('dark');
```

#### Key Methods
- `handleInputChange(value: string | undefined)` - Updates JSON input
- `handleFormat()` - Formats JSON with proper indentation
- `handleMinify()` - Minifies JSON by removing whitespace
- `handleClear()` - Clears input and resets state
- `handleCopy()` - Copies formatted JSON to clipboard
- `handleFileUpload(event: React.ChangeEvent<HTMLInputElement>)` - Handles file uploads
- `toggleTheme()` - Switches between dark/light themes

### XMLParser Component

#### Props
```typescript
interface XMLParserProps {
  // No props - self-contained component
}
```

#### State Management
```typescript
const [inputXML, setInputXML] = useState<string>('');
const [error, setError] = useState<string | null>(null);
const [theme, setTheme] = useState<'dark' | 'light'>('dark');
```

#### Key Methods
- `handleInputChange(value: string | undefined)` - Updates XML input
- `handleFormat()` - Formats XML with proper indentation
- `handleMinify()` - Minifies XML by removing whitespace
- `handleClear()` - Clears input and resets state
- `handleCopy()` - Copies formatted XML to clipboard
- `handleFileUpload(event: React.ChangeEvent<HTMLInputElement>)` - Handles file uploads
- `toggleTheme()` - Switches between dark/light themes

### Converters Component

#### Props
```typescript
interface ConvertersProps {
  // No props - self-contained component
}
```

#### Conversion Types
```typescript
type ConversionType = 
  | 'json-to-xml' | 'json-to-csv' | 'json-to-yaml' | 'json-to-tsv' | 'json-to-string'
  | 'xml-to-json' | 'xml-to-csv' | 'xml-to-string' | 'xml-to-yaml'
  | 'rss-to-json'
  | 'yaml-to-json' | 'yaml-to-xml' | 'yaml-to-csv'
  | 'csv-to-json' | 'csv-to-xml' | 'csv-to-yaml' | 'csv-to-html'
  | 'string-to-json';
```

#### State Management
```typescript
const [inputData, setInputData] = useState<string>('');
const [outputData, setOutputData] = useState<string>('');
const [selectedConversion, setSelectedConversion] = useState<ConversionType>('json-to-xml');
const [error, setError] = useState<string | null>(null);
const [theme, setTheme] = useState<'dark' | 'light'>('dark');
```

#### Key Methods
- `handleConvert()` - Performs the selected data conversion
- `handleClear()` - Clears input and output data
- `handleCopy()` - Copies output data to clipboard
- `getInputLanguage()` - Returns Monaco editor language for input
- `getOutputLanguage()` - Returns Monaco editor language for output
- `toggleTheme()` - Switches between dark/light themes

#### Conversion Utilities
- `jsonToXml(obj: any, rootName?: string): string` - Converts JSON to XML
- `xmlToObject(xmlString: string): any` - Converts XML to JavaScript object
- `formatXml(xml: string): string` - Formats XML with proper indentation

### JSONTreeView Component

#### Props
```typescript
interface JSONTreeViewProps {
  data: any;
  theme: 'dark' | 'light';
  level?: number;
}
```

#### Features
- Recursive tree rendering for nested objects/arrays
- Collapsible/expandable nodes
- Type-specific styling (string, number, boolean, null)
- Theme-aware styling

### XMLTreeView Component

#### Props
```typescript
interface XMLTreeViewProps {
  xmlDoc: Document;
  theme: 'dark' | 'light';
}
```

#### Features
- DOM tree visualization
- Attribute display
- Text content rendering
- Theme-aware styling

### MonacoEditorWrapper Component

#### Props
```typescript
interface MonacoEditorWrapperProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
  theme: string;
  options?: any;
}
```

#### Features
- Syntax highlighting for multiple languages
- Auto-completion and IntelliSense
- Error detection and highlighting
- Customizable editor options

### SEO Component

#### Props
```typescript
interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  structuredData?: object;
}
```

#### Features
- Meta tags management
- Open Graph tags
- Structured data (JSON-LD)
- Canonical URLs

### AdSense Components

#### InContentAd
```typescript
interface InContentAdProps {
  // No props - uses default configuration
}
```

#### HeaderBannerAd, SidebarAd, MobileInlineAd, StickyBottomAd
```typescript
interface AdProps {
  theme?: 'dark' | 'light';
}
```

## Utility Functions

### Data Conversion Utilities

#### JSON to XML Conversion
```typescript
function jsonToXml(obj: any, rootName: string = 'root'): string
```
- Converts JavaScript objects to XML format
- Handles nested objects and arrays
- Escapes XML special characters
- Generates valid XML with proper structure

#### XML to Object Conversion
```typescript
function xmlToObject(xmlString: string): any
```
- Parses XML string to JavaScript object
- Handles attributes and text content
- Preserves XML structure in object format
- Error handling for invalid XML

#### XML Formatting
```typescript
function formatXml(xml: string): string
```
- Adds proper indentation to XML
- Formats for readability
- Preserves XML structure

### Error Handling

#### JSON Error Parsing
```typescript
// Extracts line and column information from JSON parse errors
const match = e.message.match(/position (\d+)/);
if (match) {
  const position = parseInt(match[1]);
  const lines = inputJSON.substring(0, position).split('\n');
  const lineNumber = lines.length;
  const columnNumber = lines[lines.length - 1].length + 1;
  setError(`Error at line ${lineNumber}, column ${columnNumber}: ${e.message}`);
}
```

#### XML Error Handling
```typescript
// Checks for XML parsing errors using DOMParser
const parserError = xmlDoc.querySelector('parsererror');
if (parserError) {
  const errorText = parserError.textContent || 'Invalid XML';
  setError(errorText);
  return null;
}
```

## Configuration APIs

### AdSense Configuration
```typescript
// src/config/adsenseConfig.ts
export const adsenseConfig = {
  publisherId: 'ca-pub-XXXXXXXXXX',
  slots: {
    inContent: 'XXXXXXXXXX',
    headerBanner: 'XXXXXXXXXX',
    sidebar: 'XXXXXXXXXX',
    mobileInline: 'XXXXXXXXXX',
    stickyBottom: 'XXXXXXXXXX'
  }
};
```

### Next.js Configuration
```javascript
// next.config.js
const nextConfig = {
  output: 'export',        // Static site generation
  images: {
    unoptimized: true,     // Disable image optimization for static export
  },
  basePath: '',            // Base path for deployment
  assetPrefix: '',         // Asset prefix for CDN
}
```

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]   // Path mapping for imports
    }
  }
}
```

## Hook APIs

### useAdSense Hook
```typescript
interface UseAdSenseReturn {
  isLoaded: boolean;
  error: string | null;
  loadAd: (slotId: string) => void;
}

function useAdSense(): UseAdSenseReturn
```

## Event Handling

### File Upload Events
```typescript
interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList | null;
  };
}
```

### Theme Toggle Events
```typescript
function toggleTheme(): void {
  // Updates theme state and DOM classes
  // Persists theme preference
}
```

## Error Types

### JSON Parse Errors
```typescript
interface JSONParseError extends Error {
  message: string;
  position?: number;
  lineNumber?: number;
  columnNumber?: number;
}
```

### XML Parse Errors
```typescript
interface XMLParseError extends Error {
  message: string;
  element?: Element;
}
```

### File Upload Errors
```typescript
interface FileUploadError extends Error {
  type: 'size_limit' | 'read_error' | 'invalid_format';
  maxSize?: number;
}
```