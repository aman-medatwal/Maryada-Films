import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MY_WORK_DIR = path.join(PUBLIC_DIR, 'web_work');

const getFiles = (dir) => {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
};

const generateData = () => {
  if (!fs.existsSync(MY_WORK_DIR)) {
    console.error('Directory does not exist:', MY_WORK_DIR);
    return;
  }

  const allFiles = getFiles(MY_WORK_DIR);
  
  const categories = {};

  allFiles.forEach(file => {
    // get relative path from public directory
    const relativePath = file.substring(PUBLIC_DIR.length).replace(/\\/g, '/');
    
    // Extract category name which is the first folder inside my_work
    const parts = relativePath.split('/');
    if(parts.length > 3) {
       // example: /my_work/CINEMATIC/01.mp4 => parts are ['', 'my_work', 'CINEMATIC', '01.mp4']
       const category = parts[2];
       if(!categories[category]) categories[category] = [];
       
       const ext = path.extname(file).toLowerCase();
       let type = 'image';
       if(['.mp4', '.mov', '.webm', '.avi'].includes(ext)) {
         type = 'video';
       } else if(['.pdf'].includes(ext)) {
         type = 'document';
       }
       
       categories[category].push({
         src: relativePath,
         type: type,
         filename: path.basename(file)
       });
    }
  });

  const outputContent = `export const portfolioData = ${JSON.stringify(categories, null, 2)};\n`;
  
  const dataDir = path.join(process.cwd(), 'src', 'data');
  if(!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  fs.writeFileSync(path.join(dataDir, 'portfolioData.js'), outputContent, 'utf-8');
  console.log('portfolioData.js generated successfully!');
};

generateData();
