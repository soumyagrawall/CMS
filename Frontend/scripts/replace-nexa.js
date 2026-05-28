import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '../');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      if (!dirPath.includes('node_modules') && !dirPath.includes('.git') && !dirPath.includes('dist')) {
        walkDir(dirPath, callback);
      }
    } else {
      callback(path.join(dir, f));
    }
  });
}

walkDir(baseDir, function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;
    
    // Replace Lumora with Nexa (case-sensitive)
    content = content.replace(/Lumora/g, 'Nexa');
    content = content.replace(/lumora/g, 'nexa');
    
    // Remove Editorial Curation line in App.jsx
    content = content.replace(/<span[^>]*>Editorial Curation<\/span>/g, '');
    
    // Replace Premium Curation in index.html
    content = content.replace(/Nexa \| Premium Curation/g, 'Nexa');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  }
});

console.log('Finished renaming to Nexa and removing curation lines.');
