const fs = require('fs');
const path = require('path');

const sourceFiles = [
  'grab-n-drag-infinite-carousel.min.css',
  'grab-n-drag-infinite-carousel.min.js'
];

const targetDir = path.join(__dirname, 'docs', 'demo', 'assets');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy each file
sourceFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
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
