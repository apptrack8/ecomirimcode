#!/bin/bash

# Script to convert IMG_4562.HEIC to JPG format
# Usage: Place IMG_4562.HEIC in the project root, then run: ./convert-image.sh

SOURCE_FILE="IMG_4562.HEIC"
OUTPUT_DIR="src/assets"
OUTPUT_FILE="${OUTPUT_DIR}/IMG_4562.jpg"

# Check if source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ Error: $SOURCE_FILE not found in project root"
    echo "Please place IMG_4562.HEIC in the project root directory"
    exit 1
fi

# Create assets directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Convert HEIC to JPG using sips (macOS built-in)
echo "🔄 Converting $SOURCE_FILE to JPG..."
sips -s format jpeg "$SOURCE_FILE" --out "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Success! Image converted and saved to $OUTPUT_FILE"
    echo "📝 Next step: Uncomment the image import in src/pages/Mission.jsx"
else
    echo "❌ Error: Conversion failed"
    exit 1
fi

