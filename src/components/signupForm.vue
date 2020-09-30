<template>
  <div>
    <h1>Sign Up Page</h1>

    <input type="text" placeholder="Email" v-model="email" /> 
    <br>
    <input type="password" placeholder="Password" v-model="password" />
    <br>
    <input type="text" placeholder="username" v-model="username" />
    <br>
    <textarea type="text" placeholder="bio" v-model="bio" />
    <br>
    <input type="text" placeholder="birthdate yyyy-mm-dd" v-model="birthday" />
    <br>
    <button @click="signUp" type="submit">sign up</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"

export default {
  name: "signup-form",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      bio: "",
      birthday: ""
    };
  },
  methods: {
    signUp() {
        axios.defaults.headers.common['X-Api-Key'] = 'ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67';
      axios.request({
        url: "https://tweeterest.ml/api/users",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
          username: this.username,
          bio: this.bio,
          birthdate: this.birthday
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response)=>{
          console.log(response.data);
          cookies.set("token",response.data[0].loginToken)
      }).catch((error)=>{
          console.log(error);
      });
    }
  }
};
</script>

<style scoped>
</style>