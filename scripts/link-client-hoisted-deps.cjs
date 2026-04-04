const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const clientModules = path.join(root, 'client', 'node_modules');
const rootModules = path.join(root, 'node_modules');
const names = ['react-router-dom', 'react-router', 'lucide-react'];

if (!fs.existsSync(clientModules) || !fs.existsSync(rootModules)) {
  process.exit(0);
}

for (const name of names) {
  const src = path.join(rootModules, name);
  const dest = path.join(clientModules, name);
  if (!fs.existsSync(src)) continue;
  try {
    fs.unlinkSync(dest);
  } catch {
    console.error(`Error unlinking ${dest}`);
  }
  try {
    fs.symlinkSync(path.relative(clientModules, src), dest, 'dir');
  } catch {
    console.error(`Error symlinking ${dest}`);
  }
}
