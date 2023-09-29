@echo off
start cmd /k "cd server && nodemon index.js"
start cmd /k "cd client && yarn dev"
exit