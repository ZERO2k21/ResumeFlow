#!/bin/bash
# Build script for Cloudflare Pages deployment

echo "Building Next.js application..."
npm run build

echo "Cleaning up cache files for Cloudflare Pages..."
# Remove cache directory to avoid size limits
rm -rf .next/cache
rm -rf .next/trace

echo "Build cleanup complete!"
echo "Build directory: .next"
