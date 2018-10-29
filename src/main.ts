import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import axios from 'axios';

import Default from './layouts/Default.vue';
import Single from './layouts/Single.vue';

Vue.component('default-layout', Default);
Vue.component('single-layout', Single);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
