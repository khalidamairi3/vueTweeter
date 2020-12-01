<template >
  <div id="login">
    <h1>LogIn</h1>
    <label for="email"> Email </label>
    <input type="text" v-model="email" name="email" />
    <br />
    <label for="password"> Password</label>
    <input name="password" type="password" v-model="password" />
    <button :disabled="disable" tyoe="submit" @click="login">Login</button>
    <p v-if="err">the username or the password is incorrect</p>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "signin-page",
  mounted() {
    if (this.user.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
      this.$router.push("/home");
    }
    if (cookies.get("token") != undefined) {
      this.$router.push("/home");
    }
  },
  data() {
    return {
      email: "",
      password: "",
      err: false,
      disable: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    login() {
      axios
        .request({
          url: "http://127.0.0.1:5000/api/login",
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
          if (response.data.loginToken != undefined) {
            cookies.set("token", response.data.loginToken);
            cookies.set("userId", response.data.userId);
            this.$store.commit("setUser", response.data);
            this.$store.dispatch("getFollowing");
            this.$store.dispatch("getFollowers");
            this.$store.dispatch("getAllusers");
            this.$store.dispatch("getChats");
            this.err = false;
            this.disable = false;
            this.$router.push("/home");
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
#login {
  align-self: center;
  text-transform: capitalize;
  letter-spacing: 0.4vw;
  min-height: 50vh;
  width: 90vw;
  display: grid;
  justify-items: center;
  align-items: center;
  border-radius: 15px 15px 15px 15px;
  border: 1px solid #92b4a7;

  input {
    width: 90%;
    height: 6vh;
    border-radius: 10px 10px 10px 10px;
    font-family: "Courier New", Courier, monospace;
  }
  button {
    margin-top: 2vh;
    width: 40%;
    height: 6vh;
    background-color: #1da1f2;
    color: white;
    border-radius: 15px 15px 15px 15px;
    border: 1px solid #1da1f2;

    &:hover {
      border: 1px solid #1da1f2;
      background-color: white;
      color: #1da1f2;
      transition: all 0.2s ease-in;
      box-shadow: 2px 2px #92b4a7;
    }
  }
}
@media only screen and (min-width: 600px) {
  #login {
    font-size: 24px;
    width: 70vw;
  }
}

@media only screen and (min-width: 1000px) {
  #login {
    margin-top: 10vh ;
    height: 80vh;
    width: 50vw;
  }
}
</style>