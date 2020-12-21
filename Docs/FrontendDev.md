## Vue + Capacitor 製作 Hybrid App

### 說明
- Cordova 與 Capacitor皆是製作Hybird App的套件，後者較為新，未來可能取代前者，因此我們於此版本的專案即轉用Capacitor，同時，它對於Cordova有提供向後相容（backward compatibility)，所以可以不必但擔心Cordova 的Plugin無法使用(雖然不是全部的Plugin皆可於Capacitor使用)

- Capacitor官方也有提供其Plugin，可於此[網站](https://capacitorjs.com/docs/apis)搜尋、引入專案使用

### 專案指令
- 請於Cosmos_APP專案的根目錄下執行指令
```bash
# 自動安裝專案依賴
./RunScript/auto_install_package.sh

# Hot-Reloads
./RunScript/npm_serve.sh

# 專案編譯、輸出android專案
./RunScript/build_android.sh

# 專案編譯、輸出ios專案
./RunScript/build_ios.sh

# 若有需要安裝其它依賴
./RunScript/manual_install_package.sh
```

### 未來開發新專案
#### 初始化專案
- 請參閱[「一個採用 Vue.js 、 Cordova 及 Capacitor 套件而成的 Hybrid App」](https://github.com/zymber-tech/vue-cor-cap-ForExample#%E4%B8%80%E5%80%8B%E6%8E%A1%E7%94%A8-vuejs--cordova-%E5%8F%8A-capacitor-%E5%A5%97%E4%BB%B6%E8%80%8C%E6%88%90%E7%9A%84-hybrid-app)