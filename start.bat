@echo off
cd /d "%~dp0"

echo Starting server...
start cmd /k "cd server && npm start"

echo Starting client...
start cmd /k "cd client && npm start"

echo All processes started!
