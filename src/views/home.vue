<template>
  <div id="home">
      <navBar />
      <div>
          <h2> {{ "Hi " + user.username}}</h2>
            <createTweet />
            <homeTweets v-if="tweetsReady" />
      </div>
      <addsPage/>
    
    
  </div>
</template>

<script>
import addsPage from "../components/adds"
import cookies from "vue-cookies";
import navBar from "../components/nav";
import createTweet from "../components/createTweet";
import homeTweets from "../components/homeTweets";
export default {
  name: "home-page",
  components: {
    homeTweets,
    createTweet,
    navBar,
    addsPage
  },
  mounted() {
    if (this.user.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
      this.tweetsReady = true;
    } else if (cookies.get("token") == undefined) {
      this.$router.push("/signin");
    } else {
      this.tweetsReady = true;
      this.$store.dispatch("getNotifications");
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      tweetsReady: false
    };
  }
};
</script>

<style lang="scss" scoped>
#home {
    
  width: 100%;
  h2{
      padding-bottom:2vh ;
      margin-bottom: 2vh ;
      border-bottom: 3px solid #e1e8ed ;
  }
}

</style>