<template>
  <div>
    <h1>LogIn</h1>
    <input type="text" placeholder="email" v-model="email" />
    <br />
    <input type="ppassword" placeholder="password" v-model="password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "signin-page",
  data() {
    return {
      email: "",
      password: "",
      err: false
    };
  },
  methods: {
    login() {
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "POST",
          data: {
            email: this.email,
            password: this.password
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.loginToken != undefined) {
            cookies.set("token", response.data.loginToken);
            this.$store.commit("setUser", response.data);
            this.err = false;
          }
        })
        .catch(() => {
          this.err = true;
        });
    }
  }
};
</script>

<style lang="sass" scoped>

</style>