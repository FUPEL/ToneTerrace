@echo off

REM === FRONTEND ===
cd music-app
set FE_DIR=%cd%
if not exist node_modules (
  echo Installing frontend dependencies...
  npm install
)
start "Frontend" cmd /k "cd /d %FE_DIR% && npm run dev"
cd ..

REM === BACKEND ===
cd music-app-be
set BE_DIR=%cd%
if not exist node_modules (
  echo Installing backend dependencies...
  npm install
)
start "Backend" cmd /k "cd /d %BE_DIR% && npm run dev"

echo ===============================
echo Frontend and backend started!
echo Press any key to exit...
pause >nul
