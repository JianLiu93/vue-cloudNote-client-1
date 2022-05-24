// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './models/auth';

Vue.config.productionTip = false

window.Auth = Auth

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
