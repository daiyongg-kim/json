#!/usr/bin/env node

/**
 * JSON Parser Pro - Test Runner Script
 * 
 * Simple command-line test runner for the JSON Parser Pro project.
 * Usage: node test/run-tests.js [options]
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function printHeader() {
  console.log(colorize('\n🧪 JSON Parser Pro Test Runner', 'cyan'));
  console.log(colorize('=====================================', 'cyan'));
  console.log('Available test suites:\n');
  console.log(colorize('1. Node.js Test Suite', 'green') + ' - Tests core functionality');
  console.log(colorize('2. Browser Test Suite', 'yellow') + ' - Tests browser-specific features');
  console.log(colorize('3. Component Tests', 'blue') + ' - Tests React components');
  console.log(colorize('4. All Tests', 'magenta') + ' - Runs all available tests\n');
}

function runNodeTests() {
  console.log(colorize('\n🚀 Running Node.js Test Suite...', 'green'));
  console.log(colorize('=====================================', 'green'));
  
  const nodeTestPath = path.join(__dirname, 'node-test-suite.js');
  
  if (!fs.existsSync(nodeTestPath)) {
    console.log(colorize('❌ Node.js test suite not found!', 'red'));
    return Promise.reject(new Error('Test file not found'));
  }
  
  return new Promise((resolve, reject) => {
    const child = spawn('node', [nodeTestPath], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(colorize('\n✅ Node.js tests completed successfully!', 'green'));
        resolve(code);
      } else {
        console.log(colorize(`\n❌ Node.js tests failed with exit code ${code}`, 'red'));
        reject(new Error(`Tests failed with exit code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      console.log(colorize(`\n❌ Error running Node.js tests: ${error.message}`, 'red'));
      reject(error);
    });
  });
}

function openBrowserTests() {
  console.log(colorize('\n🌐 Opening Browser Test Suite...', 'yellow'));
  console.log(colorize('=====================================', 'yellow'));
  
  const testHtmlPath = path.join(__dirname, 'run-tests.html');
  
  if (!fs.existsSync(testHtmlPath)) {
    console.log(colorize('❌ Browser test suite not found!', 'red'));
    return Promise.reject(new Error('Test HTML file not found'));
  }
  
  const absolutePath = path.resolve(testHtmlPath);
  const fileUrl = `file://${absolutePath}`;
  
  console.log(colorize(`📂 Test file location: ${testHtmlPath}`, 'blue'));
  console.log(colorize(`🔗 Open in browser: ${fileUrl}`, 'blue'));
  
  // Try to open in default browser (cross-platform)
  const open = require('child_process').spawn;
  let command, args;
  
  switch (process.platform) {
    case 'darwin': // macOS
      command = 'open';
      args = [fileUrl];
      break;
    case 'win32': // Windows
      command = 'start';
      args = ['', fileUrl];
      break;
    default: // Linux and others
      command = 'xdg-open';
      args = [fileUrl];
      break;
  }
  
  try {
    const child = open(command, args, { detached: true, stdio: 'ignore' });
    child.unref();
    console.log(colorize('✅ Browser test suite opened successfully!', 'green'));
    return Promise.resolve();
  } catch (error) {
    console.log(colorize('⚠️  Could not auto-open browser. Please open manually:', 'yellow'));
    console.log(colorize(fileUrl, 'cyan'));
    return Promise.resolve();
  }
}

function showTestFiles() {
  console.log(colorize('\n📁 Available Test Files:', 'cyan'));
  console.log(colorize('========================', 'cyan'));
  
  const testDir = __dirname;
  const testFiles = fs.readdirSync(testDir).filter(file => 
    file.endsWith('.js') || file.endsWith('.html')
  );
  
  testFiles.forEach(file => {
    const filePath = path.join(testDir, file);
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(2);
    
    if (file.endsWith('.js')) {
      console.log(colorize(`📄 ${file}`, 'green') + ` (${size} KB)`);
    } else if (file.endsWith('.html')) {
      console.log(colorize(`🌐 ${file}`, 'yellow') + ` (${size} KB)`);
    }
  });
  
  console.log();
}

function showUsage() {
  console.log(colorize('\nUsage:', 'cyan'));
  console.log('  node test/run-tests.js [command]');
  console.log('\nCommands:');
  console.log(colorize('  node', 'green') + '     Run Node.js test suite');
  console.log(colorize('  browser', 'yellow') + '  Open browser test suite');
  console.log(colorize('  files', 'blue') + '    Show available test files');
  console.log(colorize('  help', 'magenta') + '     Show this help message');
  console.log('\nExamples:');
  console.log('  node test/run-tests.js node');
  console.log('  node test/run-tests.js browser');
  console.log('  node test/run-tests.js files\n');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  printHeader();
  
  try {
    switch (command.toLowerCase()) {
      case 'node':
      case 'n':
        await runNodeTests();
        break;
        
      case 'browser':
      case 'b':
        await openBrowserTests();
        break;
        
      case 'files':
      case 'f':
        showTestFiles();
        break;
        
      case 'all':
      case 'a':
        console.log(colorize('🚀 Running all available tests...', 'magenta'));
        await runNodeTests();
        await openBrowserTests();
        break;
        
      case 'help':
      case 'h':
      case '--help':
      case '-h':
      default:
        showUsage();
        break;
    }
  } catch (error) {
    console.log(colorize(`\n❌ Error: ${error.message}`, 'red'));
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log(colorize('\n\n👋 Test runner interrupted. Goodbye!', 'yellow'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(colorize('\n\n👋 Test runner terminated. Goodbye!', 'yellow'));
  process.exit(0);
});

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error(colorize(`\n❌ Unexpected error: ${error.message}`, 'red'));
    process.exit(1);
  });
}

module.exports = {
  runNodeTests,
  openBrowserTests,
  showTestFiles,
  showUsage
};