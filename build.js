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
/* Display */
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

/* Position */
.absolute { position: absolute; }
.relative { position: relative; }
.fixed { position: fixed; }
.sticky { position: sticky; }
.static { position: static; }

/* Layout */
.inset-0 { top: 0px; right: 0px; bottom: 0px; left: 0px; }
.inset-x-0 { left: 0px; right: 0px; }
.inset-y-0 { top: 0px; bottom: 0px; }
.top-0 { top: 0px; }
.right-0 { right: 0px; }
.bottom-0 { bottom: 0px; }
.left-0 { left: 0px; }

/* Sizing */
.w-full { width: 100%; }
.w-screen { width: 100vw; }
.h-full { height: 100%; }
.h-screen { height: 100vh; }
.min-h-screen { min-height: 100vh; }
.max-w-full { max-width: 100%; }
.max-w-screen-xl { max-width: 1280px; }
.max-w-screen-lg { max-width: 1024px; }
.max-w-screen-md { max-width: 768px; }
.max-w-screen-sm { max-width: 640px; }

/* Flexbox */
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-center { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }
.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-initial { flex: 0 1 auto; }
.flex-none { flex: none; }

/* Grid */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }

/* Spacing */
.p-0 { padding: 0px; }
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-5 { padding: 1.25rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.p-10 { padding: 2.5rem; }
.p-12 { padding: 3rem; }
.p-16 { padding: 4rem; }
.p-20 { padding: 5rem; }
.p-24 { padding: 6rem; }
.p-32 { padding: 8rem; }

.px-0 { padding-left: 0px; padding-right: 0px; }
.px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
.px-12 { padding-left: 3rem; padding-right: 3rem; }
.px-16 { padding-left: 4rem; padding-right: 4rem; }
.px-20 { padding-left: 5rem; padding-right: 5rem; }
.px-24 { padding-left: 6rem; padding-right: 6rem; }
.px-32 { padding-left: 8rem; padding-right: 8rem; }

.py-0 { padding-top: 0px; padding-bottom: 0px; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.py-20 { padding-top: 5rem; padding-bottom: 5rem; }
.py-24 { padding-top: 6rem; padding-bottom: 6rem; }
.py-32 { padding-top: 8rem; padding-bottom: 8rem; }

.m-0 { margin: 0px; }
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 0.75rem; }
.m-4 { margin: 1rem; }
.m-5 { margin: 1.25rem; }
.m-6 { margin: 1.5rem; }
.m-8 { margin: 2rem; }
.m-10 { margin: 2.5rem; }
.m-12 { margin: 3rem; }
.m-16 { margin: 4rem; }
.m-20 { margin: 5rem; }
.m-24 { margin: 6rem; }
.m-32 { margin: 8rem; }

.mx-auto { margin-left: auto; margin-right: auto; }
.my-auto { margin-top: auto; margin-bottom: auto; }

/* Colors */
.bg-white { background-color: rgb(255 255 255); }
.bg-black { background-color: rgb(0 0 0); }
.bg-gray-50 { background-color: rgb(249 250 251); }
.bg-gray-100 { background-color: rgb(243 244 246); }
.bg-gray-200 { background-color: rgb(229 231 235); }
.bg-gray-300 { background-color: rgb(209 213 219); }
.bg-gray-400 { background-color: rgb(156 163 175); }
.bg-gray-500 { background-color: rgb(107 114 128); }
.bg-gray-600 { background-color: rgb(75 85 99); }
.bg-gray-700 { background-color: rgb(55 65 81); }
.bg-gray-800 { background-color: rgb(31 41 55); }
.bg-gray-900 { background-color: rgb(17 24 39); }

.text-white { color: rgb(255 255 255); }
.text-black { color: rgb(0 0 0); }
.text-gray-50 { color: rgb(249 250 251); }
.text-gray-100 { color: rgb(243 244 246); }
.text-gray-200 { color: rgb(229 231 235); }
.text-gray-300 { color: rgb(209 213 219); }
.text-gray-400 { color: rgb(156 163 175); }
.text-gray-500 { color: rgb(107 114 128); }
.text-gray-600 { color: rgb(75 85 99); }
.text-gray-700 { color: rgb(55 65 81); }
.text-gray-800 { color: rgb(31 41 55); }
.text-gray-900 { color: rgb(17 24 39); }

/* Typography */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

.font-thin { font-weight: 100; }
.font-extralight { font-weight: 200; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }

.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-5xl { font-size: 3rem; line-height: 1; }
.text-6xl { font-size: 3.75rem; line-height: 1; }

/* Borders */
.rounded { border-radius: 0.25rem; }
.rounded-sm { border-radius: 0.125rem; }
.rounded-md { border-radius: 0.375rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-3xl { border-radius: 1.5rem; }
.rounded-full { border-radius: 9999px; }

/* Shadows */
.shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }

/* Container */
.container { width: 100%; }
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
@media (min-width: 1536px) { .container { max-width: 1536px; } }

/* Z-index */
.z-0 { z-index: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-30 { z-index: 30; }
.z-40 { z-index: 40; }
.z-50 { z-index: 50; }
.z-auto { z-index: auto; }

/* Overflow */
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.overflow-scroll { overflow: scroll; }
.overflow-x-auto { overflow-x: auto; }
.overflow-y-auto { overflow-y: auto; }

/* Cursor */
.cursor-pointer { cursor: pointer; }
.cursor-default { cursor: default; }
.cursor-not-allowed { cursor: not-allowed; }

/* User select */
.select-none { user-select: none; }
.select-text { user-select: text; }
.select-all { user-select: all; }
.select-auto { user-select: auto; }
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
