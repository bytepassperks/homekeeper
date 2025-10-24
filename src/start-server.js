// Simple server starter for Render deployment
import { spawn } from 'child_process';

const port = process.env.PORT || 3000;

console.log(`Starting preview server on port ${port}...`);

const child = spawn('npx', ['vite', 'preview', '--host', '0.0.0.0', '--port', port], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Server exited with code ${code}`);
    process.exit(code);
  }
});
