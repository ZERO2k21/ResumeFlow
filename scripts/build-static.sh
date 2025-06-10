#!/bin/bash
# Build script for static export deployment

echo "Building static export for deployment..."

# Temporarily move API routes to avoid server functions
if [ -d "src/app/api" ]; then
    echo "Temporarily moving API routes..."
    mv src/app/api src/app/api_backup
fi

# Build static export
echo "Running Next.js static export..."
npm run build

# Restore API routes
if [ -d "src/app/api_backup" ]; then
    echo "Restoring API routes..."
    mv src/app/api_backup src/app/api
fi

echo "Static build complete!"
echo "Output directory: out/"
