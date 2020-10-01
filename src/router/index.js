import Vue from "vue";
import VueRouter from "vue-router";
import signupPage from "../views/signup.vue";
import signinPage from "../views/signIn.vue";
import profilePage from "../views/profile.vue";
import HomeePage from "../views/home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup-page",
    component: signupPage
  },
  {
    path: "/signin",
    name: "signin-page",
    component: signinPage
  },
  {
    path: "/profile",
    name: "profile-page",
    component: profilePage
  },
  {
    path: "/",
    name: "home-page",
    component: HomeePage
  },
 
];

const router = new VueRouter({
  routes
});

export default router;
