## VS常用快捷鍵

<kbd>Ctrl</kbd>+<kbd>/</kbd> 註解 (選定及取消)  
<kbd>Ctrl</kbd>+<kbd>x</kbd> 刪除此行  
<kbd>Ctrl</kbd>+<kbd>`</kbd> 終端機  
<kbd>shift</kbd>+<kbd>Ctrl</kbd>+<kbd>F</kbd> 搜尋關鍵字  
<kbd>shift</kbd>+<kbd>Ctrl</kbd>+<kbd>E</kbd> 顯示所有資料夾 Alt + Shift + F



## 發文區 placeholder<sup>[1](user_input_prompts)</sup>應用
<!-- 
此腳註在github上不適用
[^placeholder]
[^placeholder]:在發文區內，顯示使用者輸入提示

<a name="myfootnote1">1</a>: Footnote content goes here
<sup>[1](在發文區內，顯示使用者輸入提示)</sup> -->
```
<textarea placeholder="請輸入內容" name="user_text" v-model="msg" cols="50" rows="10"></textarea>
```
## Toast的應用 

安裝介紹:[mint-ui](https://mint-ui.github.io/#!/zh-cn)

在src/main.js引入
```
// 引入全部组件
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
// 按需引入部分组件
import { Cell, Checklist } from 'mint-ui';
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
```

在src/App.vue引入
```
import Vue from 'vue'
//引入全部組件
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);
```

在src/view/Home.vue引入
```
import { Toast } from "mint-ui";
```

即可使用
```
Toast({
        message: "發文成功",
        position: "center" /*位置*/,
        duration: 4000
    });
```

## 網頁切換 Home <-> about

確認在src/router/index.js中有此路徑
```
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
```
在src/view/Home.vue使用，即可切換至about.vue之頁面
```
<router-link to="/about">About</router-link>
```

## CSS

|語法|概念|應用|
|:--:|:--:|:--:|
|footer|置底|about的連結|
|position|定位|發佈時間的位置|
