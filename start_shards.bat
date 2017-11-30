title DevBot
color 0c
echo off
cls
:a
echo(
echo #######################################################
echo # Starting new instance # %date% %time% #
echo #######################################################
echo(
node shards.js
goto a
