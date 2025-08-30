import { build } from 'esbuild';
import { copy } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildApp() {
  try {
    console.log('Building with esbuild...');
    
    // Create dist directory
    mkdirSync('dist', { recursive: true });
    
    // Copy CSS file directly with basic Tailwind processing
    console.log('Processing CSS...');
    try {
      const cssContent = readFileSync('src/index.css', 'utf8');
      
      // Basic Tailwind processing - replace directives with actual CSS
      let processedCSS = cssContent
        .replace('@tailwind base;', `
/* Tailwind Base */
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}
::before,
::after {
  --tw-content: '';
}
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
  font-variation-settings: normal;
}
body {
  margin: 0;
  line-height: inherit;
}
`)
        .replace('@tailwind components;', `
/* Tailwind Components */
`)
        .replace('@tailwind utilities;', `
/* Tailwind Utilities */
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.table { display: table; }
.table-row { display: table-row; }
.table-cell { display: table-cell; }
.contents { display: contents; }
.list-item { display: list-item; }
.inline-flex { display: inline-flex; }
.inline-grid { display: inline-grid; }
.flow-root { display: flow-root; }
.absolute { position: absolute; }
.relative { position: relative; }
.fixed { position: fixed; }
.sticky { position: sticky; }
.static { position: static; }
.inset-0 { top: 0px; right: 0px; bottom: 0px; left: 0px; }
.inset-x-0 { left: 0px; right: 0px; }
.inset-y-0 { top: 0px; bottom: 0px; }
.top-0 { top: 0px; }
.right-0 { right: 0px; }
.bottom-0 { bottom: 0px; }
.left-0 { left: 0px; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.min-h-screen { min-height: 100vh; }
.bg-white { background-color: rgb(255 255 255); }
.bg-black { background-color: rgb(0 0 0); }
.text-white { color: rgb(255 255 255); }
.text-black { color: rgb(0 0 0); }
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.font-bold { font-weight: 700; }
.font-normal { font-weight: 400; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.m-4 { margin: 1rem; }
.m-6 { margin: 1.5rem; }
.m-8 { margin: 2rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.my-4 { margin-top: 1rem; margin-bottom: 1rem; }
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.container { width: 100%; }
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
@media (min-width: 1536px) { .container { max-width: 1536px; } }
`);
      
      writeFileSync('dist/styles.css', processedCSS);
      console.log('CSS processed successfully');
    } catch (error) {
      console.log('CSS processing failed, copying original file...');
      await copy('src/index.css', 'dist/styles.css');
    }
    
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
