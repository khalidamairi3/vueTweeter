<template>
    <div id="deleteProfile">
        <button @click="deleteProfile">delete</button>

    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
    export default {
        name:"delete-profile",
        data() {
      return {
          err: false
      }
  },
  methods: {
    deleteProfile() {
      let password = prompt("confirm your password to delete your profile");
      console.log(password);
      axios.request({
        url: "https://tweeterest.ml/api/users",
        method: "DELETE",
        data: {
          loginToken: cookies.get("token"),
          password: password
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then(()=>{
          this.$store.commit("resetUser");
          cookies.remove("token");
          this.err=false;
      }).catch(()=>{
          this.err= true
      });
    }}
        
    }
</script>

<style lang="scss" scoped>
#deleteProfile{
  width: 100%;
  text-align: center;
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

</style>