<template>
  <div id>
      <h2 v-if="tweets.length ==0"> you have no tweets to display </h2>
    <tweetDisplay v-for="tweet in tweets" :key =" tweet.tweetId " :Tweet = tweet />
  </div>
</template>

<script>
import axios from "axios";
import tweetDisplay from "./tweet.vue";
const delay = ms => new Promise(res => setTimeout(res, ms));
export default {
  name: "home-tweets",
  components: {
    tweetDisplay
  },
  data() {
    return {
      tweets: []
    };
  },
  async mounted() {
    await delay(500);
    for (let i = 0; i < this.followingUsers.length; i++) {
      axios.request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        params: {
          userId: this.followingUsers[i].userId
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((resonse)=>{
          this.tweets=this.tweets.concat(resonse.data);

      });
    }
  },
  computed: {
    followingUsers() {
      return this.$store.state.followingUsers;
    }
  }
};
</script>

<style lang="sass" scoped>

</style>