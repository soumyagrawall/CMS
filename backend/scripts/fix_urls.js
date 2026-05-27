const fs = require('fs');
const path = require('path');

const fixFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let count = 0;

  // Regex to match the image object and extract tags
  // We'll replace just the imageUrl part.
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('imageUrl: "https://images.unsplash.com/photo-')) {
      // Find tags in the same line (if any)
      const tagsMatch = line.match(/tags:\s*\[(.*?)\]/);
      let keywords = "india";
      if (tagsMatch) {
        const rawTags = tagsMatch[1].split(',').map(t => t.replace(/"/g, '').trim()).filter(Boolean);
        if (rawTags.length > 0) {
          keywords = rawTags.slice(0, 2).join(',');
        }
      }
      
      // Simple hash to use as a lock
      const hash = Math.abs((i * 31 + count * 17) % 5000) + 1;
      
      const newUrl = `https://loremflickr.com/800/1000/${keywords}?lock=${hash}`;
      lines[i] = line.replace(/imageUrl:\s*"https:\/\/images\.unsplash\.com\/photo-[^"]+"/, `imageUrl: "${newUrl}"`);
      count++;
    }
  }

  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`Updated ${count} URLs in ${path.basename(filePath)}`);
};

fixFile(path.join(__dirname, '../src/utils/demoStore.js'));
fixFile(path.join(__dirname, '../src/controllers/seedController.js'));
