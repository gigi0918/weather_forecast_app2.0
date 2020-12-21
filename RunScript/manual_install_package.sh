#!/bin/bash
echo "Which npm package do you want to install?"
printf "Please input its name:"
read packageName

cd Frontend/
npm install $packageName