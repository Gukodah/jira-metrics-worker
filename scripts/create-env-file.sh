#!/bin/sh

TARGET_FILE=".env"
SOURCE_FILE=".env-dev"

# Check if the .env file exists
if [ ! -f "$TARGET_FILE" ]; then
    cp "$SOURCE_FILE" "$TARGET_FILE"
fi
