#!/bin/bash

# DentaDesk Deployment Script
# This script helps deploy the application to various platforms

echo "🚀 DentaDesk Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js and npm are available"

# Install dependencies
print_status "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Build the project
print_status "Building the project..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

print_status "Build completed successfully!"

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    print_status "Vercel CLI is available"
    
    # Ask user for deployment choice
    echo ""
    echo "Choose deployment option:"
    echo "1) Deploy to Vercel (Production)"
    echo "2) Deploy to Vercel (Preview)"
    echo "3) Build only (no deployment)"
    echo "4) Exit"
    
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            print_status "Deploying to Vercel (Production)..."
            vercel --prod
            ;;
        2)
            print_status "Deploying to Vercel (Preview)..."
            vercel
            ;;
        3)
            print_status "Build completed. No deployment."
            ;;
        4)
            print_status "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
else
    print_warning "Vercel CLI not found. Install it with: npm i -g vercel"
    print_status "Build completed. You can manually deploy the 'dist' folder."
fi

print_status "Deployment script completed!"
