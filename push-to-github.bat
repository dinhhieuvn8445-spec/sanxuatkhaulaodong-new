@echo off
echo ========================================
echo    PUSH TO GITHUB - HOANTHIENWEB XKLD
echo ========================================

echo.
echo Checking if Git is installed...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/windows
    echo Then run this script again.
    pause
    exit /b 1
)

echo Git is installed. Proceeding...
echo.

echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Creating commit...
git commit -m "🚀 Hoàn thiện website XKLĐ - Full features"

echo.
echo Adding remote repository...
git remote add origin https://github.com/dinhhieuvn8445-spec/hoanthienweb-xkld.git

echo.
echo Setting up authentication...
git config user.name "dinhhieuvn8445-spec"
git config user.email "dinhhieuvn8445@gmail.com"

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo    PUSH COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Your project is now available at:
echo https://github.com/dinhhieuvn8445-spec/hoanthienweb-xkld
echo.
pause
