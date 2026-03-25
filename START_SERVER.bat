@echo off
REM Start Python HTTP Server for the Portfolio
cd /d "C:\Users\DELL\OneDrive\Desktop\The portfolio"
echo.
echo ============================================
echo     JARVIS PORTFOLIO - LOCAL SERVER
echo ============================================
echo.
echo Starting server...
echo.
echo Open your browser and go to:
echo http://localhost:8000/portfolio.html
echo.
echo Press CTRL+C to stop the server
echo.
echo ============================================
echo.
python -m http.server 8000
pause
