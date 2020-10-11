import Vue from "vue";
import VueRouter from "vue-router";
import signupPage from "../views/signup.vue";
import signinPage from "../views/signIn.vue";
import profilePage from "../views/profile.vue";
import HomeePage from "../views/home.vue";
import discoverPage from "../views/discoverPage.vue";
import userProfile from "../views/userprofile";
import editProfile from "../views/editProfile";
Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup-page",
    component: signupPage
  },
  {
    path: "/editProfile",
    name: "esit-profile",
    component: editProfile
  },
  {
    path: "/userprofile",
    name: "user-profile",
    component: userProfile
  },

  {
    path: "/discover",
    name: "discover-page",
    component: discoverPage
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
    path: "/home",
    name: "home-page",
    component: HomeePage
  },
  { path: '/login', redirect: '/signin' },
  { path: '/*', redirect: '/home' }

];

const router = new VueRouter({
  routes
});

export default router;
