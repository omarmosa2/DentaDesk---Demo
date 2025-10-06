@echo off
REM DentaDesk Deployment Script for Windows
REM This script helps deploy the application to various platforms

echo 🚀 DentaDesk Deployment Script
echo ================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are available

REM Install dependencies
echo ✅ Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build the project
echo ✅ Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Vercel CLI is available
    
    echo.
    echo Choose deployment option:
    echo 1) Deploy to Vercel (Production)
    echo 2) Deploy to Vercel (Preview)
    echo 3) Build only (no deployment)
    echo 4) Exit
    
    set /p choice="Enter your choice (1-4): "
    
    if "%choice%"=="1" (
        echo ✅ Deploying to Vercel (Production)...
        call vercel --prod
    ) else if "%choice%"=="2" (
        echo ✅ Deploying to Vercel (Preview)...
        call vercel
    ) else if "%choice%"=="3" (
        echo ✅ Build completed. No deployment.
    ) else if "%choice%"=="4" (
        echo ✅ Exiting...
        exit /b 0
    ) else (
        echo ❌ Invalid choice
        pause
        exit /b 1
    )
) else (
    echo ⚠️  Vercel CLI not found. Install it with: npm i -g vercel
    echo ✅ Build completed. You can manually deploy the 'dist' folder.
)

echo ✅ Deployment script completed!
pause
