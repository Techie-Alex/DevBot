::taskkill /FI "WINDOWTITLE eq DevBot*" /F
title DevBot
color 0b
echo off
:a
cls
node main.js
pause
goto a