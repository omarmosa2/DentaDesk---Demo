@echo off
echo 🎭 Starting DentaDesk in Demo Mode with Electron...
echo.
echo This will run the application with:
echo - Mock database (no SQLite)
echo - No license verification
echo - Temporary data storage
echo.

REM Set demo mode environment variable
set VITE_DEMO_MODE=true

REM Start the electron development server
echo Starting Electron in demo mode...
npm run electron:dev

pause
