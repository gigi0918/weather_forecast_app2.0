#!/bin/bash
cd ./Frontend/

echo "Compile and build completed."
npm run build 
 
if [ -d "./android" ]; then
    # 目錄存在
    echo "Rebuild Android & open Android Studio."
    npx cap copy && npx cap open android
else
    # 目錄不存在
    echo "Add Android & open Android Studio."
    npx cap add android && npx cap open android
fi