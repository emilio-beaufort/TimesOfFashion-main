#!/bin/bash

# Set environment variables to avoid Rollup native module issues
export NODE_OPTIONS="--max-old-space-size=4096"
export ROLLUP_SKIP_NATIVE=true

# Install dependencies
npm install

# Build the project
npm run build

echo "Build completed successfully!"
