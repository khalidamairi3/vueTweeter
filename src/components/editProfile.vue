<template>
  <div id="editProfile">
    
    <h1>edit profile</h1>
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
    <button @click="update" :disabled="updateDisable" type="submit">update</button>
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
  name: "edit-profile",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      birthdate: "",
      bio: "",
      err: false,
      updateDisable:false,
    };
  },
  methods: {
    update() {
      let userData = {};
      if (this.email) userData.email = this.email;
      if (this.password) userData.password = this.password;
      if (this.username) userData.username = this.username;
      if (this.bio) userData.bio = this.bio;
      if (this.birthdate) userData.birthdate = this.birthdate;
      userData.loginToken = cookies.get("token");
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "PATCH",
          data: userData,
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(response => {
          let user = response.data;
          user.loginToken = cookies.get("token");
          this.err = false;
          this.updateDisable=false;
          this.$store.commit("setUser", user);
        })
        .catch(() => {
          this.err = true;
          this.updateDisable=false;
        });
    },

    
  }
};
</script>

<style lang="scss" scoped>

#editProfile{
  // width: 100%;
    text-transform: capitalize;
    letter-spacing: 0.8vw;
    min-height: 80%;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center;
    border-radius: 15px 15px 15px 15px;
    border: 1px solid #AAB8C2;
    

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
        background-color: #1DA1F2;
        color: white;
        border-radius: 15px 15px 15px 15px;
        border: 1px solid  #1DA1F2 ;
        text-transform: capitalize;
        letter-spacing: 0.4vw;
        margin-bottom: 2vh;
        
        

        &:hover{
            border: 1px solid  #1DA1F2 ;
            background-color:white;
            color: #1DA1F2;
            transition: all 0.2s ease-in;
            box-shadow: 2px 2px #AAB8C2;
            

        }
    }

}

</style>