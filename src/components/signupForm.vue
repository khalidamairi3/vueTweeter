<template>
  <div id="signup">
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
        
        <input type="text" name="birthdate" placeholder="yyyy-mm-dd" v-model="birthdate" />
        <br />
        <label for="bio"> bio</label>
        <textarea type="text" name="bio" v-model="bio" > </textarea>
        <br />
        <button @click="signUp" type="submit">sign up</button>
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
            this.$router.push("/home")
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

<style lang="scss" scoped>
#signup{
    text-transform: capitalize;
    letter-spacing: 0.8vw;
    min-height: 80%;
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
    textarea{
        width: 90%;
        height: 12vh;
        border-radius: 10px 10px 10px 10px;
    }
    p{
      color: #3E000C;
    }
    button{
        margin-top: 2vh;
        width: 40%;
        height: 6vh;
        background-color: #00CECB;
        color: white;
        border-radius: 15px 15px 15px 15px;
        border: 1px solid  #00CECB ;
        text-transform: capitalize;
        letter-spacing: 0.4vw;
        margin-bottom: 2vh;
        
        

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