# JSON Parser Pro

![JSON Parser Pro](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A comprehensive online tool suite for JSON, XML, and data format conversions. Built with modern web technologies, featuring a clean interface, powerful parsing capabilities, and extensive format conversion options.

## 🌐 Live Demo

**[https://jsonparser.website/](https://jsonparser.website/)**

## ✨ Features

### Core Tools
- **🔧 JSON Parser & Formatter** - Parse, format, validate, and beautify JSON with tree view visualization
- **📄 XML Parser & Formatter** - Complete XML parsing, formatting, and validation capabilities
- **🔄 Data Converters** - 18+ conversion functions between multiple data formats

### Key Capabilities
- ✅ **Real-time Validation** - Instant error detection with line numbers
- 🌳 **Tree View Visualization** - Interactive tree structure for complex data
- 🎨 **Syntax Highlighting** - Monaco Editor integration for enhanced readability
- 🌗 **Dark/Light Theme** - Toggle between themes for comfortable viewing
- 📁 **File Upload Support** - Handle files up to 10MB
- 📋 **Copy to Clipboard** - One-click copying of formatted results
- ⚡ **Instant Processing** - No server round-trips, all processing client-side
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

### SEO & Performance
- 🔍 **Comprehensive SEO** - Structured data, meta tags, and optimized content
- 💰 **Google AdSense Integration** - Non-intrusive monetization
- ⚡ **Fast Loading** - Optimized performance with Next.js
- 🎯 **Accessibility** - WCAG compliant interface

## 🔄 Supported Conversions

### JSON Conversions
- JSON ↔ XML
- JSON ↔ CSV
- JSON ↔ TSV
- JSON ↔ YAML
- JSON ↔ String

### XML Conversions
- XML ↔ JSON
- XML ↔ CSV
- XML ↔ YAML
- XML ↔ String
- RSS ↔ JSON

### Additional Formats
- YAML ↔ JSON/XML/CSV
- CSV ↔ JSON/XML/YAML/HTML
- TSV ↔ JSON
- String ↔ JSON

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.1.0 | React framework with SSG/SSR |
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.0+ | Type safety |
| **TailwindCSS** | 3.3.0 | Utility-first CSS framework |
| **Monaco Editor** | 4.6.0 | Code editor (VS Code engine) |
| **js-yaml** | 4.1.0 | YAML parsing and generation |
| **PapaParse** | 5.5.3 | CSV parsing and generation |

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/daiyongg-kim/json.git
   cd json-parser-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint code analysis |

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── JSONParser.tsx   # Main JSON parser component
│   ├── XMLParser.tsx    # XML parser component
│   ├── Converters.tsx   # Data conversion utilities
│   ├── JSONTreeView.tsx # Tree visualization for JSON
│   ├── XMLTreeView.tsx  # Tree visualization for XML
│   ├── MonacoEditorWrapper.tsx # Code editor integration
│   ├── AdSense.tsx      # Advertisement components
│   └── SEO.tsx          # SEO meta tags component
├── pages/               # Next.js pages
│   ├── index.tsx        # Home page (JSON Parser)
│   ├── xml.tsx          # XML Parser page
│   ├── converters.tsx   # Data Converters page
│   ├── _app.tsx         # App wrapper
│   └── _document.tsx    # HTML document structure
├── config/              # Configuration files
│   └── adsenseConfig.ts # AdSense configuration
├── utils/               # Utility functions
│   └── adOptimization.ts # Ad optimization utilities
├── hooks/               # Custom React hooks
└── styles/              # Global styles
```

## 🎯 Usage Examples

### JSON Parsing & Formatting
```javascript
// Input: Minified JSON
{"name":"John","age":30,"city":"New York"}

// Output: Formatted JSON
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

### Data Conversion
```yaml
# JSON to YAML
Input (JSON):
{
  "users": [
    {"name": "John", "role": "admin"},
    {"name": "Jane", "role": "user"}
  ]
}

Output (YAML):
users:
  - name: John
    role: admin
  - name: Jane
    role: user
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Manual Build
```bash
npm run build
npm run start
```

### Static Export
```bash
npm run build
# Files generated in 'out' directory
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add appropriate error handling
- Update documentation for new features
- Ensure responsive design compatibility

## 🐛 Bug Reports & Feature Requests

- **Bug Reports**: [Open an issue](https://github.com/daiyongg-kim/json/issues) with detailed reproduction steps
- **Feature Requests**: [Start a discussion](https://github.com/daiyongg-kim/json/discussions) to propose new features

## 📊 Performance

- ⚡ **Loading Speed**: < 2 seconds initial load
- 📱 **Mobile Optimized**: Responsive design for all devices  
- 🔄 **Real-time Processing**: Instant validation and formatting
- 💾 **File Handling**: Support for files up to 10MB
- 🎯 **Lighthouse Score**: 95+ in all categories

## 🔐 Privacy & Security

- 🛡️ **Client-side Processing**: All data processing happens in your browser
- 🚫 **No Data Collection**: We don't store or transmit your data
- 🔒 **HTTPS**: Secure connection for all communications
- 📱 **Offline Capable**: Core functionality works without internet

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Powerful code editor
- [PapaParse](https://www.papaparse.com/) - Excellent CSV parsing library
- [js-yaml](https://github.com/nodeca/js-yaml) - JavaScript YAML parser
- [Next.js](https://nextjs.org/) - Amazing React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📈 Roadmap

- [ ] Additional data format support (TOML, INI)
- [ ] Batch file processing
- [ ] API endpoint for programmatic access
- [ ] Custom validation schemas
- [ ] Export to multiple formats simultaneously
- [ ] Advanced query capabilities (JSONPath, XPath)
- [ ] Plugin system for custom converters

---

<div align="center">

**[Visit JSON Parser Pro](https://jsonparser.website/) • [Report Bug](https://github.com/daiyongg-kim/json/issues) • [Request Feature](https://github.com/daiyongg-kim/json/discussions)**

Made with ❤️ for developers worldwide

</div>