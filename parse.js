const fs = require('fs');
const content = fs.readFileSync('prompt.txt', 'utf8');

// Find the boundaries
const jsStart = content.indexOf('(function(){const y=document.createElement("link")');
const cssStart = content.indexOf('/*! tailwindcss');

if (jsStart !== -1 && cssStart !== -1) {
  const jsContent = content.substring(jsStart, cssStart);
  const cssContent = content.substring(cssStart);
  
  fs.writeFileSync('src/main.tsx', "import './index.css';\n" + jsContent);
  fs.writeFileSync('src/index.css', cssContent);
  console.log('Successfully extracted and saved JS and CSS.');
} else {
  console.log('Could not find JS or CSS boundaries.');
}
