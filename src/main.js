import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui';
// 导入bootstrap样式
import 'bootstrap/dist/css/bootstrap.css'
// //导入自定义样式
// import './css/app.css'
Vue.use(Mint);
// 按需引入部分组件
import { Cell, Checklist } from 'mint-ui';

import moment from 'moment';
Vue.prototype.$moment = moment;

Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
Vue.config.productionTip = false

import VueCordova from 'vue-cordova'
Vue.use(VueCordova)
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')