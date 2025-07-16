#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting build process..."

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
cp -R build/* "$BUILD_DIR/"

# 4. Build the Swift project
echo "🏗️  Building Swift project..."
swift build

echo "✅ Build completed successfully!"
