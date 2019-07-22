import Vue from "vue";
import './plugins/vuetify'
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/vue-chessboard.css'
import './assets/chessboard-0.3.0.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
