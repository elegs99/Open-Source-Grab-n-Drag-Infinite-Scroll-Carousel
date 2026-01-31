/**
 * Jest setup file to load InfiniteScrollCarousel
 * 
 * Note: This file loads the carousel for use in tests.
 * For coverage to work properly, the source file must be required/imported
 * during test execution, not just in setup. Jest instruments code when it's
 * actually executed during tests.
 */

const path = require('path');

// Load the carousel script using require
// The script is a UMD module that will assign to module.exports when module exists
const scriptPath = path.resolve(__dirname, '..', 'grab-n-drag-infinite-carousel.js');

// Save the original module.exports
const originalExports = module.exports;

// Temporarily set module.exports to empty object so the UMD script can assign to it
module.exports = {};

// Use require to load the script
// Delete from cache first to ensure fresh load if already cached
const resolvedPath = require.resolve(scriptPath);
if (require.cache[resolvedPath]) {
  delete require.cache[resolvedPath];
}

// Require the script - the UMD wrapper will assign InfiniteScrollCarousel to module.exports
// This will be instrumented by Jest when coverage is enabled
const InfiniteScrollCarousel = require(scriptPath);

// Restore original module.exports (Jest needs it for this setup file)
module.exports = originalExports;

// Also ensure it's on window (the script should have done this in the else branch)
if (typeof window !== 'undefined') {
  window.InfiniteScrollCarousel = InfiniteScrollCarousel;
}

// Make InfiniteScrollCarousel available globally for all tests
global.InfiniteScrollCarousel = InfiniteScrollCarousel;

// Verify it's loaded and is a constructor
if (!global.InfiniteScrollCarousel || typeof global.InfiniteScrollCarousel !== 'function') {
  throw new Error('Failed to load InfiniteScrollCarousel from script. Found: ' + typeof global.InfiniteScrollCarousel);
}
