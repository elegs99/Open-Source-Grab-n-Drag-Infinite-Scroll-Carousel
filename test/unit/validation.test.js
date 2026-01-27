/**
 * Validation tests - migrated from test-runner.js
 * Tests file existence and structure validation
 */

const fs = require('fs');
const path = require('path');

describe('File Validation', () => {
  const projectRoot = path.join(__dirname, '..', '..');

  test('package.json exists and is valid', () => {
    const packagePath = path.join(projectRoot, 'package.json');
    
    expect(fs.existsSync(packagePath)).toBe(true);
    
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    expect(pkg.name).toBeDefined();
    expect(pkg.version).toBeDefined();
    expect(pkg.main).toBeDefined();
    expect(typeof pkg.name).toBe('string');
    expect(typeof pkg.version).toBe('string');
    expect(typeof pkg.main).toBe('string');
  });

  test('TypeScript definitions file exists', () => {
    const dtsPath = path.join(projectRoot, 'grab-n-drag-infinite-carousel.d.ts');
    
    expect(fs.existsSync(dtsPath)).toBe(true);
  });

  test('Main JavaScript file exists and is not empty', () => {
    const jsPath = path.join(projectRoot, 'grab-n-drag-infinite-carousel.js');
    
    expect(fs.existsSync(jsPath)).toBe(true);
    
    const stats = fs.statSync(jsPath);
    expect(stats.size).toBeGreaterThan(0);
  });

  test('CSS file exists', () => {
    const cssPath = path.join(projectRoot, 'grab-n-drag-infinite-carousel.css');
    
    expect(fs.existsSync(cssPath)).toBe(true);
  });

  test('JavaScript file contains InfiniteScrollCarousel class', () => {
    const jsPath = path.join(projectRoot, 'grab-n-drag-infinite-carousel.js');
    const content = fs.readFileSync(jsPath, 'utf8');
    
    expect(content).toContain('InfiniteScrollCarousel');
  });
});
