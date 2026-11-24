@echo off
set "PATH=C:\Program Files\nodejs;C:\Users\elijo\AppData\Local\Programs\Git\cmd;%PATH%"
powershell -ExecutionPolicy Bypass -File "%~dp0sync-and-push.ps1" %*
pause
