import fs from 'fs';

const filePath = 'c:/NEXA/Lumora/Frontend/src/App.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace instances of text-[#E0D9D9] with text-[#120E0E] when they are alongside bg-primary
content = content.replace(/bg-primary([^"]*)text-\[#E0D9D9\]/g, 'bg-primary$1text-[#120E0E]');
content = content.replace(/text-\[#E0D9D9\]([^"]*)bg-primary/g, 'text-[#120E0E]$1bg-primary');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('App.jsx text color contrast fixed for buttons!');
