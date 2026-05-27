import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MY_WORK_DIR = path.join(PUBLIC_DIR, 'my_work');
const WEB_WORK_DIR = path.join(PUBLIC_DIR, 'web_work');

const getFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
};

const createSubset = () => {
  if (!fs.existsSync(MY_WORK_DIR)) {
    console.error('Source directory does not exist:', MY_WORK_DIR);
    return;
  }

  // Create web_work if it doesn't exist, else clear it out
  if (!fs.existsSync(WEB_WORK_DIR)) {
    fs.mkdirSync(WEB_WORK_DIR, { recursive: true });
  } else {
    fs.rmSync(WEB_WORK_DIR, { recursive: true, force: true });
    fs.mkdirSync(WEB_WORK_DIR, { recursive: true });
  }

  const allFiles = getFiles(MY_WORK_DIR);
  
  // Group by category
  const categories = {};
  allFiles.forEach(file => {
    const relativePath = file.substring(PUBLIC_DIR.length).replace(/\\/g, '/');
    const parts = relativePath.split('/');
    if(parts.length > 3) {
      const category = parts[2];
      if(!categories[category]) categories[category] = [];
      
      const stat = fs.statSync(file);
      // Skip files larger than 40MB to ensure Git push works
      if (stat.size > 40 * 1024 * 1024) return;
      
      categories[category].push({
        path: file,
        size: stat.size,
        ext: path.extname(file).toLowerCase(),
        relativePath: relativePath
      });
    }
  });

  // Pick top 3 smallest images and 1 smallest video per category
  let totalCopied = 0;
  
  Object.keys(categories).forEach(cat => {
    const files = categories[cat];
    const images = files.filter(f => ['.jpg', '.jpeg', '.png', '.webp'].includes(f.ext)).sort((a, b) => a.size - b.size);
    const videos = files.filter(f => ['.mp4', '.webm'].includes(f.ext)).sort((a, b) => a.size - b.size);
    
    // Select 4 images, 1 video max per category
    const selected = [...images.slice(0, 4), ...videos.slice(0, 1)];
    
    selected.forEach(fileObj => {
      // original relative path: /my_work/CATEGORY/filename.ext
      const newRelativePath = fileObj.relativePath.replace('/my_work/', '/web_work/');
      const destPath = path.join(PUBLIC_DIR, newRelativePath);
      
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      fs.copyFileSync(fileObj.path, destPath);
      totalCopied++;
    });
  });

  console.log(`Successfully copied ${totalCopied} optimized files to web_work folder.`);
};

createSubset();
