<template>
  <div id="deleteProfile">
    <button :disabled="disable" @click="deleteProfile">delete</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-profile",
  data() {
    return {
      err: false,
      disable: false
    };
  },
  methods: {
    deleteProfile() {
      this.disable = true;
      let password = prompt("confirm your password to delete your profile");
      axios
        .request({
          url: "https://tweeeter.ml/api/users",
          method: "DELETE",
          data: {
            loginToken: cookies.get("token"),
            password: password
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(() => {
          cookies.remove("token");
          cookies.remove("userId");
          cookies.remove("selectedUser");
          this.$store.commit("reset");
          this.err = false;
          this.disable = true;
          this.$router.push("/signin");
        })
        .catch(() => {
          this.err = true;
          this.disable = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#deleteProfile {
  width: 100%;
  text-align: center;
}

button {
  margin-top: 2vh;
  width: 40%;
  height: 6vh;
  background-color: #1da1f2;
  color: white;
  border-radius: 15px 15px 15px 15px;
  border: 1px solid #1da1f2;
  text-transform: capitalize;
  letter-spacing: 0.4vw;
  margin-bottom: 2vh;

  &:hover {
    border: 1px solid #1da1f2;
    background-color: white;
    color: #1da1f2;
    transition: all 0.2s ease-in;
    box-shadow: 2px 2px #aab8c2;
  }
}
</style>