import { build } from 'esbuild';
import { copy } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildApp() {
  try {
    console.log('Building with esbuild...');
    
    // Create dist directory
    mkdirSync('dist', { recursive: true });
    
    // Build CSS separately first
    console.log('Building CSS...');
    await build({
      entryPoints: ['src/index.css'],
      bundle: true,
      outfile: 'dist/styles.css',
      format: 'esm',
      target: 'esnext',
      minify: true,
      sourcemap: false,
      loader: {
        '.css': 'css',
      },
    });
    
    // Build the main application - only essential files
    console.log('Building JavaScript...');
    await build({
      entryPoints: ['src/main.tsx'],
      bundle: true,
      outfile: 'dist/main.js',
      format: 'esm',
      target: 'esnext',
      minify: true,
      sourcemap: false,
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.jsx': 'jsx',
        '.js': 'js',
        '.css': 'css',
      },
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      jsx: 'automatic',
      jsxImportSource: 'react',
      // Only include essential dependencies
      external: [],
    });

    // Copy only essential public files
    try {
      await copy('public', 'dist', { 
        overwrite: true,
        filter: (src) => {
          // Skip unnecessary files
          const skipFiles = [
            'node_modules',
            '.git',
            '.vscode',
            '*.log',
            '*.md',
            'package.json',
            'package-lock.json',
            'tsconfig.json',
            'vite.config.ts',
            'tailwind.config.ts',
            'postcss.config.js',
            'eslint.config.js',
            'components.json',
            'build.js',
            'vercel-build.sh',
            '.vercelignore',
            'vercel.json'
          ];
          
          return !skipFiles.some(pattern => 
            src.includes(pattern.replace('*', ''))
          );
        }
      });
    } catch (err) {
      console.log('No public files to copy or copy failed, continuing...');
    }
    
    // Create minimal index.html with CSS link
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Times of Fashion</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.js"></script>
  </body>
</html>`;
    
    writeFileSync('dist/index.html', indexHtml);
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp();
