#!/bin/bash
cd ./Frontend/

echo "Compile and build completed."
npm run build 
 
if [ -d "./ios" ]; then
    # 目錄存在
    echo "Rebuild iOS & open Xcode."
    npx cap copy && npx cap open ios
else
    # 目錄不存在
    echo "Add iOS & open Xcode."
    npx cap add ios && npx cap open ios
fi
