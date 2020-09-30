import Vue from "vue";
import VueRouter from "vue-router";
import signupPage from "../views/signup.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup-page",
    component: signupPage
  },
 
];

const router = new VueRouter({
  routes
});

export default router;
