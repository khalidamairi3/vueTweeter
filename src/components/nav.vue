<template>
  <div id="nav">
    <router-link to="/home"
      ><i class="fas fa-2x fa-home">
        <h1 class="desktop">Home</h1></i
      ></router-link
    >
    <router-link to="/discover"
      ><i class="fas fa-2x fa-search"
        ><h1 class="desktop">Discover</h1></i
      ></router-link
    >
    <router-link to="/profile"
      ><i class="fas fa-2x fa-user-circle"
        ><h1 class="desktop">Profile</h1></i
      ></router-link>

      <router-link to="/chats"
      ><i class="far fa-comments fa-2x"><h1 class="desktop">Inbox</h1></i
      ></router-link>

      <router-link to="/notifications"
      ><i class="far fa-2x fa-bell">
        <span id="notification" v-if="newNotifications > 0"> {{ newNotifications }} </span>
      <h1 class="desktop">Notifications</h1> </i> </router-link>

    <router-link to="/signin"
      ><i @click="logout" class="fas fa-2x fa-sign-out-alt"
        ><h1 class="desktop">Logout</h1></i
      ></router-link
    >
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "nav-page",

  computed: {
    newNotifications() {
      return this.$store.getters.newNotifications; 
    }
  },
  methods: {
    logout() {
      axios
        .request({
          url: "https://tweeeter.ml/api/login",
          method: "DELETE",
          data: {
            loginToken: cookies.get("token")
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
          this.$router.push("/signin");
        })
        .catch(() => {
          alert("Somthing went Wrong");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#nav {
  background-color: white;
  z-index: 100;
  height: 10vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  align-items: center;
  a {
    color: #aab8c2;
  }
  a.router-link-exact-active {
    color: #1da1f2;
  }
}
#notification{
  background: #f00;
  padding: 5px;
  font-size: 0.65em;
  border-radius: 50%;
  color: white;
  vertical-align: bottom;
  margin-left: -15px;
}
@media only screen and (min-width: 600px) {
  #nav {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    height: 60vh;
  }
}

@media only screen and (min-width: 1000px) {
  #nav {
    a {
      color: #657786;
    }
  }
}
</style>