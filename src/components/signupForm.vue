<template>
  <div>
    <h1>Sign Up Page</h1>

    <input type="text" placeholder="Email" v-model="email" />
    <br />
    <input type="password" placeholder="Password" v-model="password" />
    <br />
    <input type="text" placeholder="username" v-model="username" />
    <br />
    <textarea type="text" placeholder="bio" v-model="bio" />
    <br />
    <input type="text" placeholder="birthdate yyyy-mm-dd" v-model="birthdate" />
    <br />
    <button @click="signUp" type="submit">sign up</button>
    <h2 v-if="err">
      the information you entered is not valid, please check the information you
      just entered
    </h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: "signup-form",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      bio: "",
      birthdate: "",
      err: false
    };
  },
  methods: {
    signUp() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "POST",
          data: {
            email: this.email,
            password: this.password,
            username: this.username,
            bio: this.bio,
            birthdate: this.birthdate
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
            this.$store.dispatch("getFollowing");
            this.$store.dispatch("getAllusers");
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

<style scoped>
</style>