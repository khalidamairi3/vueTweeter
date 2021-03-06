import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'aos/dist/aos.css'
import AOS from "aos";
import VModal from 'vue-js-modal'
 
library.add(faUserSecret)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
 
Vue.use(VModal)

Vue.config.productionTip = false;

new Vue({
  created () {
    AOS.init()
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
