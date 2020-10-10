<template>
  <div id="nav">
    <router-link to="/home"><i class="fas fa-2x fa-home"></i></router-link>
    <router-link to="/discover"><i class="fas fa-2x fa-search"></i></router-link>
    <router-link to="/profile"
      ><i class="fas fa-2x fa-user-circle"></i
    ></router-link>
    <router-link to="/signin" ><i @click="logout" class="fas fa-2x fa-sign-out-alt"></i
    ></router-link>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "nav-page",
  methods: {
      logout() {
          axios.request({
              url:"https://tweeterest.ml/api/login",
              method:"DELETE",
              data:{
                  loginToken : cookies.get("token")
              },
               headers: {
              "Content-Type": "application/json",
              "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
            }
          }).then(()=>{
              cookies.remove("token");
              cookies.remove("userId");
              cookies.remove("userSelection");
              this.$store.commit("reset");
              this.$router.push("/signin")
          }).catch(()=>{});
          
      }
  },
};
</script>

<style lang="scss" scoped>
#nav {
  height: 10vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  a {
    color: #aab8c2;
  }
  a.router-link-exact-active {
  color: #1DA1F2;
}
}
</style>