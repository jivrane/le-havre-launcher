@echo off
title LE HAVRE - Launcher
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo [LE HAVRE] Demarrage du Launcher...
node node_modules\electron\cli.js .
pause
