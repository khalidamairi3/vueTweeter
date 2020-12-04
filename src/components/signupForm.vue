<template>
  <div class="userInfo">
    <h1>Sign Up Page</h1>
    <label for="Email"> Email</label>
    <input type="text" name="Email" v-model="email" />
    <br />
    <label for="Password"> Password</label>
    <input type="password" name="Password" v-model="password" />
    <br />
    <label for="username"></label>
    <label for="username"> username </label>
    <input type="text" name="username" v-model="username" />
    <br />
    <label for="birthdate"> birthdate</label>

    <input
      type="text"
      name="birthdate"
      placeholder="yyyy-mm-dd"
      v-model="birthdate"
    />
    <br />
    <label for="bio"> bio</label>
    <textarea type="text" name="bio" v-model="bio"> </textarea>
    <br />
    <button @click="signUp" type="submit" :disabled="disable">sign up</button>
    <p v-if="err">
      the information you entered is not valid, please check the information you
      just entered
    </p>
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
      err: false,
      disable: false
    };
  },
  methods: {
    signUp() {
      this.disable = true;
      axios
        .request({
          url: "https://tweeeter.ml/api/users",
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
          if (response.data.loginToken != undefined) {
            cookies.set("token", response.data.loginToken);
            this.$store.commit("setUser", response.data);
            this.$store.dispatch("getAllusers");
            this.$router.push("/home");
            this.err = false;
            this.disable = false;
          }
        })
        .catch(() => {
          this.err = true;
          this.disable = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>