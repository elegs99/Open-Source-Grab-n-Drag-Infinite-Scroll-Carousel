/**
 * Copies built minified assets from dist/ to docs/demo/assets/ for the demo.
 * For future maintainers: run npm run build (or minify:js and minify:css) first
 * so dist/ contains the minified files before running this script.
 */
const fs = require('fs');
const path = require('path');

const sourceFiles = [
  'grab-n-drag-infinite-carousel.min.css',
  'grab-n-drag-infinite-carousel.min.js'
];

const sourceDir = path.join(__dirname, '..', 'dist');
const targetDir = path.join(__dirname, '..', 'docs', 'demo', 'assets');

// Ensure directories exist
if (!fs.existsSync(sourceDir)) {
  fs.mkdirSync(sourceDir, { recursive: true });
}
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy each file
sourceFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to ${targetPath}`);
  } else {
    console.error(`Error: ${file} not found at ${sourcePath}`);
    process.exit(1);
  }
});

console.log('Assets copied successfully!');
