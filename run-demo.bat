@echo off
echo 🎭 Starting DentaDesk in Demo Mode...
echo.
echo This will run the application with:
echo - Mock database (no SQLite)
echo - No license verification
echo - Temporary data storage
echo.

REM Set demo mode environment variable
set VITE_DEMO_MODE=true

REM Start the development server
echo Starting development server...
npm run dev

pause
