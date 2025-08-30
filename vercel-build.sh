#!/bin/bash

# Set environment variables to avoid Rollup native module issues
export NODE_OPTIONS="--max-old-space-size=4096"
export ROLLUP_SKIP_NATIVE=true
export VITE_SKIP_NATIVE=true

# Install dependencies
npm install

# Install esbuild globally to avoid Rollup
npm install -g esbuild

# Create dist directory
mkdir -p dist

# Copy public files
cp -r public/* dist/ 2>/dev/null || true

# Build with esbuild directly
echo "Building with esbuild..."

# Build the main entry point
esbuild src/main.tsx --bundle --minify --outfile=dist/assets/main.js --format=esm --target=esnext --loader:.tsx=tsx --loader:.ts=ts --loader:.jsx=jsx --loader:.js=js --loader:.css=css

# Create index.html
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Times of Fashion</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/main.js"></script>
  </body>
</html>
EOF

echo "Build completed successfully!"
