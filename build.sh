#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting build process..."

# Create a temporary working directory that the plugin can write to
TEMP_DIR=$(mktemp -d)
echo "📁 Using temporary directory: $TEMP_DIR"
cd "$TEMP_DIR"

# Copy package.json and other necessary files to temp directory
cp /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/package*.json ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/next.config.js ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/app ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/components ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/lib ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/types ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/context ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/db ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/public ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/tailwind.config.ts ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/postcss.config.js ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/tsconfig.json ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/i18nConfig.js ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/middleware.ts ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/prettier.config.cjs ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/jest.config.ts ./
cp -r /Users/ronaldmannak/Developer/Projects/Pico\ AI\ Homelab/PicoChatUI/supabase ./

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# Skip .next cleanup in sandboxed environment
echo "⚠️  Skipping .next cleanup (sandboxed environment)"

# 1. Build the front-end
echo "🔨 Building front-end..."
# Disable Next.js telemetry and tracing to avoid permission issues
export NEXT_TELEMETRY_DISABLED=1
export NEXT_TRACE=0
# Disable network requests during build
export NODE_ENV=production
export NEXT_PUBLIC_DISABLE_GOOGLE_FONTS=true
npm run build
#npm run dev

# 2. Remove existing build directory if it exists
BUILD_DIR="Sources/PicoChatUI/build"
if [ -d "$BUILD_DIR" ]; then
    echo "🗑️  Removing existing build directory..."
    rm -rf "$BUILD_DIR"
fi

# 3. Copy the new build folder
echo "📦 Copying new build files..."
mkdir -p "$BUILD_DIR"

# Check if build directory exists after npm build
if [ ! -d "out" ]; then
    echo "❌ Build directory not found after npm build. Check npm build configuration."
    exit 1
fi

cp -R out/* "$BUILD_DIR/"

# Clean up temporary directory
echo "🧹 Cleaning up temporary directory..."
cd /
rm -rf "$TEMP_DIR"

echo "✅ Build completed successfully!"