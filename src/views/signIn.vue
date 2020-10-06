<template >
  <div id="login">
    
    
     <h1>LogIn</h1>
        <label for="email"> Email </label>
        <input type="text" v-model="email" name="email"  />
        <br />
        <label for="password"> Password</label>
        <input name="password" type="password" v-model="password" />
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
             this.$store.dispatch("getFollowing");
            this.$store.dispatch("getFollowers");
            this.$store.dispatch("getAllusers");
            this.err = false;
            this.$router.push("/home")
          }
        })
        .catch(() => {
          this.err = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>


#login {
    text-transform: capitalize;
    letter-spacing: 0.4vw;
    height: 50%;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center;
    border-radius: 15px 15px 15px 15px;
    border: 1px solid #92B4A7;
    

    input{
        
        width: 90%;
        height: 6vh;
        border-radius: 10px 10px 10px 10px;
        font-family: 'Courier New', Courier, monospace;
    }
    button{
        margin-top: 2vh;
        width: 40%;
        height: 6vh;
        background-color: #00CECB;
        color: white;
        border-radius: 15px 15px 15px 15px;
        border: 1px solid  #00CECB ;
        

        &:hover{
            border: 1px solid  #00CECB ;
            background-color:white;
            color: #00CECB;
            transition: all 0.2s ease-in;
            box-shadow: 2px 2px #92B4A7;
            

        }
    }

}

</style>