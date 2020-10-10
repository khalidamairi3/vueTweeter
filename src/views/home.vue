<template>
  <div id="home">
    <createTweet />
    <homeTweets v-if="tweetsReady" />
    <navBar />
  </div>
</template>

<script>
import cookies from "vue-cookies";
import navBar from "../components/nav";
import createTweet from "../components/createTweet";
import homeTweets from "../components/homeTweets";
export default {
  name: "home-page",
  components: {
    homeTweets,
    createTweet,
    navBar
  },
 mounted() {
    if (this.user.userId == undefined && cookies.get("token") != undefined) {
       this.$store.dispatch("restart");
      this.tweetsReady=true

    } else if (cookies.get("token") == undefined) {
      this.$router.push("/signin");
    }
    else{
        this.tweetsReady=true;

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
      }
  },
  
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
}
</style>