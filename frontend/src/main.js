import Vue from 'vue'
import Vuesax from 'vuesax'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io';
import './registerServiceWorker'
import 'vuesax/dist/vuesax.css'

Vue.use(Vuesax)
Vue.use(VueSocketIO, "http://localhost:3000")
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
