#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting build process..."

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

# 1. Build the front-end
echo "🔨 Building front-end..."
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
if [ ! -d "build" ]; then
    echo "❌ Build directory not found after npm build. Check npm build configuration."
    exit 1
fi

cp -R build/* "$BUILD_DIR/"

# 4. Build the Swift project
echo "🏗️  Building Swift project..."
swift build

echo "✅ Build completed successfully!"