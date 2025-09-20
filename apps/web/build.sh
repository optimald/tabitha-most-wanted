#!/bin/bash
set -e

echo "Starting monorepo build process..."

# Find the project root by looking for pnpm-workspace.yaml
PROJECT_ROOT=$(find . -name "pnpm-workspace.yaml" -exec dirname {} \; | head -1)

if [ -z "$PROJECT_ROOT" ]; then
    # Try going up directories to find it
    if [ -f "../../pnpm-workspace.yaml" ]; then
        PROJECT_ROOT="../.."
    elif [ -f "../../../pnpm-workspace.yaml" ]; then
        PROJECT_ROOT="../../.."
    else
        echo "Error: Could not find project root with pnpm-workspace.yaml"
        exit 1
    fi
fi

echo "Found project root at: $PROJECT_ROOT"

# Navigate to project root and install dependencies
cd "$PROJECT_ROOT"
echo "Installing dependencies..."
pnpm install --frozen-lockfile

# Build shared packages first
echo "Building shared packages..."
pnpm build --filter=@tabitha/shared --filter=@tabitha/ui

# Build the web app
echo "Building web app..."
cd apps/web
pnpm build

echo "Build completed successfully!"
