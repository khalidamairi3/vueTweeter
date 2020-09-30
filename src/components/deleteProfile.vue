<template>
    <div>
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

<style lang="sass" scoped>

</style>