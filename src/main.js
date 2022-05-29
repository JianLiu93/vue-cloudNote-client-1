// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Auth from './models/auth';

Vue.config.productionTip = false

window.Auth = Auth

Vue.use(Vuex)
Vue.use(ElementUI)

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
