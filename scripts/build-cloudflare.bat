@echo off
REM Build script for Cloudflare Pages deployment (Windows)

echo Building Next.js application...
call npm run build

echo Cleaning up cache files for Cloudflare Pages...
REM Remove cache directory to avoid size limits
if exist ".next\cache" rmdir /s /q ".next\cache"
if exist ".next\trace" rmdir /s /q ".next\trace"

echo Build cleanup complete!
echo Build directory: .next
