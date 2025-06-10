# Static build script for Cloudflare Pages
# Temporarily moves API routes during build to ensure pure static export

Write-Host "Preparing for static export build..."

# Move API routes to backup
if (Test-Path "src/app/api") {
    Write-Host "Moving API routes to backup..."
    Move-Item "src/app/api" "api-backup"
}

# Run the build
Write-Host "Building static export..."
npm run build

# Check if build was successful and show size
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Static build successful!"
    Write-Host "📁 Output directory: out/"
    $size = (Get-ChildItem -Path "out" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "📦 Build size: $([math]::Round($size,2)) MB"
} else {
    Write-Host "❌ Build failed!"
}

# Restore API routes
if (Test-Path "api-backup") {
    Write-Host "Restoring API routes..."
    Move-Item "api-backup" "src/app/api"
}

Write-Host "Done!"
