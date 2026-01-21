/**
 * Simple test runner for InfiniteScrollCarousel
 * 
 * This is a basic test setup that can be run with Node.js.
 * For more comprehensive testing, consider using a framework like Jest or Vitest.
 */

// Simple test framework
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🧪 Running tests...\n');

    for (const { name, fn } of this.tests) {
      try {
        await fn();
        console.log(`✅ ${name}`);
        this.passed++;
      } catch (error) {
        console.error(`❌ ${name}`);
        console.error(`   Error: ${error.message}`);
        if (error.stack) {
          console.error(`   ${error.stack.split('\n')[1]}`);
        }
        this.failed++;
      }
    }

    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
    process.exit(this.failed > 0 ? 1 : 0);
  }
}

const runner = new TestRunner();

// Basic validation tests
runner.test('package.json exists and is valid', () => {
  const fs = require('fs');
  const path = require('path');
  
  const packagePath = path.join(__dirname, '..', 'package.json');
  if (!fs.existsSync(packagePath)) {
    throw new Error('package.json not found');
  }
  
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (!pkg.name || !pkg.version || !pkg.main) {
    throw new Error('package.json missing required fields');
  }
  
  return true;
});

runner.test('TypeScript definitions file exists', () => {
  const fs = require('fs');
  const path = require('path');
  
  const dtsPath = path.join(__dirname, '..', 'grab-n-drag-infinite-carousel.d.ts');
  if (!fs.existsSync(dtsPath)) {
    throw new Error('TypeScript definitions file not found');
  }
  
  return true;
});

runner.test('Main JavaScript file exists', () => {
  const fs = require('fs');
  const path = require('path');
  
  const jsPath = path.join(__dirname, '..', 'grab-n-drag-infinite-carousel.js');
  if (!fs.existsSync(jsPath)) {
    throw new Error('Main JavaScript file not found');
  }
  
  // Check file is not empty
  const stats = fs.statSync(jsPath);
  if (stats.size === 0) {
    throw new Error('Main JavaScript file is empty');
  }
  
  return true;
});

runner.test('CSS file exists', () => {
  const fs = require('fs');
  const path = require('path');
  
  const cssPath = path.join(__dirname, '..', 'grab-n-drag-infinite-carousel.css');
  if (!fs.existsSync(cssPath)) {
    throw new Error('CSS file not found');
  }
  
  return true;
});

runner.test('JavaScript file contains InfiniteScrollCarousel class', () => {
  const fs = require('fs');
  const path = require('path');
  
  const jsPath = path.join(__dirname, '..', 'grab-n-drag-infinite-carousel.js');
  const content = fs.readFileSync(jsPath, 'utf8');
  
  if (!content.includes('InfiniteScrollCarousel')) {
    throw new Error('JavaScript file does not contain InfiniteScrollCarousel class');
  }
  
  return true;
});

// Run tests
runner.run();
