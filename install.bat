@echo off
setlocal enabledelayedexpansion

echo Installing frontend dependencies...

cd music-app
if not exist node_modules (
  echo Installing frontend...
  call npm install
  if errorlevel 1 (
    echo Failed to install frontend dependencies.
  ) else (
    echo Frontend dependencies installed.
  )
) else (
  echo Frontend dependencies already installed.
)
cd ..

echo Installing backend dependencies...

cd music-app-be
if not exist node_modules (
  echo Installing backend...
  call npm install
  if errorlevel 1 (
    echo Failed to install backend dependencies.
  ) else (
    echo Backend dependencies installed.
  )
) else (
  echo Backend dependencies already installed.
)
cd ..

echo Done installing all dependencies.
pause
